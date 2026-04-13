<?php
require_once __DIR__ . '/config.php';
$user = requireAuth('worker');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') fail('Method not allowed.', 405);

$taskId     = safeInt('task_id');
$piecesDone = safeInt('pieces_done');
$notes      = esc(post('notes'));

if (!$taskId || $piecesDone < 1) fail('Task ID and pieces completed are required.');

$db  = db();
$uid = (int) $user['id'];

// Verify task belongs to this worker and is not completed
$res = $db->query("
    SELECT t.*, o.id AS order_id_ref
    FROM tasks t
    JOIN orders o ON o.id = t.order_id
    WHERE t.id = $taskId AND t.worker_id = $uid
    LIMIT 1
");
if (!$res || $res->num_rows === 0) fail('Task not found or access denied.', 404);
$task = $res->fetch_assoc();
if ($task['status'] === 'completed') fail('This task is already marked as completed.');

// ── Handle proof image upload ────────────────────────────────
$proofPath = null;
if (!empty($_FILES['proof_image']['tmp_name'])) {
    $uploadDir = __DIR__ . '/../uploads/';
    if (!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);

    $ext      = strtolower(pathinfo($_FILES['proof_image']['name'], PATHINFO_EXTENSION));
    $allowed  = ['jpg', 'jpeg', 'png', 'webp'];
    if (!in_array($ext, $allowed)) fail('Invalid image format. Use JPG, PNG, or WebP.');

    $maxSize = 5 * 1024 * 1024; // 5 MB
    if ($_FILES['proof_image']['size'] > $maxSize) fail('Image too large. Max 5MB.');

    $filename  = 'proof_' . $uid . '_' . $taskId . '_' . time() . '.' . $ext;
    $destPath  = $uploadDir . $filename;

    if (!move_uploaded_file($_FILES['proof_image']['tmp_name'], $destPath)) {
        fail('Failed to upload image. Check folder permissions.');
    }
    $proofPath = esc('uploads/' . $filename);
}

// ── Update task ──────────────────────────────────────────────
$newDone   = (int)$task['done'] + $piecesDone;
$target    = (int)$task['target'];
$newStatus = ($newDone >= $target) ? 'completed' : 'inProgress';

$proofSql = $proofPath ? ", proof_image='$proofPath'" : '';
$notesSql = $notes     ? ", notes='$notes'"            : '';

$db->query("
    UPDATE tasks
    SET done = $newDone, status = '$newStatus' $proofSql $notesSql
    WHERE id = $taskId
");

// ── Update order done count ──────────────────────────────────
$orderId = (int) $task['order_id'];
$db->query("UPDATE orders SET done = done + $piecesDone WHERE id = $orderId");

// ── Update/create quality record ─────────────────────────────
$today    = date('Y-m-d');
$product  = esc($task['product'] . ' — ' . $task['stage']);
$db->query("
    INSERT INTO quality (worker_id, task_id, task_name, total, defective, score, checked_date)
    VALUES ($uid, $taskId, '$product', $newDone, 0,
            ROUND(($newDone / GREATEST($target, 1)) * 100, 1), '$today')
    ON DUPLICATE KEY UPDATE
        total       = $newDone,
        score       = ROUND(($newDone / GREATEST($target, 1)) * 100, 1),
        checked_date = '$today'
");

// ── Upsert payment for current period ────────────────────────
$period = date('F Y');  // e.g. "April 2025"
$rate   = (float) $task['rate'];
$earned = $piecesDone * $rate;
$db->query("
    INSERT INTO payments (worker_id, period, pieces, rate, salary, status)
    VALUES ($uid, '$period', $piecesDone, $rate, $earned, 'pending')
    ON DUPLICATE KEY UPDATE
        pieces = pieces + $piecesDone,
        salary = salary + $earned
");

// ── Notify admin if task completed ───────────────────────────
if ($newStatus === 'completed') {
    $name = esc($user['full_name']);
    $db->query("
        INSERT INTO notifications (target_role, type, title, msg)
        VALUES ('admin', 'task',
                'Task Completed',
                '$name completed $newDone pieces of $product.')
    ");
}

ok([
    'message'    => 'Work submitted successfully!',
    'new_done'   => $newDone,
    'status'     => $newStatus,
    'proof_path' => $proofPath,
]);

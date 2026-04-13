<?php
require_once __DIR__ . '/config.php';
$user = requireAuth('worker');

$taskId = safeInt('id', 0, true);
if (!$taskId) fail('Task ID is required.');

$db  = db();
$uid = (int) $user['id'];

$res = $db->query("
    SELECT
        t.id,
        t.product,
        t.stage,
        t.target,
        t.done,
        t.rate,
        DATE_FORMAT(t.due_date, '%d %b %Y') AS due_date,
        t.status,
        t.notes,
        CASE WHEN t.target > 0 THEN ROUND((t.done / t.target) * 100) ELSE 0 END AS progress
    FROM tasks t
    WHERE t.id = $taskId AND t.worker_id = $uid
    LIMIT 1
");

if (!$res || $res->num_rows === 0) fail('Task not found or access denied.', 404);

$task = $res->fetch_assoc();
$task['target']   = (int)   $task['target'];
$task['done']     = (int)   $task['done'];
$task['rate']     = (float) $task['rate'];
$task['progress'] = (int)   $task['progress'];

ok(['data' => $task]);

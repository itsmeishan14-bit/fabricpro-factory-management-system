<?php
require_once __DIR__ . '/config.php';
requireAuth('admin');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') fail('Method not allowed.', 405);

$workerId  = safeInt('worker_id');
$taskId    = safeInt('task_id');
$taskName  = esc(post('task_name'));
$total     = safeInt('total');
$defective = safeInt('defective');

if (!$workerId || $total < 1) fail('Worker and total pieces are required.');
if ($defective > $total)      fail('Defective count cannot exceed total.');

$db    = db();
$score = round((($total - $defective) / $total) * 100, 1);
$today = date('Y-m-d');

$taskSql = $taskId ? $taskId : 'NULL';

$db->query("
    INSERT INTO quality (worker_id, task_id, task_name, total, defective, score, checked_date)
    VALUES ($workerId, $taskSql, '$taskName', $total, $defective, $score, '$today')
    ON DUPLICATE KEY UPDATE
        total        = $total,
        defective    = $defective,
        score        = $score,
        checked_date = '$today'
");

// Notify worker of quality score
$db->query("
    INSERT INTO notifications (target_role, target_user, type, title, msg)
    VALUES ('worker', $workerId, 'task',
            'Quality Check Result',
            'Your quality score is $score% ($defective defective out of $total pieces).')
");

ok(['message' => 'Quality record saved successfully.', 'score' => $score]);

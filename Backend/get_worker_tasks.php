<?php
require_once __DIR__ . '/config.php';
$user = requireAuth('worker');

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
        CASE WHEN t.target > 0 THEN ROUND((t.done / t.target) * 100) ELSE 0 END AS progress,
        o.order_code
    FROM tasks t
    JOIN orders o ON o.id = t.order_id
    WHERE t.worker_id = $uid
    ORDER BY
        FIELD(t.status, 'inProgress', 'pending', 'completed'),
        t.due_date ASC
");

$tasks = [];
while ($row = $res->fetch_assoc()) {
    $row['target']   = (int)   $row['target'];
    $row['done']     = (int)   $row['done'];
    $row['rate']     = (float) $row['rate'];
    $row['progress'] = (int)   $row['progress'];
    $tasks[]         = $row;
}

ok(['tasks' => $tasks]);

<?php
require_once __DIR__ . '/config.php';
$user = requireAuth('any');

$db   = db();
$uid  = (int) $user['id'];
$role = $user['role'];

if ($role === 'admin') {
    // Admin sees all leave requests
    $res = $db->query("
        SELECT
            lr.id,
            u.full_name AS worker_name,
            lr.type,
            DATE_FORMAT(lr.start_date, '%d %b %Y') AS start_date,
            DATE_FORMAT(lr.end_date,   '%d %b %Y') AS end_date,
            lr.reason,
            lr.status,
            DATE_FORMAT(lr.created_at, '%d %b %Y') AS applied_on
        FROM leave_requests lr
        JOIN users u ON u.id = lr.worker_id
        ORDER BY lr.created_at DESC
        LIMIT 100
    ");
} else {
    // Worker sees only their own
    $res = $db->query("
        SELECT
            id,
            type,
            DATE_FORMAT(start_date, '%d %b %Y') AS start_date,
            DATE_FORMAT(end_date,   '%d %b %Y') AS end_date,
            reason,
            status,
            DATE_FORMAT(created_at, '%d %b %Y') AS applied_on
        FROM leave_requests
        WHERE worker_id = $uid
        ORDER BY created_at DESC
        LIMIT 20
    ");
}

$leaves = [];
while ($row = $res->fetch_assoc()) $leaves[] = $row;

ok(['history' => $leaves]);

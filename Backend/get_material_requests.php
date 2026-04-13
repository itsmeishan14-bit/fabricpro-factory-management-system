<?php
require_once __DIR__ . '/config.php';
$user = requireAuth('any');

$db   = db();
$uid  = (int) $user['id'];
$role = $user['role'];
$mine = get('mine'); // ?mine=1 forces worker-scoped even for admin

if ($role === 'admin' && !$mine) {
    $res = $db->query("
        SELECT
            mr.id,
            u.full_name AS worker_name,
            mr.material AS type,
            mr.qty,
            mr.unit,
            mr.urgency,
            mr.specification,
            mr.notes,
            mr.status,
            DATE_FORMAT(mr.created_at, '%d %b %Y') AS requested_on
        FROM material_requests mr
        JOIN users u ON u.id = mr.worker_id
        ORDER BY
            FIELD(mr.urgency, 'critical', 'urgent', 'normal'),
            mr.created_at DESC
        LIMIT 100
    ");
} else {
    $res = $db->query("
        SELECT
            id,
            material AS type,
            qty,
            unit,
            urgency,
            specification,
            notes,
            status,
            DATE_FORMAT(created_at, '%d %b %Y') AS requested_on
        FROM material_requests
        WHERE worker_id = $uid
        ORDER BY created_at DESC
        LIMIT 20
    ");
}

$requests = [];
while ($row = $res->fetch_assoc()) {
    $row['qty'] = (float) $row['qty'];
    $requests[] = $row;
}

ok(['requests' => $requests]);

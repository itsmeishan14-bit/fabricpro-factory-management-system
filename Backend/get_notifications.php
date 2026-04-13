<?php
require_once __DIR__ . '/config.php';
$user = requireAuth('any');

$db   = db();
$uid  = (int) $user['id'];
$role = esc($user['role']);

// Fetch notifications targeted at this user, their role, or 'all'
$res = $db->query("
    SELECT
        id,
        type,
        title,
        msg,
        is_read  AS `read`,
        DATE_FORMAT(created_at, '%d %b %Y %H:%i') AS `time`
    FROM notifications
    WHERE
        target_user = $uid
        OR target_role = '$role'
        OR target_role = 'all'
    ORDER BY created_at DESC
    LIMIT 50
");

$notifications = [];
while ($row = $res->fetch_assoc()) {
    $row['read'] = (bool) $row['read'];
    $notifications[] = $row;
}

ok(['notifications' => $notifications]);

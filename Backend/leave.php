<?php
require_once __DIR__ . '/config.php';
$user = requireAuth('worker');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') fail('Method not allowed.', 405);

$type      = esc(post('type', 'casual'));
$startDate = esc(post('start_date'));
$endDate   = esc(post('end_date', $startDate));
$reason    = esc(post('reason'));

if (!$startDate || !$reason) fail('Leave date and reason are required.');

// Validate type
if (!in_array($type, ['casual', 'medical', 'personal'])) $type = 'casual';

// Must be at least 1 day in the future
if ($startDate < date('Y-m-d', strtotime('+1 day'))) {
    fail('Leave must be requested at least 1 day in advance.');
}

$db  = db();
$uid = (int) $user['id'];

$db->query("
    INSERT INTO leave_requests (worker_id, type, start_date, end_date, reason, status)
    VALUES ($uid, '$type', '$startDate', '$endDate', '$reason', 'pending')
");

if ($db->affected_rows < 1) fail('Failed to submit leave request.');

// Notify admin
$name = esc($user['full_name']);
$db->query("
    INSERT INTO notifications (target_role, type, title, msg)
    VALUES ('admin', 'leave',
            'Leave Request',
            '$name has requested $type leave from $startDate to $endDate.')
");

ok(['message' => 'Leave request submitted successfully!']);

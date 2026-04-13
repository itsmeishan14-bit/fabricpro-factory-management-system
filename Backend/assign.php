<?php
require_once __DIR__ . '/config.php';
requireAuth('admin');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') fail('Method not allowed.', 405);

$workerId = safeInt('worker_id');
$orderId  = safeInt('order_id');
$stage    = esc(post('stage', 'sewing'));
$target   = safeInt('target');
$rate     = safeFloat('rate', 25.00);
$dueDate  = esc(post('due_date'));

if (!$workerId || !$orderId || $target < 1) {
    fail('Worker, order, and target pieces are required.');
}

$db = db();

// Verify worker exists
$wRes = $db->query("SELECT id, full_name FROM users WHERE id=$workerId AND role='worker' LIMIT 1");
if (!$wRes || $wRes->num_rows === 0) fail('Worker not found.');
$worker = $wRes->fetch_assoc();

// Verify order exists
$oRes = $db->query("SELECT id, product FROM orders WHERE id=$orderId LIMIT 1");
if (!$oRes || $oRes->num_rows === 0) fail('Order not found.');
$order = $oRes->fetch_assoc();

$product = esc($order['product']);
$dueSql  = $dueDate ? "'$dueDate'" : 'NULL';

$db->query("
    INSERT INTO tasks (worker_id, order_id, product, stage, target, rate, due_date, status)
    VALUES ($workerId, $orderId, '$product', '$stage', $target, $rate, $dueSql, 'pending')
");

if ($db->affected_rows < 1) fail('Failed to create task.');

// Notify the worker
$workerName = esc($worker['full_name']);
$db->query("
    INSERT INTO notifications (target_role, target_user, type, title, msg)
    VALUES ('worker', $workerId, 'task',
            'New Task Assigned',
            'You have been assigned $target pieces of $product ($stage stage).')
");

// Update order status to inProgress if it was pending
$db->query("UPDATE orders SET status='inProgress' WHERE id=$orderId AND status='pending'");

ok(['message' => 'Task assigned successfully.']);
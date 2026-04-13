<?php
require_once __DIR__ . '/config.php';
$user = requireAuth('worker');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') fail('Method not allowed.', 405);

$material = esc(post('type', post('material')));
$qty      = safeFloat('qty', 1);
$unit     = esc(post('unit', 'meters'));
$urgency  = esc(post('urgency', 'normal'));
$spec     = esc(post('specification', post('spec')));
$notes    = esc(post('notes'));

if (!$material || $qty <= 0) fail('Material type and quantity are required.');

if (!in_array($urgency, ['normal', 'urgent', 'critical'])) $urgency = 'normal';

$db  = db();
$uid = (int) $user['id'];

$db->query("
    INSERT INTO material_requests
        (worker_id, material, qty, unit, urgency, specification, notes, status)
    VALUES
        ($uid, '$material', $qty, '$unit', '$urgency', '$spec', '$notes', 'pending')
");

if ($db->affected_rows < 1) fail('Failed to submit material request.');

// Notify admin
$name = esc($user['full_name']);
$db->query("
    INSERT INTO notifications (target_role, type, title, msg)
    VALUES ('admin', 'stock',
            'Material Request',
            '$name needs $qty $unit of $material ($urgency priority).')
");

ok(['message' => 'Material request submitted successfully!']);

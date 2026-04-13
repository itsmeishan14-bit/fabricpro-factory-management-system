<?php
require_once __DIR__ . '/config.php';
$user = requireAuth('any');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') fail('Method not allowed.', 405);

$currentPass = post('current_password', post('currentPass'));
$newPass     = post('new_password',     post('newPass'));
$confirmPass = post('confirm_password', post('confPass'));

if (!$currentPass || !$newPass || !$confirmPass) fail('All password fields are required.');
if ($newPass !== $confirmPass)                   fail('New passwords do not match.');
if (strlen($newPass) < 6)                        fail('Password must be at least 6 characters.');

$db  = db();
$uid = (int) $user['id'];

// Fetch stored password
$res  = $db->query("SELECT password FROM users WHERE id=$uid LIMIT 1");
$row  = $res->fetch_assoc();
$hash = $row['password'];

// Verify current password (supports bcrypt and legacy plain text)
$valid = password_verify($currentPass, $hash) || ($hash === $currentPass);
if (!$valid) fail('Current password is incorrect.');

$newHash = esc(password_hash($newPass, PASSWORD_DEFAULT));
$db->query("UPDATE users SET password='$newHash' WHERE id=$uid");

ok(['message' => 'Password changed successfully.']);

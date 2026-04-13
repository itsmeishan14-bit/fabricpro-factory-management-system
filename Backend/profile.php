<?php
require_once __DIR__ . '/config.php';
$user = requireAuth('any');

$db  = db();
$uid = (int) $user['id'];

// ── GET: return current profile ──────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $res = $db->query("
        SELECT id, username, full_name, role, department, email, phone, color, rate_per_piece
        FROM users WHERE id = $uid LIMIT 1
    ");
    $profile = $res->fetch_assoc();
    ok(['data' => $profile]);
}

// ── POST: update profile ─────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] !== 'POST') fail('Method not allowed.', 405);

$fullName = esc(post('full_name', post('name')));
$email    = esc(post('email'));
$phone    = esc(post('phone'));

if (!$fullName) fail('Full name is required.');

$db->query("
    UPDATE users
    SET full_name='$fullName', email='$email', phone='$phone'
    WHERE id=$uid
");

ok(['message' => 'Profile updated successfully.']);

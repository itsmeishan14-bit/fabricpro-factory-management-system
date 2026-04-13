<?php
require_once __DIR__ . '/config.php';
requireAuth('admin');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') fail('Method not allowed.', 405);

$fullName   = esc(post('full_name', post('name')));
$username   = esc(strtolower(post('username')));
$password   = post('password', 'pass123');
$department = esc(post('department', post('role', 'Sewing')));
$email      = esc(post('email'));
$phone      = esc(post('phone'));
$rate       = safeFloat('rate_per_piece', 25.00);

if (!$fullName || !$username) fail('Full name and username are required.');

// Auto-generate username if not provided
if (!$username) {
    $username = esc(strtolower(str_replace(' ', '.', $fullName)) . rand(10, 99));
}

$hash   = esc(password_hash($password, PASSWORD_DEFAULT));
$colors = ['#059669','#7C3AED','#EA580C','#DC2626','#0891B2','#D97706','#4F46E5'];
$color  = esc($colors[array_rand($colors)]);

$db = db();

// Check username uniqueness
$exists = $db->query("SELECT id FROM users WHERE username='$username' LIMIT 1");
if ($exists->num_rows > 0) fail("Username '$username' is already taken. Please choose another.");

$db->query("
    INSERT INTO users (username, password, full_name, role, department, email, phone, color, rate_per_piece)
    VALUES ('$username', '$hash', '$fullName', 'worker', '$department', '$email', '$phone', '$color', $rate)
");

if ($db->affected_rows < 1) fail('Failed to create employee.');

$newId = $db->insert_id;

ok([
    'message'  => "Employee '$fullName' added successfully.",
    'employee' => [
        'id'       => $newId,
        'username' => $username,
        'name'     => $fullName,
        'role'     => 'worker',
        'dept'     => $department,
    ]
]);

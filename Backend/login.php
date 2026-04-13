<?php
require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') fail('Method not allowed.', 405);

$username = post('username');
$password = post('password');
if (!$username || !$password) fail('Username and password are required.');

$db  = db();
$usr = esc($username);
$res = $db->query("SELECT * FROM users WHERE LOWER(username)=LOWER('$usr') LIMIT 1");
if (!$res || $res->num_rows === 0) fail('Invalid username or password.');

$user  = $res->fetch_assoc();
$valid = password_verify($password, $user['password']) || ($user['password'] === $password);
if (!$valid) fail('Invalid username or password.');

// Create session
$token     = bin2hex(random_bytes(32));
$expiresAt = date('Y-m-d H:i:s', strtotime('+7 days'));
$uid       = (int)$user['id'];
$tok       = esc($token);

// Create sessions table if missing
$db->query("CREATE TABLE IF NOT EXISTS sessions (
    session_token VARCHAR(64) PRIMARY KEY,
    user_id INT NOT NULL,
    expires_at DATETIME NOT NULL
)");

$db->query("INSERT INTO sessions (session_token,user_id,expires_at) VALUES ('$tok',$uid,'$expiresAt')");

setcookie('fp_token', $token, ['expires'=>strtotime('+7 days'),'path'=>'/','httponly'=>true,'samesite'=>'Lax']);

ok([
    'token' => $token,
    'user'  => [
        'id'         => $uid,
        'username'   => $user['username'],
        'name'       => $user['full_name']   ?? $user['username'],
        'full_name'  => $user['full_name']   ?? $user['username'],
        'role'       => $user['role']        ?? 'worker',
        'department' => $user['department']  ?? '',
        'email'      => $user['email']       ?? '',
        'phone'      => $user['phone']       ?? '',
        'color'      => $user['color']       ?? '#2563EB',
    ],
]);

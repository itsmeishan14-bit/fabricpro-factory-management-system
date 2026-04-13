<?php
require_once __DIR__ . '/config.php';
$token = null;
$h = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
if (str_starts_with($h, 'Bearer ')) $token = substr($h, 7);
elseif (!empty($_COOKIE['fp_token'])) $token = $_COOKIE['fp_token'];
if ($token) { $tok = esc($token); db()->query("DELETE FROM sessions WHERE session_token='$tok'"); }
setcookie('fp_token', '', time()-3600, '/');
ok(['message'=>'Logged out.']);

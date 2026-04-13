<?php
// FabricPro — config.php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'fabricpro_db');

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

function db(): mysqli {
    static $conn = null;
    if ($conn === null) {
        $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
        if ($conn->connect_error) {
            http_response_code(500);
            echo json_encode(['success'=>false,'message'=>'Database connection failed: '.$conn->connect_error]);
            exit;
        }
        $conn->set_charset('utf8mb4');
    }
    return $conn;
}

function ok(array $payload = []): void {
    echo json_encode(array_merge(['success'=>true], $payload));
    exit;
}

function fail(string $message, int $code = 400): void {
    http_response_code($code);
    echo json_encode(['success'=>false,'message'=>$message]);
    exit;
}

function getSessionUser(): ?array {
    $token = null;
    $h = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if (str_starts_with($h, 'Bearer ')) $token = substr($h, 7);
    elseif (!empty($_COOKIE['fp_token'])) $token = $_COOKIE['fp_token'];
    if (!$token) return null;
    $db  = db();
    $tok = $db->real_escape_string($token);
    $res = $db->query("SELECT u.* FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.session_token='$tok' AND s.expires_at>NOW() LIMIT 1");
    if (!$res || $res->num_rows===0) return null;
    return $res->fetch_assoc();
}

function requireAuth(string $role = 'any'): array {
    $user = getSessionUser();
    if (!$user) fail('Unauthorized — please log in.', 401);
    if ($role !== 'any' && $user['role'] !== $role) fail('Forbidden.', 403);
    return $user;
}

function post(string $k, string $d = ''): string { return trim($_POST[$k] ?? $d); }
function get(string $k, string $d = ''): string  { return trim($_GET[$k]  ?? $d); }
function safeInt(string $k, int $d = 0, bool $g = false): int { return (int)($g ? ($_GET[$k]??$d) : ($_POST[$k]??$d)); }
function safeFloat(string $k, float $d = 0.0): float { return (float)($_POST[$k] ?? $d); }
function esc(string $v): string { return db()->real_escape_string($v); }

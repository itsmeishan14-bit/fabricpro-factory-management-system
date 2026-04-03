<?php
include 'db.php';

$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

if (!$username || !$password) {
  echo json_encode(["success" => false]);
  exit;
}

$sql = "SELECT * FROM users WHERE username='$username' AND password='$password'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  $user = $result->fetch_assoc();
  echo json_encode([
    "success" => true,
    "user" => $user
  ]);
} else {
  echo json_encode([
    "success" => false
  ]);
}
?>
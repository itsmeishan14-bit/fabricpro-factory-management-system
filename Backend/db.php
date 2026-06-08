<?php
/*
 * db.php – Legacy connection file kept for backward compatibility.
 * All new backend files use config.php directly (db() function).
 * Update ONLY config.php when changing database credentials.
 */
require_once __DIR__ . '/config.php';

// Expose $conn for any legacy code that still uses it directly
$conn = db();
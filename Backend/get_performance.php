<?php
require_once __DIR__ . '/config.php';
requireAuth('admin');

$db = db();

$res = $db->query("
    SELECT
        u.id,
        u.full_name  AS name,
        u.department AS role,
        u.color,
        CONCAT(
            UPPER(SUBSTRING_INDEX(u.full_name,' ',1)), '',
            UPPER(SUBSTRING(SUBSTRING_INDEX(u.full_name,' ',-1),1,1))
        ) AS initials,
        COALESCE(SUM(t.done), 0)                        AS totalPieces,
        COUNT(DISTINCT a.date)                          AS daysWorked,
        CASE
            WHEN COUNT(DISTINCT a.date) > 0
            THEN ROUND(SUM(t.done) / COUNT(DISTINCT a.date))
            ELSE 0
        END                                             AS piecesPerDay,
        COALESCE(ROUND(AVG(q.score), 1), 98)            AS quality
    FROM users u
    LEFT JOIN tasks t ON t.worker_id = u.id
        AND MONTH(t.created_at) = MONTH(CURDATE())
        AND YEAR(t.created_at)  = YEAR(CURDATE())
    LEFT JOIN attendance a ON a.user_id = u.id
        AND a.status != 'absent'
        AND MONTH(a.date) = MONTH(CURDATE())
        AND YEAR(a.date)  = YEAR(CURDATE())
    LEFT JOIN quality q ON q.worker_id = u.id
    WHERE u.role = 'worker'
    GROUP BY u.id
    ORDER BY totalPieces DESC, quality DESC
");

$performance = [];
while ($row = $res->fetch_assoc()) {
    $row['totalPieces']  = (int)   $row['totalPieces'];
    $row['daysWorked']   = (int)   $row['daysWorked'];
    $row['piecesPerDay'] = (int)   $row['piecesPerDay'];
    $row['quality']      = (float) $row['quality'];

    // Suggestion logic
    if ($row['quality'] < 80) {
        $row['suggestion'] = '⚠️ Quality training needed';
    } elseif ($row['piecesPerDay'] === 0) {
        $row['suggestion'] = 'No activity this month';
    } elseif ($row['piecesPerDay'] >= 30) {
        $row['suggestion'] = '⭐ Top performer — consider bonus';
    } else {
        $row['suggestion'] = '✓ On track';
    }

    $performance[] = $row;
}

ok(['performance' => $performance]);

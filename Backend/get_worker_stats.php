<?php
require_once __DIR__ . '/config.php';
$user = requireAuth('worker');

$db    = db();
$uid   = (int) $user['id'];
$today = date('Y-m-d');
$month = date('F Y');

// ── Earnings ─────────────────────────────────────────────────
$earning = $db->query("
    SELECT
        COALESCE(SUM(salary), 0) AS month_total,
        COALESCE(SUM(bonus),  0) AS total_bonus
    FROM payments
    WHERE worker_id = $uid AND period = '$month'
")->fetch_assoc();

// Today's earnings
$todayEarning = $db->query("
    SELECT COALESCE(SUM(t.done * t.rate), 0) AS today_earn
    FROM tasks t
    JOIN attendance a ON a.user_id = t.worker_id AND a.date = '$today'
    WHERE t.worker_id = $uid
")->fetch_assoc();

// Week earnings
$weekStart = date('Y-m-d', strtotime('monday this week'));
$weekEarning = $db->query("
    SELECT COALESCE(SUM(t.done * t.rate), 0) AS week_earn
    FROM tasks t
    WHERE t.worker_id = $uid
      AND t.created_at >= '$weekStart'
")->fetch_assoc();

// Total pieces this month
$pieces = $db->query("
    SELECT COALESCE(SUM(done), 0) AS total_pieces
    FROM tasks
    WHERE worker_id = $uid
      AND MONTH(created_at) = MONTH(CURDATE())
      AND YEAR(created_at)  = YEAR(CURDATE())
")->fetch_assoc();

// ── Quality score ─────────────────────────────────────────────
$quality = $db->query("
    SELECT COALESCE(AVG(score), 98) AS avg_score
    FROM quality WHERE worker_id = $uid
")->fetch_assoc();

// ── Rank among workers by pieces this month ───────────────────
$rankRes = $db->query("
    SELECT worker_id,
           RANK() OVER (ORDER BY SUM(done) DESC) AS rnk
    FROM tasks
    WHERE MONTH(created_at) = MONTH(CURDATE())
      AND YEAR(created_at)  = YEAR(CURDATE())
    GROUP BY worker_id
");
$rank = null;
while ($r = $rankRes->fetch_assoc()) {
    if ((int)$r['worker_id'] === $uid) { $rank = (int)$r['rnk']; break; }
}

// ── Efficiency: avg pieces per working day this month ────────
$daysWorked = (int) $db->query("
    SELECT COUNT(*) c FROM attendance
    WHERE user_id=$uid AND status != 'absent'
      AND MONTH(date) = MONTH(CURDATE())
      AND YEAR(date)  = YEAR(CURDATE())
")->fetch_row()[0];

$totalPieces = (int) $pieces['total_pieces'];
$efficiency  = $daysWorked > 0 ? round($totalPieces / $daysWorked) : 0;

// ── Today's attendance record ─────────────────────────────────
$att = $db->query("
    SELECT
        TIME_FORMAT(check_in,  '%H:%i') AS checkIn,
        TIME_FORMAT(check_out, '%H:%i') AS checkOut,
        status
    FROM attendance WHERE user_id=$uid AND date='$today' LIMIT 1
")->fetch_assoc();

ok([
    'data' => [
        'earnings'     => (float) ($earning['month_total'] ?? 0),
        'todayEarnings'=> (float) ($todayEarning['today_earn'] ?? 0),
        'weekEarnings' => (float) ($weekEarning['week_earn'] ?? 0),
        'pieces'       => $totalPieces,
        'qualityScore' => round((float)($quality['avg_score'] ?? 98), 1),
        'rank'         => $rank ?? '—',
        'efficiency'   => $efficiency ?: '—',
        'periodLabel'  => $month,
        'attendance'   => $att ?: null,
    ]
]);

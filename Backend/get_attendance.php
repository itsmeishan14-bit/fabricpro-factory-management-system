<?php
require_once __DIR__ . '/config.php';
requireAuth('admin');
$db=db(); $date=esc(get('date',date('Y-m-d')));
$res=$db->query("SELECT u.full_name AS name,a.date,TIME_FORMAT(a.check_in,'%H:%i') AS checkIn,TIME_FORMAT(a.check_out,'%H:%i') AS checkOut,CASE WHEN a.check_in IS NOT NULL AND a.check_out IS NOT NULL THEN CONCAT(FLOOR(TIMESTAMPDIFF(MINUTE,CONCAT(a.date,' ',a.check_in),CONCAT(a.date,' ',a.check_out))/60),'h ',MOD(TIMESTAMPDIFF(MINUTE,CONCAT(a.date,' ',a.check_in),CONCAT(a.date,' ',a.check_out)),60),'m') ELSE '—' END AS hours,a.status FROM attendance a JOIN users u ON u.id=a.user_id WHERE a.date='$date' ORDER BY a.check_in ASC");
$rows=[];
while($r=$res->fetch_assoc())$rows[]=$r;
ok(['attendance'=>$rows]);

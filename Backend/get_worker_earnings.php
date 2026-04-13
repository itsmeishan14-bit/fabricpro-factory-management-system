<?php
require_once __DIR__ . '/config.php';
$user=requireAuth('worker');
$db=db(); $uid=(int)$user['id'];
$res=$db->query("SELECT p.id,p.period,p.pieces,p.rate,p.bonus,p.salary,p.status,DATE_FORMAT(p.paid_date,'%d %b %Y') AS paid_date FROM payments p WHERE p.worker_id=$uid ORDER BY p.created_at DESC LIMIT 12");
$rows=[];
while($r=$res->fetch_assoc()){$r['pieces']=(int)$r['pieces'];$r['salary']=(float)$r['salary'];$r['bonus']=(float)$r['bonus'];$rows[]=$r;}
$month=date('F Y');
$cur=$db->query("SELECT COALESCE(SUM(salary),0) AS total,COALESCE(SUM(pieces),0) AS pieces,COALESCE(SUM(bonus),0) AS bonus FROM payments WHERE worker_id=$uid AND period='$month'")->fetch_assoc();
ok(['history'=>$rows,'current'=>['total'=>(float)$cur['total'],'pieces'=>(int)$cur['pieces'],'bonus'=>(float)$cur['bonus'],'period'=>$month]]);

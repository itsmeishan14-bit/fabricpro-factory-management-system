<?php
require_once __DIR__ . '/config.php';
requireAuth('admin');
$db=db();
$res=$db->query("SELECT p.id,u.full_name AS name,p.period,p.pieces,p.rate,p.bonus,p.salary,p.status,DATE_FORMAT(p.paid_date,'%d %b %Y') AS `date` FROM payments p JOIN users u ON u.id=p.worker_id ORDER BY p.status ASC,p.created_at DESC");
$rows=[];
while($r=$res->fetch_assoc()){$r['pieces']=(int)$r['pieces'];$r['rate']=(float)$r['rate'];$r['bonus']=(float)$r['bonus'];$r['salary']=(float)$r['salary'];$rows[]=$r;}
ok(['payments'=>$rows]);

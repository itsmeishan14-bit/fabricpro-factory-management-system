<?php
require_once __DIR__ . '/config.php';
requireAuth('admin');
$db=db();
$res=$db->query("SELECT q.id,u.full_name AS name,q.task_name AS task,q.total,q.defective,q.score,DATE_FORMAT(q.checked_date,'%d %b %Y') AS `date` FROM quality q JOIN users u ON u.id=q.worker_id ORDER BY q.checked_date DESC");
$rows=[];
while($r=$res->fetch_assoc()){$r['total']=(int)$r['total'];$r['defective']=(int)$r['defective'];$r['score']=(float)$r['score'];$rows[]=$r;}
ok(['quality'=>$rows]);

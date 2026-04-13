<?php
require_once __DIR__ . '/config.php';
$user=requireAuth('worker');
$db=db(); $uid=(int)$user['id'];
$r=$db->query("SELECT id,username,full_name,role,department,email,phone,color FROM users WHERE id=$uid LIMIT 1")->fetch_assoc();
$pieces=(int)$db->query("SELECT COALESCE(SUM(done),0) FROM tasks WHERE worker_id=$uid AND MONTH(created_at)=MONTH(CURDATE())")->fetch_row()[0];
$earnings=(float)$db->query("SELECT COALESCE(SUM(salary),0) FROM payments WHERE worker_id=$uid AND period='".date('F Y')."'")->fetch_row()[0];
$quality=(float)$db->query("SELECT COALESCE(AVG(score),98) FROM quality WHERE worker_id=$uid")->fetch_row()[0];
ok(['data'=>array_merge($r,['pieces'=>$pieces,'earnings'=>$earnings,'quality'=>round($quality,1)])]);

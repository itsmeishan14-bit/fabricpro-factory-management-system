<?php
require_once __DIR__ . '/config.php';
requireAuth('admin');
$db=$db=db(); $today=date('Y-m-d');
$res=$db->query("SELECT u.id,u.full_name AS name,u.department AS role,u.color,u.email,u.phone,COALESCE(SUM(t.done),0) AS pieces,COALESCE(SUM(t.done*t.rate),0) AS earnings,COALESCE(att.status,'absent') AS status FROM users u LEFT JOIN tasks t ON t.worker_id=u.id LEFT JOIN attendance att ON att.user_id=u.id AND att.date='$today' WHERE u.role='worker' GROUP BY u.id ORDER BY pieces DESC");
$rows=[];
while($r=$res->fetch_assoc()){
    $r['pieces']=(int)$r['pieces']; $r['earnings']=(float)$r['earnings'];
    $parts=explode(' ',trim($r['name']));
    $r['initials']=strtoupper(substr($parts[0],0,1).substr(end($parts),0,1));
    $rows[]=$r;
}
ok(['employees'=>$rows]);

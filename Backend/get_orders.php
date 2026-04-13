<?php
require_once __DIR__ . '/config.php';
requireAuth('admin');
$db=db();
$res=$db->query("SELECT id,order_code AS order_id,product,client,quantity AS qty,done,stage,DATE_FORMAT(deadline,'%d %b %Y') AS deadline,delay,status,CASE WHEN quantity>0 THEN ROUND((done/quantity)*100) ELSE 0 END AS progress FROM orders ORDER BY created_at DESC");
$rows=[];
while($r=$res->fetch_assoc()){$r['qty']=(int)$r['qty'];$r['done']=(int)$r['done'];$r['progress']=(int)$r['progress'];$r['delay']=(bool)$r['delay'];$rows[]=$r;}
ok(['orders'=>$rows]);

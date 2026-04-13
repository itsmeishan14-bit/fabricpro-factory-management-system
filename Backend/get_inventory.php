<?php
require_once __DIR__ . '/config.php';
requireAuth('admin');
$db=db();
$res=$db->query("SELECT id,name,category,qty,unit,max_qty AS `max`,threshold FROM inventory ORDER BY name");
$rows=[];
while($r=$res->fetch_assoc()){$r['qty']=(float)$r['qty'];$r['max']=(float)$r['max'];$r['threshold']=(float)$r['threshold'];$rows[]=$r;}
ok(['inventory'=>$rows]);

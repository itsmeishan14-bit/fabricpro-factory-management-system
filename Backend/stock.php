<?php
require_once __DIR__ . '/config.php';
requireAuth('admin');
if($_SERVER['REQUEST_METHOD']!=='POST') fail('Method not allowed.',405);
$name=esc(post('material_name',post('name'))); $qty=safeFloat('qty'); $unit=esc(post('unit','meters')); $itemId=safeInt('item_id');
$db=db();
if($itemId>0){$db->query("UPDATE inventory SET qty=qty+$qty WHERE id=$itemId"); ok(['message'=>'Stock updated.']);}
if(!$name) fail('Name required.');
$max=safeFloat('max_qty',100); $thr=safeFloat('threshold',10); $cat=esc(post('category','cloth'));
$db->query("INSERT INTO inventory(name,category,qty,unit,max_qty,threshold) VALUES('$name','$cat',$qty,'$unit',$max,$thr) ON DUPLICATE KEY UPDATE qty=qty+$qty");
ok(['message'=>'Stock added.']);

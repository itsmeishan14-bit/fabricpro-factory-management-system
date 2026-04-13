<?php
require_once __DIR__ . '/config.php';
requireAuth('admin');
if($_SERVER['REQUEST_METHOD']!=='POST') fail('Method not allowed.',405);
$product=esc(post('product')); $client=esc(post('client')); $qty=safeInt('quantity'); $deadline=esc(post('deadline')); $stage=esc(post('stage','cutting'));
if(!$product||$qty<1) fail('Product and quantity required.');
$db=db(); $code='ORD-'.strtoupper(bin2hex(random_bytes(3)));
$db->query("INSERT INTO orders(order_code,product,client,quantity,stage,deadline,status) VALUES('$code','$product','$client',$qty,'$stage',".($deadline?"'$deadline'":"NULL").",'pending')");
if($db->affected_rows<1) fail('Failed to create order.');
ok(['message'=>'Order created.','order_code'=>$code]);

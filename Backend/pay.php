<?php
require_once __DIR__ . '/config.php';
requireAuth('admin');
if($_SERVER['REQUEST_METHOD']!=='POST') fail('Method not allowed.',405);
$id=safeInt('id')?:safeInt('payment_id');
if(!$id) fail('Payment ID required.');
$db=db(); $today=date('Y-m-d');
$db->query("UPDATE payments SET status='paid',paid_date='$today' WHERE id=$id AND status='pending'");
if($db->affected_rows<1) fail('Not found or already paid.');
$r=$db->query("SELECT salary,period,worker_id FROM payments WHERE id=$id")->fetch_assoc();
if($r){$s=number_format($r['salary'],0);$p=esc($r['period']);$wid=(int)$r['worker_id'];
$db->query("INSERT INTO notifications(target_role,target_user,type,title,msg) VALUES('worker',$wid,'payment','Salary Paid','Your salary of Rs $s for $p has been processed.')");}
ok(['message'=>'Payment marked paid.']);

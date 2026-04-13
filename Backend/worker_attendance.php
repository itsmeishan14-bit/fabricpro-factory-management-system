<?php
require_once __DIR__ . '/config.php';
$user=requireAuth('worker');
if($_SERVER['REQUEST_METHOD']!=='POST') fail('Method not allowed.',405);
$db=db(); $uid=(int)$user['id']; $today=date('Y-m-d'); $now=date('H:i:s');
$rec=$db->query("SELECT * FROM attendance WHERE user_id=$uid AND date='$today' LIMIT 1")->fetch_assoc();
if(!$rec){
    $status=($now>'09:00:00')?'late':'present';
    $db->query("INSERT INTO attendance(user_id,date,check_in,status) VALUES($uid,'$today','$now','$status')");
    ok(['action'=>'checkin','time'=>date('H:i'),'message'=>'Checked in successfully!']);
}
if($rec['check_out']) fail('Already checked out today.');
$db->query("UPDATE attendance SET check_out='$now' WHERE user_id=$uid AND date='$today'");
ok(['action'=>'checkout','time'=>date('H:i'),'message'=>'Checked out successfully!']);

<?php
require_once __DIR__ . '/config.php';
requireAuth('admin');
if($_SERVER['REQUEST_METHOD']!=='POST') fail('Method not allowed.',405);
$title=esc(post('title',post('subject'))); $msg=esc(post('message',post('msg',post('body')))); $role=esc(post('target_role','worker')); $uid=safeInt('target_user');
if(!$title) fail('Title required.');
$db=db();
if($uid>0) $db->query("INSERT INTO notifications(target_role,target_user,type,title,msg) VALUES('worker',$uid,'message','$title','$msg')");
else $db->query("INSERT INTO notifications(target_role,type,title,msg) VALUES('$role','message','$title','$msg')");
ok(['message'=>'Message sent.']);

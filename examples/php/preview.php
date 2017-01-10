<?php
$recipient = $_POST['recipient'];
$subject = $_POST['subject'];
$htmlCode = $_POST['htmlCode'];

mail($recipient, $subject, $htmlCode);

echo '{success:true}';
<?php

$errorMSG = "";

// NAME
if (empty($_POST["name"])) {
    $errorMSG = "Name is required ";
} else {
    $name = $_POST["name"];
}

// EMAIL
if (empty($_POST["email"])) {
    $errorMSG .= "Email is required ";
} else {
    $email = $_POST["email"];
}

// MESSAGE
if (empty($_POST["message"])) {
    $errorMSG .= "Message is required ";
} else {
    $message = $_POST["message"];
}


//$EmailTo = "info@thatslosangeles.net, freddie.horstmann@losangelesapparel.net";
$EmailTo = "freddie.horstmann@gmail.com";
$Subject = "FrhDesigns- Web Lead";

// prepare email body text
$Body = "";
$Body .= "Name: ";
$Body .= $name;
$Body .= "\n";
$Body .= "Email: ";
$Body .= $email;
$Body .= "\n";
$Body .= "Message: ";
$Body .= $message;
$Body .= "\n";
$header  .= 'MIME-Version: 1.0' . "\r\n";
$header .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

// send email


if(isset($_POST['url']) && $_POST['url'] == ''){
	$success = mail($EmailTo, $Subject, $Body, 'From: <'.$email.'>',$header);
	
}


// redirect to success page
if ($success && $errorMSG == ""){
   echo "success";
} else{
    if($errorMSG == ""){
        echo "Something went wrong :(";
    } else {
        echo $errorMSG;
    }
}

?>
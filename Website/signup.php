<?php

$firstName = $_POST["firstname"];
$lastName = $_POST["lastname"];
$DOB = $_POST["DOBMonth"] + "." + $_POST["DOBDay"] + "." + $_POST["DOBYear"];
$school = $_POST["school"];
$email = $_POST["email"];
$password = $_POST["password"];
$confirmpassword = $_POST["passwordconfirm"];

header( 'Location: clubs.html' );

?>
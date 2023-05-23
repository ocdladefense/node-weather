<?php


//Get email information from .env

//<p>Time of contact: ". $contactTime . "</p>
//<p>Notes: ". $notesInput . "</p>
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
// require 'PHPMailer-master/src/Exception.php';
// require 'PHPMailer-master/src/PHPMailer.php';
// require 'PHPMailer-master/src/SMTP.php';

//Load Composer's autoloader
//require '../vendor/autoload.php';

//Create an instance; passing `true` enables exceptions
function sendMail($recipient, $subject, $message){
  $sender = $_ENV['PHP_MAILER_SENDER_ADDRESS'];
  $password =  $_ENV['PHP_MAILER_PASSWORD'];

  $mail = new PHPMailer(true);
  try {
      //Server settings
      $mail->SMTPDebug = 0;                      //Enable verbose debug output
      $mail->isSMTP();                                            //Send using SMTP
      $mail->Mailer     = "smtp";
      $mail->Host       = "smtp.gmail.com";                     //Set the SMTP server to send through
      $mail->SMTPAuth   = TRUE;                                   //Enable SMTP authentication
      $mail->Username   = $sender;                     //SMTP username
      $mail->Password   =  $password;                               //SMTP password
      $mail->SMTPSecure = "tls";            //Enable implicit TLS encryption
      $mail->Port       = 587;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

      //Recipients
      $mail->setFrom($sender, "Test Issue");
      $mail->addAddress($recipient);     //sends the message to this address


      //Attachments


      //Content
      $mail->isHTML(true);                                  //Set email format to HTML

      $mail->Subject = $subject;
      $mail->Body    = $message;
      $mail->AltBody = strip_tags($message);
      $mail->MsgHTML($message);
      $mail->Send();
      return "Message sent!";

  } catch (Exception $e) {
      return "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
  }
}

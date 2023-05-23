<?php error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING & ~E_DEPRECATED);
  //Load Composer's autoloader
  require_once __DIR__ . '/vendor/autoload.php';

  define("BASE_DIR", __DIR__);
  require_once BASE_DIR . '/includes/envSetup.php';
  require_once BASE_DIR . '/includes/view.php';
  require_once BASE_DIR . '/includes/routing.php';
  //Get env variables:
  require_once BASE_DIR . '/includes/routing.php';
  require_once BASE_DIR . '/includes/mail.php';

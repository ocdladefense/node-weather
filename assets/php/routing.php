<?php
function getModules(){
  global $routes;
  $routes = [];
  $justModulesDirectory = BASE_DIR . '/modules';
  $files = scandir($justModulesDirectory);

  foreach ($files as $file){
    if ($file == '.' || $file == '..'){
      continue;
    }
    $foobar = $justModulesDirectory . '/' . $file;
    if (!is_dir($foobar)){
      continue;
    }
    if (!file_exists($foobar . '/module.php')){
      continue;
    }
    require $foobar . '/module.php';
    $fn = $file . '\routes';
    $routes = array_merge($routes, $fn());
  }
}


function processRoute($request) {
  global $routes;
    ob_start();
    $requestString = substr($request, 1);
    $callback = $routes[$requestString];
    $output = $callback();

    $out = ob_get_contents();
    ob_end_clean();
    return $out;

    $backtrace = debug_backtrace();
    echo '<pre> debug:';
    print_r($backtrace);
    echo '</pre>';
    die("Debug code reached");
}
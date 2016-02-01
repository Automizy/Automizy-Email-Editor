<?php

$translateDir = __DIR__ . '/languages/'; //mo files
$autoloadPhpFile = __DIR__ . '/.composer/autoload.php';
$targetDir = __DIR__ . '/src/js/generate/languages/';  //js files



header('Content-Type: text/html; charset=utf-8');

require_once $autoloadPhpFile;
$files = scandir($translateDir);
$langs = [];

foreach ($files as $file) {
    if (substr($file, -3) != '.mo') {
        continue;
    }
    $lang = substr($file, 0, 5);
    $langs[] = $lang;

    $i18n = (new \Zend\I18n\Translator\Loader\Gettext)->load($lang, $translateDir . $lang . '.mo')->getArrayCopy();

    $i18njs = "window.I18NLocale='" . $lang . "';window.I18N={";
    foreach ($i18n as $k => $v) {
        $key = addslashes($k);
        $value = addslashes($v);
        $i18njs .= "'$key':'$value',";
    }
    $i18njs .= "'':''}; ";

    file_put_contents($targetDir . $lang . '.js', str_replace(["\n", "\r\n"], ['', ''], $i18njs));
}

foreach ($langs as $l) {
    echo $l . PHP_EOL;
}

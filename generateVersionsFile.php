<?php
$inputDir = "src";
$outputFile = "src/js/generate/versions.js";
$lastUpdateTimeOutputFile = "src/js/generate/lastUpdateTime.js";

$prefix = strlen($inputDir);
$content = "var VERSIONS = {\r\n";
$maxT = 0;

$pattern = "\t'%s':%d,\r\n";
$it = new RecursiveIteratorIterator(
	new RecursiveDirectoryIterator(
		$inputDir,
		FilesystemIterator::SKIP_DOTS | FilesystemIterator::UNIX_PATHS
	),
	RecursiveIteratorIterator::SELF_FIRST, RecursiveIteratorIterator:: CATCH_GET_CHILD
);

foreach ($it as $file) {
    if (is_dir($file)) {
		continue;
    }
    $t = filemtime($file);
    if($t > $maxT){
        $maxT = $t;
    }
    $content .= sprintf($pattern, substr($file, $prefix + 1), $t);
}

$content .= "};";
file_put_contents($outputFile, $content);
file_put_contents($lastUpdateTimeOutputFile, 'window.lastUpdateTime = '.$maxT.';');
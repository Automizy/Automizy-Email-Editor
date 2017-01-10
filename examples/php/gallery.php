<?php
function path2url($file, $Protocol='http://') {
    $docRoot = str_replace('/', '\\', $_SERVER['DOCUMENT_ROOT']);
    return $Protocol.$_SERVER['HTTP_HOST'].str_replace($docRoot, '', $file);
}

$dir    = __DIR__.'/gallery';
$files = scandir($dir);
$gallery = [];

foreach($files as $file){
    $path = $dir.'/'.$file;
    $fileType = filetype($path);
    if($fileType === 'file') {
        $gallery[] = [
            "alt" => $file,
            "extension" => pathinfo($path, PATHINFO_EXTENSION),
            "thumbnailUrl" => path2url($dir) . '/thumbnails/' . $file,
            "title" => $file,
            "type" => filetype($path),
            "url" => path2url($path)
        ];
    }
}
echo json_encode($gallery);
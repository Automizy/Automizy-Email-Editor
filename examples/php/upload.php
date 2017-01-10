<?php
function path2url($file, $Protocol='http://') {
    $docRoot = str_replace('/', '\\', $_SERVER['DOCUMENT_ROOT']);
    return $Protocol.$_SERVER['HTTP_HOST'].str_replace($docRoot, '', $file);
}
function make_thumb($src, $dest, $desired_width) {
    $ext = pathinfo($src, PATHINFO_EXTENSION);
    if($ext === 'png'){
        $source_image = imagecreatefrompng($src);
    }else{
        $source_image = imagecreatefromjpeg($src);
    }
    $width = imagesx($source_image);
    $height = imagesy($source_image);
    $desired_height = floor($height * ($desired_width / $width));
    $virtual_image = imagecreatetruecolor($desired_width, $desired_height);
    if($ext === 'png'){
        imagecolortransparent($virtual_image, imagecolorallocate($virtual_image, 0, 0, 0));
        imagealphablending($virtual_image, false);
        imagesavealpha($virtual_image, true);
    }

    imagecopyresampled($virtual_image, $source_image, 0, 0, 0, 0, $desired_width, $desired_height, $width, $height);

    if($ext === 'png'){
        imagepng($virtual_image, $dest);
    }else{
        imagejpeg($virtual_image, $dest);
    }
}

$target_dir = __DIR__."/gallery";
$thumbnail_dir = $target_dir."/thumbnails";
$file = $_FILES["upload_file"];
$target_file = $target_dir . '/' . basename($file["name"]);
$imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);

if(in_array($imageFileType, ['jpg', 'jpeg', 'png', 'gif'], false)) {
    move_uploaded_file($file["tmp_name"], $target_file);
    make_thumb($target_file, $thumbnail_dir.'/'.basename($file["name"]), 300);
    echo json_encode([
        $file["name"] => [
            "url" => path2url($target_dir.'/'.$file["name"])
        ]
    ]);
}
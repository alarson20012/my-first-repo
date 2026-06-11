<?php

$uploadDir = "uploads/";
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

if (!isset($_FILES['photo'])) {
    echo "No file uploaded";
    exit;
}

$target = $uploadDir . basename($_FILES['photo']['name']);

if (move_uploaded_file($_FILES['photo']['tmp_name'], $target)) {

    file_put_contents("currentPhoto.json", json_encode([
        "url" => $target
    ]));

    echo "Upload successful";
} else {
    echo "Upload failed";
}
?>


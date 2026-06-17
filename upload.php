<?php
header("Content-Type: application/json");

$uploadsDir = "uploads/";
$filename = basename($_FILES['photo']['name']);
$target = $uploadsDir . $filename;

if (move_uploaded_file($_FILES['photo']['tmp_name'], $target)) {

    // Save the new path
    file_put_contents("currentPhoto.json", json_encode(["url" => $target]));

    echo json_encode(["url" => $target]);
} else {
    echo json_encode(["error" => "Upload failed"]);
}
?>




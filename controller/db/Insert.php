<?php
require __DIR__ . "./../DbHandler.php";

use Db\DbHandler;
if($_SERVER['REQUEST_METHOD'] == 'POST')
{
    $catName = $_POST['catName'];
    $catAge = $_POST['catAge'];
    $catInfo = $_POST['catInfo'];
    $catWin = $_POST['catWin'];
    $catLoss = $_POST['catLoss'];
    $imageDir = "./../../img/";
    if(isset($_FILES['catImage'])) 
    {
        $imageName = $_FILES['catImage']['name'];
        $imageSize = $_FILES['catImage']['size'];
        $temp = $_FILES['catImage']['tmp_name'];
        move_uploaded_file($temp, $imageDir . $imageName);
    }
    $db = new DbHandler();
    $result = $db->select("SELECT * FROM catfighters WHERE Name='{$catName}'");
    $num_rows = $result->num_rows;
    if($num_rows == 0) 
    {
        $db->insert("INSERT INTO catfighters VALUES ('DEFAULT', '{$catName}','{$catAge}','{$catInfo}','{$catWin}','{$catLoss}','{$imageName}')");
    }
    header("Location: ../../index.php");
}
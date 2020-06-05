<?php
require __DIR__ . "./../DbHandler.php";

use Db\DbHandler;

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $catId = $_POST['id'];
    $catname = $_POST['catName'];
    $catAge = $_POST['catAge'];
    $catInfo = $_POST['catInfo'];
    $catWin = $_POST['catWin'];
    $catLoss = $_POST['catLoss'];
    $imageDir = "./../../img/";
    if(isset($_FILES['catImage']) && $_FILES['catImage']['name']!="") 
    {
        $imageName = $_FILES['catImage']['name'];
        $imageSize = $_FILES['catImage']['size'];
        $temp = $_FILES['catImage']['tmp_name'];
        move_uploaded_file($temp, $imageDir . $imageName);
        $db = new DbHandler();
        $db->update("UPDATE catfighters SET Name='{$catname}', Age='{$catAge}', catInfo='{$catInfo}', Win='{$catWin}', Loss='{$catLoss}', Image='{$imageName}' WHERE id='{$catId}'");
    }
    else
    {
        $db = new DbHandler();
        $db->update("UPDATE catfighters SET Name='{$catname}', Age='{$catAge}', catInfo='{$catInfo}', Win='{$catWin}', Loss='{$catLoss}' WHERE id='{$catId}'");
    }
    header("Location: ../../index.php");
}
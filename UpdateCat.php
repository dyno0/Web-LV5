<?php
require "./controller/DbHandler.php";
use Db\DbHandler;
$db = new DbHandler();
$catId = $_GET['id'];
$result = $db->select("SELECT id,Name,Age,catInfo,Win,Loss,Image FROM catfighters WHERE id = '{$catId}'");
$row = $result->fetch_assoc();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CFC</title>
    <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
        crossorigin="anonymous"
    />
</head>
<body class="row">
<h1 class="col-sm-10">CFC 3 - UPDATE FIGHTER</h1>
<a class="col-sm-2" href="./index.php" alt="home">GO BACK-></a>
<form class="container" action="./controller/db/Update.php" method="post" enctype="multipart/form-data">
    <div class="from-group row" style="padding: 10px;">
        <label for="catName" class="col-sm-1 col-form-label">Name: </label>
        <input type="text" name="catName" id="catName" class="col-sm-3" value="<?=$row['Name'];?>" required/>
    </div>
    <div class="from-group row" style="padding: 10px;">
        <label for="catAge" class="col-sm-1 col-form-label">Age: </label>
        <input type="number" name="catAge" id="catAge" class="col-sm-3" value="<?=$row['Age'];?>" required/>
    </div>
    <div class="from-group row" style="padding: 10px;">
        <label for="catInfo" class="col-sm-1 col-from-label">Cat info: </label>
        <input type="text" name="catInfo" id="catInfo" class="col-sm-3" value="<?=$row['catInfo'];?>" required/>
    </div>
    <div class="from-group row" style="padding: 10px;">
        <label for="catWin" class="col-sm-1 col-from-label" >Wins: </label>
        <input type="number" name="catWin" id="catWin" class="col-sm-1" value="<?=$row['Win'];?>" required/>
        <label for="catLoss" class="col-sm-1 col-from-label">Loss: </label>
        <input type="number" name="catLoss" id="catLoss" class="col-sm-1" value="<?=$row['Loss'];?>" required/>
    </div>
    <div class="from-group row" style="padding: 10px;">
        <label for="catImage" class="col-sm-2 col-from-label">Cat image: </label>
        <img src="./img/<?=$row["Image"];?>" alt="Fighter Box" . <?=$row["id"];?> width="150" height="150">
        <input type="file" id="catImage" name="catImage" class="col-sm-5" required/>
    </div>
    <div class="from-group row" style="padding: 10px;">
        <button type="submit" id="btnSubmit" name="btnSubmit" class="col-sm-4">UPDATE</button>
    </div>
    <div class="from-group row" style="padding: 10px;">
        <input type="hidden" name="id" value="<?=$catId?>"/>
        <button type="submit" formmethod="POST" formaction="./controller/db/Delete.php?id=<?=$catId?>" id="btnDel" name="btnDel" class="col-sm-4">DELETE FIGHTER</button>
    </div>
</form>
</body>
</html>
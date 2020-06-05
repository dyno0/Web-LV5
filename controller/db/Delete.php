<?php
require __DIR__ . "./../DbHandler.php";

use Db\DbHandler;

$catId = $_POST['id'];

$db = new DbHandler();
$db->delete("$catId");
header("Location: ../../index.php");
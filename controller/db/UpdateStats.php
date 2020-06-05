<?php
require __DIR__ . "./../DbHandler.php";

use Db\DbHandler;

$fighterName1 = $_POST["fighter1"];
$fighterName2 = $_POST["fighter2"];
$result = $_POST["winner"];
$db = new DbHandler();
if($result == "1")
{
    $db->update("UPDATE catfighters SET Win = Win + 1 WHERE Name='{$fighterName2}'");
    $db->update("UPDATE catfighters SET Loss = Loss + 1 WHERE Name='{$fighterName1}'");
}
else
{
    $db->update("UPDATE catfighters SET Win = Win + 1 WHERE Name='{$fighterName1}'");
    $db->update("UPDATE catfighters SET Loss = Loss + 1 WHERE Name='{$fighterName2}'");
}

$queryResult = [];
$queryResult[0] = $db->select("SELECT * FROM catfighters WHERE Name ='{$fighterName1}'");
$queryResult[1] = $db->select("SELECT * FROM catfighters WHERE Name ='{$fighterName2}'");
return $queryResult;
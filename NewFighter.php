<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Fighter</title>
        <link
                rel="stylesheet"
                href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
                integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
                crossorigin="anonymous"
        />
    </head>
    <body class="row">
        <h1 class="col-sm-10">CFC 3 - ADD NEW FIGHTER</h1>
        <a class="col-sm-2" href="./index.php" alt="home">GO BACK-></a>
        <form class="container" action="./controller/db/Insert.php" method="post" enctype="multipart/form-data">
            <div class="from-group row" style="padding: 10px;">
                <label for="catName" class="col-sm-1 col-form-label">Name:</label>
                <input type="text" name="catName" id="catName" class="col-sm-3" required/>
            </div>
            <div class="from-group row" style="padding: 10px;">
                <label for="catAge" class="col-sm-1 col-form-label">Age:</label>
                <input type="number" name="catAge" id="catAge" class="col-sm-3" required/>
            </div>
            <div class="from-group row" style="padding: 10px;">
                <label for="catInfo" class="col-sm-1 col-from-label">Cat info:</label>
                <input type="text" name="catInfo" id="catInfo" class="col-sm-3" required/>
            </div>
            <div class="from-group row" style="padding: 10px;">
                <label for="catWin" class="col-sm-1 col-from-label">Wins:</label>
                <input type="number" name="catWin" id="catWin" class="col-sm-1" required/>
                <label for="catLoss" class="col-sm-1 col-from-label">Loss:</label>
                <input type="number" name="catLoss" id="catLoss" class="col-sm-1" required/>
            </div>
            <div class="from-group row" style="padding: 10px;">
                <label for="catImage" class="col-sm-2 col-from-label">Cat image:</label>
                <input type="file" id="catImage" name="catImage" class="col-sm-5"/>
            </div>
            <div class="from-group row">
                <button type="submit" id="btnSubmit" name="btnSubmit" class="col-sm-4">SUBMIT</button>
            </div>
        </form>
    </body>
</html>
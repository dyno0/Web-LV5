class Game{
    constructor()
    {
        this.fighters = document.querySelectorAll("div.fighter-box");
        this.btnEdit = document.querySelectorAll("#btnEdit");
        this.btnFight = document.querySelector(".btn-primary");
        this.btnAdd = document.querySelector("#addFighter");
        this.bigImage = document.querySelectorAll(".featured-cat-fighter-image");
        this.btnRand = document.querySelector(".btn-secondary");
        this.catInfo = document.querySelectorAll(".cat-info");
        this.winnerText = document.querySelector("#message");
        this.timeText = document.querySelector("#clock");
    }

    init()
    {
        this.btnFight.disabled=true;
        this.clickImage();
        this.clickRandom();
        this.clickFight();
        this.clickAdd();
        this.clickEdit();
    }
    
    clickEdit()
    {
        Array.from(this.btnEdit).forEach(btn=>{
            btn.addEventListener("click",(e)=>{
                e.preventDefault();
                location.replace("./UpdateCat.php?id="+ (btn.name));
            })
        })
    }

    clickAdd()
    {
        this.btnAdd.addEventListener("click",(e)=>{
            e.preventDefault();
            location.replace("./NewFighter.php");
        })
    }

    reset()
    {
        this.IsReadyToFight();
        this.bigImage[0].setAttribute("style","none");
        this.bigImage[1].setAttribute("style","none");
        Array.from(this.fighters).forEach(item =>{
            if (item.firstChild.nextSibling.src != this.bigImage[0].src && item.firstChild.nextSibling.src != this.bigImage[1].src)
            {
                item.style.display = "block";
            } 
            else if (item.firstChild.nextSibling.src == this.bigImage[0].src)
            {
                item.style.display = "none";
                this.setCatInfo(JSON.parse(item.dataset.info),0);
            } 
            else
            {
                item.style.display ="none";
                this.setCatInfo(JSON.parse(item.dataset.info),1);
            }
        })
    }

    clickImage()
    {
        Array.from(this.fighters).forEach(item=>{
            var fighterSide = item.parentNode.parentNode.parentNode.parentNode.parentNode.id;
            item.addEventListener("click", (e)=>{
                e.preventDefault();
                var fighterInfo = JSON.parse(item.dataset.info);
                if (fighterSide == "firstSide")
                {
                    this.bigImage[0].src = item.childNodes[1].src;
                    this.setCatInfo(fighterInfo,0);
                    this.reset();
                }
                else
                {
                    this.bigImage[1].src = item.childNodes[1].src;
                    this.setCatInfo(fighterInfo,1);
                    this.reset();
                }
            })
        })
    }

    clickRandom()
    {
        this.btnRand.addEventListener("click",(e)=>{
            e.preventDefault();
            do
            {
                var rFighter1 = Math.round(Math.random()*((this.fighters.length)-1));
                var rFighter2 = Math.round(Math.random()*((this.fighters.length)-1));
            }while(rFighter1==rFighter2);

            var arr = Array.from(this.fighters);
            var fighterInfo1 = JSON.parse(arr[rFighter1].dataset.info);
            var fighterInfo2 = JSON.parse(arr[rFighter2].dataset.info);

            this.bigImage[0].src = arr[rFighter1].firstChild.nextSibling.src;
            this.setCatInfo(fighterInfo1,0);
            this.bigImage[1].src = arr[rFighter2].firstChild.nextSibling.src;
            this.setCatInfo(fighterInfo2,1);
            this.reset();
        })
    }

    IsReadyToFight()
    {
        if (this.bigImage[0].src == "https://via.placeholder.com/300" || this.bigImage[1].src == "https://via.placeholder.com/300")
        {
            this.btnFight.disabled = true;
        }
        else
        {
            this.btnFight.disabled = false;
        }
    }

    setCatInfo(fighter,side)
    {
        this.catInfo[side].children[3].textContent = "Wins: " + fighter["record"]["wins"] + " Loss: " + fighter["record"]["loss"];
        this.catInfo[side].children[2].textContent = fighter["catInfo"];
        this.catInfo[side].children[1].textContent = fighter["age"];
        this.catInfo[side].children[0].textContent = fighter["name"];
    }

    clickFight()
    {
        this.btnFight.addEventListener("click",(e)=>{
            Array.from(this.fighters).forEach(item=>{
                item.style.display = "none";
            })
            this.btnRand.disabled = true;
            this.btnAdd.disabled = true;
            this.btnFight.disabled = true;
            this.Fight(this.fighters);
        })
    }

    Fight(fighters)
    {
        var fighter1, fighter2;
        var featuredImage = this.bigImage;
        var featuredInfo = this.catInfo;
        var bFight = this.btnFight;
        var bRand = this.btnRand;
        var bAdd = this.btnAdd;
        var Winner = this.winnerText;
        var Clock = this.timeText;

        Array.from(this.fighters).forEach(item=>{
            if (JSON.parse(item.dataset.info)["name"]==featuredInfo[0].children[0].innerHTML)
            {
                fighter1 = JSON.parse(item.dataset.info);
            }
            if (JSON.parse(item.dataset.info)["name"]==featuredInfo[1].children[0].innerHTML)
            {
                fighter2 = JSON.parse(item.dataset.info);
            }
        })

        setTimeout(()=>{Clock.innerHTML = "3"} ,1000);
        setTimeout(()=>{Clock.innerHTML = "2"} ,2000);
        setTimeout(()=>{Clock.innerHTML = "1"} ,3000);
        setTimeout(()=>{Clock.innerHTML = "0"} ,4000);

        var result = this.FightResults(fighter1,fighter2);
        setTimeout(()=>{

                if (result == 0)
                {
                    featuredImage[0].setAttribute("style","border:5px solid green");
                    featuredImage[1].setAttribute("style","border:5px solid red");
                    Winner.innerHTML = "Winner is " + featuredInfo[0].children[0].innerHTML;
                }
                else if (result == 1)
                {
                    featuredImage[1].setAttribute("style","border:5px solid green");
                    featuredImage[0].setAttribute("style","border:5px solid red");
                    Winner.innerHTML = "Winner is " + featuredInfo[1].children[0].innerHTML;
                }

                Array.from(fighters).forEach(item =>{
                    if (item.firstChild.nextSibling.src == featuredImage[0].src || item.firstChild.nextSibling.src == featuredImage[1].src)
                    {
                        item.style.display = "none";
                    }
                    else
                    {
                        item.style.display = "block";
                    }
                })
                bFight.disabled = false;
                bRand.disabled = false;
                bAdd.disabled = false;
            }
            ,4000);
    }

    FightResults(fighter1,fighter2)
    {
        var fighter1WinRate = (fighter1["record"]["wins"])/(fighter1["record"]["wins"] + fighter1["record"]["loss"]);
        var fighter2WinRate = (fighter2["record"]["wins"])/(fighter2["record"]["wins"] + fighter2["record"]["loss"]);
        var winner = 0;
        var rng = Math.random();
        var diff = fighter1WinRate - fighter2WinRate;
        
        if ((diff > 0) && (diff < 0.1))
        {
            if(rng >= 0 && rng <= 0.59)
            {
                winner = 0;
            }
            else if(rng >= 0.6 && rng <= 1)
            {
                winner = 1;
            }
        }
    
        if ((diff > 0) && (diff > 0.1))
        {
            if(rng >= 0 && rng <= 0.69)
            {
                winner = 0;
            }
            else if(rng >= 0.7 && rng <= 1)
            {
                winner = 1;
            }
        }
    
        if ((diff < 0) && (diff > -0.1))
        {
            if(rng >= 0 && rng <= 0.59)
            {
                winner = 1;
            }
            else if(rng >= 0.6 && rng <= 1)
            {
                winner = 0;
            }
        }
    
        if ((diff < 0) && (diff < -0.1))
        {
            if(rng >= 0 && rng <= 0.69)
            {
                winner = 1;
            }
            else if(rng >= 0.7 && rng <= 1)
            {
                winner = 0;
            }
        }
    
        if (diff == 0){
            if(rng >= 0 && rng <= 0.49)
            {
                winner = 0;
            }
            else if(rng >= 0.5 && rng <= 1)
            {
                winner = 1;
            }
        }

        var data = new FormData();
        data.append('fighter1',fighter1["name"]);
        data.append('fighter2',fighter2["name"]);
        data.append('winner',winner.toString());
        fetch('controller/db/UpdateStats.php',{
            method:'post',
            body:data
        })
            .then(response=>response.text())
            .then(()=>{
                Array.from(this.fighters).forEach(item=>{
                    if (JSON.parse(item.dataset.info)["name"] == fighter1["name"])
                    {
                        var fighterStats1 = JSON.parse(item.dataset.info);
                        if (winner == 0)
                        {
                            fighterStats1["record"]["wins"]+=1;
                            item.setAttribute("data-info",JSON.stringify(fighterStats1));
                        }
                        else
                        {
                            fighterStats1["record"]["loss"]+=1;
                            item.setAttribute("data-info",JSON.stringify(fighterStats1));
                        }
                    }
                    if (JSON.parse(item.dataset.info)["name"] == fighter2["name"])
                    {
                        var fighterStats2 = JSON.parse(item.dataset.info);
                        if (winner == 1)
                        {
                            fighterStats2["record"]["wins"]+=1;
                            item.setAttribute("data-info",JSON.stringify(fighterStats2));
                        }
                        else
                        {
                            fighterStats2["record"]["loss"]+=1;
                            item.setAttribute("data-info",JSON.stringify(fighterStats2));
                        }
                    }
                })
                this.setCatInfo(fighter1,0);
                this.setCatInfo(fighter2,1);
            })
        .catch(error=> alert(error));
        return winner;
    }
}

var CatFighter = new Game();
CatFighter.init();
let userChoce = 0;
let compChoce = 0;

const choces = document.querySelectorAll(".game");
//update taxe according to win 
const updataxe = document.querySelector("#massge-change");
const scoreborduser = document.querySelector("#user-score");
const scorebordcomp = document.querySelector("#compt-score");
const genretcompchoice = () =>{
    let option = ["rock" , "paper" , "scicsser"];
    let Index = Math.floor(Math.random() * 3);
    return option[Index];
}

const DrowGame = ()=>{
    console.log("Game was a drow");
    updataxe.innerText = "Game Draw";
    updataxe.style.backgroundColor ="#6495ed";
}



const Userwin = (userwin)=>{
    if(userwin===true){
        console.log("You are win");
        updataxe.innerText = "You Win!";
        updataxe.style.backgroundColor = "green";
        userChoce++;
        scoreborduser.innerText = userChoce;
    }
    else{
        console.log("computer are win");
        updataxe.innerText = "You Loss.";
        updataxe.style.backgroundColor = "red";
        compChoce++;
        scorebordcomp.innerText = compChoce;
    }
}

const platGame = (userchoice) =>{
    console.log("Choice was clikd =" , userchoice);
//trek computer chocice
    const compgenret = genretcompchoice();
    console.log("computer choice =",compgenret);

    if(userchoice === compgenret){
        //drow game
        DrowGame();
    } else {
        let userwin = true;
        if(userchoice==="rock"){
            //paper , scicsser
            userwin=compgenret === "paper"? false:true;
        }
        else if(userchoice==="paper"){
            //roke , scicsser
            userwin=compgenret === "scicsser"?false:true;
        }
        else{
            userwin = compgenret==="rock"?false:true;
        }
        Userwin(userwin);
        
    }

}

choces.forEach((choice)=>{
    choice.addEventListener("click",()=>{
        console.log("you are clike in box");
        const userchoice = choice.getAttribute("id");
        
        platGame(userchoice);
    })
})


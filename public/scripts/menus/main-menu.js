var buttonSnd = new Audio("assets\\sound\\button.wav");
var gameStartSnd = new Audio("assets\\sound\\gamestart.wav");
var clickSnd = new Audio("assets\\sound\\buttonclick.wav");
let gameInProgress = false;
var errorSnd = new Audio("assets/sound/error.mp3");
var BGMusic = new Audio("assets/sound/menu.mp3");

function openTab(event, id) {
    playSound(clickSnd);
    // Make the play button "active", make any other buttons not "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    event.currentTarget.className += " active";

    // noDisplay();    

    tabcontents = document.getElementsByClassName("tabcontents");
    for (i = 0; i < tabcontents.length; i++){
        tabcontents[i].className = tabcontents[i].className.replace(" active", "");
    }


    element = document.getElementById(id);
    element.className += " active";
    // element.style.display = "block";
    element.style.opacity = "1";
}

function noDisplay(){
    // Display play tabcontent and don't display other tab content
    tabcontent = document.getElementsByClassName("tabcontents");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
}

function hoverTab(event, id) {
    // If the tab is different than the active tab, display the new tab at a decreased opacity, otherwise break
    if (document.getElementById(id).className == "tabcontents active"){
        buttonSnd.play();
        return;
    }
    noDisplay();
    document.getElementById(id).style.display = "block";
    document.getElementById(id).style.opacity = ".3";
    playSound(buttonSnd);
}

function leaveHover(event, id) {
    noDisplay();
    if(document.getElementsByClassName("tablinks active").length == 0) {
        defaultTab = document.getElementById('default-tab');
        defaultTab.style.display = "block";
        return;
    }
    document.getElementById(document.getElementsByClassName("tabcontents active")[0].id).style.opacity = "1";
    document.getElementById(document.getElementsByClassName("tabcontents active")[0].id).style.display = "block";
}

function displayGame() {
    playSound(gameStartSnd);
    // Make page-mainmenu be gone and display canvas
    document.getElementById('page-mainmenu').style.display = "none";
    document.getElementById('canvas-main').style.display = "block";
    canvas = document.getElementById("canvas-main");
    // canvas.width = window.innerWidth-20; //document.width is obsolete
    // canvas.height = window.innerHeight-20; //document.height is obsolete
    gameInProgress = true;
    Game.game.init();
}

function playSound(sound){
    sound.pause();
    sound.currentTime = 0;
    sound.play();
}

function continueGame() {
    if(gameInProgress){
        // playSound(gameStartSnd);
        Game.game.paused = false;
        Game.game.reInit();
        document.getElementById('canvas-main').style.display = 'block';
        document.getElementById('page-mainmenu').style.display = "none";
    } else {
        playSound(errorSnd);
    }
}

document.addEventListener("keydown", keyDownHandler, false);

function keyDownHandler(e) {
    if (e.keyCode == 27) {
        if(!Game.game.paused){
            Game.game.paused = true;
            document.getElementById('canvas-main').style.display = "none";
            document.getElementById('page-mainmenu').style.display = "block";
        } else {
            continueGame();
        }
    }
}

function startBGMusic(){
    BGMusic.volume = .3;
    BGMusic.loop = true;
    playSound(BGMusic);
}

function alterBGMusic() {
    element = document.getElementById("musicToggle").checked;
    if (element) {
        BGMusic.play();
    } else {
        BGMusic.pause();
    }
}

function saveGame(){
    if(!gameInProgress){
        playSound(errorSnd);
        return;
    }

    console.log("Geting save game data");
    
    var person = prompt("Please enter your name:", "");
    if (person == null || person == "") {
        console.log("User cancelled the save action");
        return;
    } 

    var savedGame = Game.game.getSaveData();

    $.ajax({
        url: 'http://localhost:3000/saveGame?person=' + person + '&savedGame=' + JSON.stringify(savedGame),
        type: 'POST',
        error: function(){alert('POST failed')},
        success: function(){
            alert('save successful');
        }
    })
}

function loadGame(){
    // prompt for name
    var person = prompt("Please enter your name: \n");
    if(person == null || person == ""){
        return;
    }

    $.ajax({
		url: 'http://localhost:3000/load?person=' + person,
		cache: false,
		type: 'GET',
		error: function() { alert('GET failed'); },
		success: function(data) {
            // Data will be stringified json object with data if loaded,
            // else it will be undefined
            console.log("game again: " + data);
            Game.game.loadGame(data);
		}
	});
}
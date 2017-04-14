var buttonSnd = new Audio("assets\\sound\\button.wav");
var gameStartSnd = new Audio("assets\\sound\\gamestart.wav");
var clickSnd = new Audio("assets\\sound\\buttonclick.wav");

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
    canvas.width = window.innerWidth-20; //document.width is obsolete
    canvas.height = window.innerHeight-20; //document.height is obsolete
    console.log(canvas)
    Game.game.init();
}

function playSound(sound){
    sound.pause();
    sound.currentTime = 0;
    sound.play();
}
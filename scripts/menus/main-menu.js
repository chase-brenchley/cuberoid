function openTab(event, id) {
    // Make the play button "active", make any other buttons not "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    event.currentTarget.className += " active";
    // Display play tabcontent and don't display other tab content
    tabcontent = document.getElementsByClassName("tabcontents");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    document.getElementById(id).style.display = "block";

}

function displayGame() {
    // Make page-mainmenu be gone and display canvas
    document.getElementById('page-mainmenu').style.display = "none";
    document.getElementById('canvas-main').style.display = "block";
    canvas = document.getElementById("canvas-main");
    canvas.width = window.innerWidth-20; //document.width is obsolete
    canvas.height = window.innerHeight-20; //document.height is obsolete
}
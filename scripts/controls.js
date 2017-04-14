Game.controls = function(){
    controls = {};

    function changeControls(control){
        // prompt user to choose a new button or press esc to cancel
        button = document.getElementById(control);

        current = button.innerText;
        button.innerText = "Press any key..."
        var keynum;

        document.onkeydown = function(evt) {
            console.log("Getting a new control");
            evt = evt || window.event;
            var charCode = evt.keyCode || evt.which;
            if (27 == charCode) {
                button.innerText = current;
                return;
            }
            var charStr = String.fromCharCode(charCode);
            button.innerText = evt.key;
            // alert(charStr);
            controls[control] = evt.key;
            localStorage.setItem('controls', JSON.stringify(controls)); 
            document["onkeydown"]=null;
        };
        document.getElementById('page-mainmenu').focus(); // Removes focus from button so space can be set as a control
        button.blur(); // Look above
    }; 

    function reset(){
        // Reset controls to default
        document.getElementById('jump').innerHTML = " ";
        document.getElementById('shoot').innerHTML = "e";
        document.getElementById('left').innerHTML = "a";
        document.getElementById('right').innerHTML = "d";
        document.getElementById('up').innerHTML = "w";
        document.getElementById('down').innerHTML = "s";

        // update controls object
        controlButtons = document.getElementsByClassName("control-button");
        for (var i = 0; i < controlButtons.length; i++) {
            var element = controlButtons[i];
			controls[element.id] = element.innerText;            
        }
        localStorage.setItem('controls', JSON.stringify(controls));
    }

    function init(){
        controlButtons = document.getElementsByClassName("control-button");
        for (var i = 0; i < controlButtons.length; i++) {
            var element = controlButtons[i];
			controls[element.id] = element.innerText;            
        }
        localStorage.setItem('controls', JSON.stringify(controls));        
    }

    function restore(){
        controlButtons = document.getElementsByClassName("control-button");
        for (var i = 0; i < controlButtons.length; i++) {
            var element = controlButtons[i];
			controls[element.id] = element.innerText;            
        }
        if(localStorage.getItem('controls') != null){
            var previousControls = JSON.parse(localStorage.getItem('controls'))
            document.getElementById('jump').innerHTML = previousControls['jump'];
            document.getElementById('shoot').innerHTML = previousControls['shoot'];
            document.getElementById('left').innerHTML = previousControls['left'];
            document.getElementById('right').innerHTML = previousControls['right'];
            document.getElementById('up').innerHTML = previousControls['up'];
            document.getElementById('down').innerHTML = previousControls['down'];
        }
    }

    return {
        init:init,
        controls:controls,
        changeControls:changeControls,
        reset: reset,
        restore:restore,
    }
}();
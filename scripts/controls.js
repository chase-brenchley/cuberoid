Game.controls = function(){
    controls = {};

    function changeControls(control){
        // prompt user to choose a new button or press esc to cancel
        button = document.getElementById(control);
        document.getElementById('page-mainmenu').focus(); // Removes focus from button so space can be set as a control
        button.blur(); // Look above
        current = button.innerText;
        button.innerText = "Press any key..."
        var keynum;

        document.onkeydown = function(evt) {
            evt = evt || window.event;
            var charCode = evt.keyCode || evt.which;
            if (27 == charCode) {
                button.innerText = current;
                return;
            }
            var charStr = String.fromCharCode(charCode);
            button.innerText = charStr;
            // alert(charStr);
            controls[control] = button.innerText;
            localStorage.setItem('controls', JSON.stringify(controls)); 
        };
    }   

    function reset(){
        // Reset controls to default
        document.getElementById('jump').innerHTML = "Space";
        document.getElementById('shoot').innerHTML = "E";
        document.getElementById('left').innerHTML = "A";
        document.getElementById('right').innerHTML = "D";
        document.getElementById('up').innerHTML = "W";
        document.getElementById('down').innerHTML = "S";

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
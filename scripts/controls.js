Game.controls = function(){
    controls = {};

    function init(){
        controlButtons = document.getElementsByClassName("control-button");
        for (var i = 0; i < controlButtons.length; i++) {
            var element = controlButtons[i];
			controls[element.id] = element.innerText;            
        }
    }

    return {
        init:init,
        controls:controls,
    }
}();
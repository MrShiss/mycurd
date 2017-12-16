window.onload = function () {

    var inputs = document.querySelectorAll('.reg-input');
    var spans = document.querySelectorAll('.reg-span');
    inputs.forEach(function (value,index) {
        inputs[index].onfocus = function (ev) {
            spans[index].style.display = 'block';
        };
        inputs[index].onblur = function (ev) {
            spans[index].style.display = 'none';
        }
    });
    var Upinputs = document.querySelectorAll('.update-input');
    var Upspans = document.querySelectorAll('.update-span');
    console.log(Upinputs)
    Upinputs.forEach(function (value,index) {
        Upinputs[index].onfocus = function (ev) {
            Upspans[index].style.display = 'block';
        };
        Upinputs[index].onblur = function (ev) {
            Upspans[index].style.display = 'none';
        }
    });
};
var nf1 = document.getElementById('num_field_1');
var nf2 = document.getElementById('num_field_2');

var result = document.getElementById("result_field");

var form = document.getElementById("percent_form");

function calculate() {
    if (!nf1.value || !nf2.value) {
        return;
    }
    var x = parseFloat(nf1.value);
    var y = parseFloat(nf2.value);
    result.innerText = "Result: " + (x/y*100) + "%";
}

// form.addEventListener("submit", calc_fn);

// result.innerText = "Result: " + (x/y*100) + "%";
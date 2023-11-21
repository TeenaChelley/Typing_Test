let time = document.getElementById("timer");
let submit = document.getElementById("submitBtn");
let reset = document.getElementById("resetBtn");
let result = document.getElementById("result");
let quoteDisplay = document.getElementById("quoteDisplay");
let quoteInput = document.getElementById("quoteInput");
let spinner = document.getElementById("spinner");

let count = 0;
let intervalId;
recall();

function timer() {
    intervalId = setInterval(function() {
        if (count <= 0) {
            spinner.classList.remove("d-none");
        } else if (count > 0) {
            spinner.classList.add("d-none");
        }
        count = count + 1;
        time.textContent = count + " seconds";
    }, 1000);
}
timer();

function submitted() {
    let countValue = count;
    localStorage.setItem("data", JSON.stringify(quoteInput.value));
    if (quoteDisplay.textContent === quoteInput.value) {
        result.textContent = "You typed in " + countValue + " seconds";
        clearInterval(intervalId);
    } else {
        result.textContent = "You typed incorrect sentence";
    }
}
submit.addEventListener("click", submitted);

function resetbt() {
    result.textContent = "";
    time.textContent = "";
    count = 0;

    clearInterval(intervalId);
    timer();
    recall();
    quoteInput.value = "";
    localStorage.removeItem("data");

}

function recall() {
    let options = {
        method: "GET"
    };
    let url = "https://apis.ccbp.in/random-quote";
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(dataJson) {
            let {
                content
            } = dataJson;
            quoteDisplay.textContent = content;
        });
}
reset.addEventListener("click", resetbt);
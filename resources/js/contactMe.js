const email = document.getElementById("email");
const username = document.getElementById("username");
const fieldset = document.querySelector("fieldset");
const concernBox = document.getElementById("concernBox");
const concern = document.getElementById("concern");

email.addEventListener('change', updateUsername);
fieldset.addEventListener('change', updateConcern);

function updateUsername() {
    if ("" === username.value) {
        let emailtxt = email.value
        username.value = emailtxt.substring(0, emailtxt.indexOf('@'));
    }
}

function updateConcern() {
    if(concern.checked) {
        concernBox.removeAttribute("hidden");
    } else {
        concernBox.setAttribute("hidden", "true");
    }
}
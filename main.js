let submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", checkUserSettings);

let passwordLength;
let createdPassword;
let msg1 = "Das Passwort muss zwischen 5 und 50 Zeichen lang sein.";
let msg2 = "Ganze Zahl eingeben!";
let msg3 = "Ein unbekannter Fehler ist aufgetreten. Bitte erneut versuchen.";
let msg4 = "Bitte wählen Sie, wie Ihr Passwort gestaltet werden soll.";

const random_lowerCase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const random_upperCase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const random_numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const random_specialCharacters = ["$", "%", "&", "/", "§", "#", "*", "~"];
const random_punctuationMark = [".", ",", ";", "!", "?", "(", ")", ":", "-"];
const random_all = [random_lowerCase, random_upperCase, random_numbers, random_specialCharacters, random_punctuationMark];
const userArray = [];

function checkUserSettings() {
    passwordLength = document.getElementById("numberOfPassword");
    if ((Number(passwordLength.value) > 4 && Number(passwordLength.value) <= 50) && !(passwordLength.value.includes("." || ","))) {
        notification("", "black");
        screenCheckbox(passwordLength);
    } 
    else if (Number(passwordLength.value) < 5 || Number(passwordLength.value) > 50) notification(msg1, "red");
    else if (passwordLength.value.includes("." || ",") || isNaN(Number(passwordLength.value))) notification(msg2, "red");
    else notification(msg3, "red");
}

function notification(msg, color) {
    let notificationParagraph = document.getElementById("alternativeText");
    notificationParagraph.innerHTML = msg;
    notificationParagraph.style.color = color;
}

function screenCheckbox(pwLength) {
    let lowerCase = document.getElementById("lowerCase");
    let upperCase = document.getElementById("upperCase");
    let numbers = document.getElementById("numbers");
    let specialCharacters = document.getElementById("specialCharacters");
    let punctuationMarks = document.getElementById("punctuationMarks");
    const all = [lowerCase, upperCase, numbers, specialCharacters, punctuationMarks];
    screenSingular(all);
    if (!(lowerCase.checked || upperCase.checked || numbers.checked || specialCharacters.checked || punctuationMarks.checked)) notification(msg4, "red");
    else createPassword(pwLength);
}

function screenSingular(array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].checked) {
            createUserArray(random_all[i]);
        }
    }
}

function createUserArray (random_x) {
    let i = 0;
    for (i in random_x) {
        userArray.push(random_x[i]);
    }   
    return userArray;
}

function createPassword (pwLength) {
    password(pwLength);
    while (createdPassword.includes("undefined") || createdPassword.includes("NaN")) {
        password(pwLength);
    }
    let showCreatedPassword = document.getElementById("createdPassword");
    showCreatedPassword.innerHTML = createdPassword;
    showCreatedPassword.style.color = "indigo";
    checkPassword(createdPassword);
    userArray.splice(0, userArray.length);
    return userArray;
}

function password(pwLength) {
    createdPassword = "";
    for (let i = 0; i < pwLength.value; i++) {
        let random = Math.floor(Math.random() * (userArray.length + 1) );
        createdPassword += userArray[random];
    }
    return createdPassword;
}

function checkPassword (createdPassword) {
    createdPassword = createdPassword.length;
    switch(true) {
        case createdPassword < 7:
            notification("Schlechtes Passwort", "darkred");
            break;
        case createdPassword < 8:
            notification("Schwaches Passwort", "red");
            break;
        case createdPassword < 12:
            notification("Mittleres Passwort", "yellow");
            break;
        case createdPassword < 14:
            notification("Gutes Passwort", "green");
            break;
        case createdPassword >= 14:
            notification("Sehr gutes Passwort", "darkgreen");
    }
    createdPassword = "";
    return createdPassword;
}

function copyPassword () {
    let password = document.getElementById("createdPassword");
    let x = password.innerHTML;
    if (!(password.innerHTML.includes("Passwort"))) {
        navigator.clipboard.writeText(password.innerHTML);
        password.innerHTML = "Passwort kopiert";
        password.style.color = "green";
        setTimeout(function () {
            password.style.color = "grey";
            password.innerHTML = x;
        },2000 );
    }
}
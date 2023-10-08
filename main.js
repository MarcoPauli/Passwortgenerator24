const random_lowerCase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const random_upperCase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const random_numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const random_specialCharacters = ["$", "%", "&", "/", "§", "#", "*", "~"];
const random_punctuationMark = [".", ",", ";", "!", "?", "(", ")", ":", "-"];
let createdPassword;
const userArray = [];

function check () {
    let alternativeParagraph = document.getElementById("alternativeText");
    let passwordLength = document.getElementById("numberOfPassword");
    document.getElementById("createdPassword").style.color = "grey";
    if ((4 <= passwordLength.value && passwordLength.value <= 30) && !(passwordLength.value.includes("." || ","))) {
        alternativeParagraph.innerHTML = "";
        checkElements();
    } else if (passwordLength.value < 4 || passwordLength.value > 30) {
        alternativeParagraph.innerHTML = "Das Passwort muss zwischen 4 und 30 Zeichen lang sein.";
        alternativeParagraph.style.color = "red";
    } else if (passwordLength.value.includes("." || ",") || isNaN(passwordLength.value)) {
        alternativeParagraph.innerHTML = "Ganze Zahl eingeben!";
        alternativeParagraph.style.color = "red";
    } else {
        alternativeParagraph.innerHTML = "Ein unbekannter Fehler ist aufgetreten. Bitte erneut versuchen.";
        alternativeParagraph.style.color = "red";
    }
}

function checkElements () {
    let lowerCase = document.getElementById("lowerCase");
    let upperCase = document.getElementById("upperCase");
    let numbers = document.getElementById("numbers");
    let specialCharacters = document.getElementById("specialCharacters");
    let punctuationMarks = document.getElementById("punctuationMarks");
    screenCheckbox(lowerCase, upperCase, numbers, specialCharacters, punctuationMarks, userArray);
    
}

function screenCheckbox (lowerCase, upperCase, numbers, specialCharacters, punctuationMarks, userArray) {
    if (lowerCase.checked) {
        createUserArray(random_lowerCase, userArray);
    } 
    if (upperCase.checked) {
        createUserArray(random_upperCase, userArray);
    }
    if (numbers.checked) {
        createUserArray(random_numbers, userArray);
    }
    if (specialCharacters.checked) {
        createUserArray(random_specialCharacters, userArray);
    } 
    if (punctuationMarks.checked) {
        createUserArray(random_punctuationMark, userArray);
    }
    if (!(lowerCase.checked || upperCase.checked || numbers.checked || specialCharacters.checked || punctuationMarks.checked)) {
        let x =  document.getElementById("alternativeText");
        x.innerHTML = "Bitte wählen Sie, wie Ihr Passwort gestaltet werden soll.";
        x.style.color = "red";
    } else {
        let numberOfPassword = document.getElementById("numberOfPassword");
        returnUserarray(userArray);
        createPassword(userArray, numberOfPassword);
    }
}

function createUserArray (random_x, userArray) {
    let i = 0;
        for (i in random_x) {
            userArray.push(random_x[i]);
        }   
    return userArray;
}

function returnUserarray(array) {
    return array;
}

function createPassword (userArray, numberOfPassword) {
    let alternativeParagraph = document.getElementById("alternativeText");
    password(userArray, numberOfPassword);
    alert(createdPassword)
    while (createdPassword.includes("undefined") || createdPassword.includes("NaN")) {
        createdPassword = "";
        password(createdPassword, userArray, numberOfPassword);
    }
    let x = document.getElementById("createdPassword");
    x.innerHTML = createdPassword;
    x.style.color = "indigo";
    checkPassword(alternativeParagraph, createdPassword);
}

function password (userArray, numberOfPassword) {
    createdPassword = "";
    for (let i = 0; i < numberOfPassword.value; i++) {
        let random = Math.floor(Math.random() * (userArray.length + 1) );
        createdPassword += userArray[random];
    }
    alert(createdPassword)
    return createdPassword;
}

function checkPassword (alternativeParagraph, createdPassword) {
    if (createdPassword.length < 5) {
        alternativeParagraph.style.color = "darkred";
        alternativeParagraph.innerHTML = "Schlechtes Passwort";
    } else if (createdPassword.length < 8) {
        alternativeParagraph.style.color = "red";
        alternativeParagraph.innerHTML = "Schwaches Passwort";
    } else if (createdPassword.length < 10) {
        alternativeParagraph.style.color = "yellow";
        alternativeParagraph.innerHTML = "Mittleres Passwort";
    } else if (createdPassword.length < 12) {
        alternativeParagraph.style.color = "green";
        alternativeParagraph.innerHTML = "Gutes Passwort";
    } else if (createdPassword.length >= 12) {
        alternativeParagraph.style.color = "darkgreen";
        alternativeParagraph.innerHTML = "Sehr gutes Passwort";
    }
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
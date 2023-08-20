let fs = require("fs");

let currentPath = "C:/Users/monik/Documents/Homepage 2/nodejs-test2/";

fs.mkdir(currentPath + ".txt", dirCreated);

function dirCreated() {
    console.log("Fertig erstellt!");
    fs.rename(currentPath + ".txt/Rechnung1.txt", currentPath + ".txt/Rechnung1.txt", copyAccess);
}

function copyAccess() {
    console.log("Datei erfolgreich verschoben!");
}
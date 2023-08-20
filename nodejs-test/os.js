let os = require("os");
let bytes = os.totalmem();
console.log("Free Memory(GB): " + bytes / 100000000);
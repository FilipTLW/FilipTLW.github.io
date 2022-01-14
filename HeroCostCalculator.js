let dataCoins = [];
let dataSoulstones = [];
let dataCoinsTotal = [];
let dataSoulstonesTotal = [];

let coinsInOutput = 0;
let soulstonesInOutput = 0;

const incCoins = [
    3,4,3,4,4,3,4,3,4,4,
    3,3,3,3,4,3,3,3,3,4,
    2,3,3,3,3,2,3,3,3,3,
    3,3,4,3,4,3,3,4,3,4,
    3,0,0,0,0,0,0,0,0,0
];
const incSoulstones = [
    2,3,2,3,2,3,2,3,2,3,
    2,2,2,2,2,2,2,2,2,2
];

function calcData() {
    dataSoulstones = [];
    dataSoulstonesTotal = [];
    let soulstoneDelta = 10;
    let soulstoneCost = 200;
    for (i=0; i<10; i++) {
        dataSoulstones.push(soulstoneCost);
        if (dataSoulstonesTotal.length != 0)
            dataSoulstonesTotal.push(dataSoulstonesTotal[dataSoulstonesTotal.length-1]+soulstoneCost);
        else
            dataSoulstonesTotal.push(soulstoneCost);
        soulstoneCost += soulstoneDelta;
    }
    dataSoulstones.push(soulstoneCost);
    dataSoulstonesTotal.push(dataSoulstonesTotal[dataSoulstonesTotal.length-1]+soulstoneCost)
    for (i=0; i<11989; i++) {
        if (i != 0 && i%10 == 0) {
            soulstoneDelta += i%20 == 0 ? 2 : 3;
        }
        soulstoneCost += soulstoneDelta + incSoulstones[i%incSoulstones.length];
        dataSoulstones.push(soulstoneCost);
        dataSoulstonesTotal.push(dataSoulstonesTotal[dataSoulstonesTotal.length-1]+soulstoneCost)
    }
    dataCoins = [];
    dataCoinsTotal = [];
    let coinsDelta = 5;
    let coinsCost = 100;
    for (i=0; i<10; i++) {
        dataCoins.push(coinsCost);
        if (dataCoinsTotal.length != 0)
            dataCoinsTotal.push(dataCoinsTotal[dataCoinsTotal.length-1]+coinsCost);
        else
            dataCoinsTotal.push(coinsCost);
        coinsCost += coinsDelta;
    }
    dataCoins.push(coinsCost);
    dataCoinsTotal.push(dataCoinsTotal[dataCoinsTotal.length-1]+coinsCost);
    for (i=0; i<11989; i++) {
        if (i != 0 && i%10 == 0) {
            if ((i%50) >= 40) {
                coinsDelta += 7;
            } else if ((i%50) >= 30) {
                coinsDelta += 3;
            } else if ((i%50) >= 20) {
                coinsDelta += 4;
            } else if ((i%50) >= 10) {
                coinsDelta += 4;
            }
        }
        coinsCost += coinsDelta + incCoins[i%incCoins.length];
        dataCoins.push(coinsCost);
        dataCoinsTotal.push(dataCoinsTotal[dataCoinsTotal.length-1]+coinsCost);
    }
}
function calculateCost(form) {
    let startLevel = parseInt(form.startLevel.value);
    let endLevel = parseInt(form.endLevel.value);
    if (startLevel <= endLevel) {
        if (startLevel < 1) {
            document.getElementById("errorSpace").innerHTML = "Error: start level is below 1";
            return;
        }
        if (endLevel < 2) {
            document.getElementById("errorSpace").innerHTML = "Error: end level is below 2";
            return;
        }
        let cs = 0;
        let sss = 0;
        if (startLevel != 1) {
            cs = dataCoinsTotal[endLevel-2] - dataCoinsTotal[startLevel-2];
            sss = dataSoulstonesTotal[endLevel-2] - dataSoulstonesTotal[startLevel-2];
        } else {
            cs = dataCoinsTotal[endLevel-2];
            sss = dataSoulstonesTotal[endLevel-2];
        }
        coinsInOutput = cs;
        soulstonesInOutput = sss;
        document.getElementById("coinsCostSpan").innerHTML = cs;
        document.getElementById("soulstonesCostSpan").innerHTML = sss;
        formatNumbers(form);
        document.getElementById("errorSpace").innerHTML = "";
    } else {
        document.getElementById("errorSpace").innerHTML = "Error: start level is higher than end level";
    }
}

function formatNumbers(form) {
    let formatted = form.formatted.checked;
    let coins = coinsInOutput;
    let soulstones = soulstonesInOutput;
    if (formatted) {
        if (coins >= 10000000000) {
            document.getElementById("coinsCostSpan").innerHTML = Math.round(coins/1000000000).toString() + "B";
        } else if (coins >= 10000000) {
            document.getElementById("coinsCostSpan").innerHTML = Math.round(coins/1000000).toString() + "M";
        } else if (coins >= 100000) {
            document.getElementById("coinsCostSpan").innerHTML = Math.round(coins/1000).toString() + "K";
        } else {
            document.getElementById("coinsCostSpan").innerHTML = coins;
        }
        if (soulstones >= 10000000000) {
            document.getElementById("soulstonesCostSpan").innerHTML = Math.round(soulstones/1000000000).toString() + "B";
        } else if (soulstones >= 10000000) {
            document.getElementById("soulstonesCostSpan").innerHTML = Math.round(soulstones/1000000).toString() + "M";
        } else if (soulstones >= 100000) {
            document.getElementById("soulstonesCostSpan").innerHTML = Math.round(soulstones/1000).toString() + "K";
        } else {
            document.getElementById("soulstonesCostSpan").innerHTML = soulstones;
        }
    } else {
        document.getElementById("coinsCostSpan").innerHTML = coins;
        document.getElementById("soulstonesCostSpan").innerHTML = soulstones;
    }
}

(() => {
    calcData();
})();
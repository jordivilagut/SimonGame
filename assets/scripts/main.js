var checker;
var gameArray;
var serieLength;
var strictMode = false;

$("#startSimon").click(startSimon);
$(".quarter").click(processPlayerAction);
$("#strictModeBtn").click(toggleStrictMode);

function toggleStrictMode() {
    if(strictMode === false){strictMode = true}
    else{strictMode = false};
}

function startSimon() {
    setupGame();
    playSerie(serieLength);
    disableButtons(false);
}

function setupGame() {
    generateNewGameArray();
    $("#stepCounter").html("--");
    serieLength = 1;
    disableButtons(true);
}

function generateNewGameArray() {
    gameArray = [];
    for (var i = 0; i < 20; i++) {
        var random = Math.floor(Math.random() * 4);
        gameArray.push(random);
    }
}

function playSerie(length) {
    for (var i = 0; i < length; i++) {
        lightUpAndBeep(gameArray[i], i);
    }
    checker = 0;
}

function lightUpAndBeep(quarter, i) {
    var light = getLightColor(quarter);
    setTimeout(function() {
        $("#" + light + "Btn").addClass('flash');
        playSound("light" + quarter);
        setTimeout(hideLight, 500);
    }, 800 * (i + 1));

}

function playSound(sound) {
    var sounds = {
        light0: 'https://s3.amazonaws.com/freecodecamp/simonSound1',
        light1: 'https://s3.amazonaws.com/freecodecamp/simonSound2',
        light2: 'https://s3.amazonaws.com/freecodecamp/simonSound3',
        light3: 'https://s3.amazonaws.com/freecodecamp/simonSound4',
        fail: 'http://www.soundjay.com/misc/sounds/fail-trombone-03',
        applause: 'http://www.soundjay.com/human/sounds/applause-01'
    }
    $.playSound(sounds[sound]);
}

function getLightColor(quarter) {
    var simonLights = ["blue", "orange", "green", "red"];
    return simonLights[quarter];
}

function hideLight() {
    $('.quarter').removeClass('flash');
}

function disableButtons(bool) {
    $('.quarter').prop('disabled', bool);
}

function processPlayerAction() {
    var pushedBtn = $(this).val();
    lightUpAndBeep(pushedBtn);

    if (pushedBtn == gameArray[checker]) {
        checker++;
        if (checker == 20) {winnerCheer(); setupGame();}
        else if (checker == serieLength) {addStepToSerie();}
    } else {
        playSound("fail");
        if (strictMode === true) {setupGame();}
        else {setTimeout(function() {playSerie(serieLength)}, 2000);}
    }
}

function addStepToSerie() {
    serieLength++;
            $("#stepCounter").html(serieLength-1);
            setTimeout(function() {
                playSerie(serieLength)
            }, 500);
}

function winnerCheer() {
    $('.quarter').addClass('flash');
    playSound("applause");
    setTimeout(hideLight, 5000);
}
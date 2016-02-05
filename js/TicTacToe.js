var round = 0   // Count number of rounds played
var turn = 0;   // Count number of turns
var countX = 0; // Count X (Player 1) wins
var countO = 0; // Count Y (Player 2) wins
var countT = 0; // Count Ties
var popUp = 1;  // JavaScript Alert on/off (default on)
var sign1 = 4, s1pre = 4, p1c = 4; // Default Player 1 Animal Choice
var sign2 = 5, s2pre = 5, p2c = 5; // Default Player 2 Animal Choice
var statusAppendError = true;

// All Animal Sign Names
var SignNames = new Array(
    "Dog",
    "Dragon",
    "Goat",
    "Horse",
    "Monkey",
    "Ox",
    "Pig",
    "Rabbit",
    "Rat",
    "Rooster",
    "Snake",
    "Tiger");

// used in onLoad of page
function startUp() {
    window.statusBar = document.getElementById("status");
    document.getElementById("load").innerHTML = "This page was loaded on: " + document.lastModified;
    document.getElementById("content").removeAttribute("hidden");
    preGame();
}

// Before the game, have user set options
function preGame() {
    // Show Game Options first.
    statusBar.innerHTML = "<span id=\"welcome\">Welcome!</span><br />Please select your options below and click on the button to continue!";
    document.getElementById("preGame").removeAttribute("hidden");
    document.getElementById("preGame").style.display = "inline-block";
    // Color in Default animal choices
    document.getElementById("s4").className = "sign1";
    document.getElementById("s4a").className = "sign1";
    document.getElementById("s5").className = "sign2";
    document.getElementById("s5a").className = "sign2";
    document.getElementById("formSubmit").innerHTML = "Ready?";
}

// Fancy stuff at work:  instant highlight of animal selected during options
function signColor(ev) {
    switch(ev.target.id) {
        case 'p1Sign':
            document.getElementById("s" + s1pre).className = "notSelected";
            document.getElementById("s" + s1pre + "a").className = "notSelected";
            var i = Number(ev.target.value);
            if (i >= 1 && i <= 12 && !isNaN(i)) {
                p1c = i;
                s1pre = i;
            } else {
                p1c = null;
            }
            break;
        case 'p2Sign':
            document.getElementById("s" + s2pre).className = "notSelected";
            document.getElementById("s" + s2pre + "a").className = "notSelected";
            var i = Number(ev.target.value);
            if (i >= 1 && i <= 12 && !isNaN(i)) {
                p2c = i;
                s2pre = i;
            } else {
                p2c = null;
            }
            break;
    }
    // Animal Sign Highlighting Scenarios
    if (p1c == null && p2c == null) {
        return;
    } else if (p1c == p2c && !(p1c == null || p2c == null)) {
        document.getElementById("s" + p1c).className = "sameSign";
        document.getElementById("s" + p1c + "a").className = "sameSign";
        document.getElementById("s" + p2c).className = "sameSign";
        document.getElementById("s" + p2c + "a").className = "sameSign";
    } else if (p1c == null && p2c != null) {
        document.getElementById("s" + p2c).className = "sign2";
        document.getElementById("s" + p2c + "a").className = "sign2";
    } else if (p2c == null && p1c != null) {
        document.getElementById("s" + p1c).className = "sign1";
        document.getElementById("s" + p1c + "a").className = "sign1";
    } else {
        document.getElementById("s" + p1c).className = "sign1";
        document.getElementById("s" + p1c + "a").className = "sign1";
        document.getElementById("s" + p2c).className = "sign2";
        document.getElementById("s" + p2c + "a").className = "sign2";
    }
}

// Fancy stuff at work:  button change on hover
function buttonHoverIn() {
    document.getElementById("formSubmit").innerHTML = "Verify & Let's Play!";
    document.getElementById("formSubmit").style.backgroundColor = "orange";
}

// Fancy stuff at work:  button change on hover
function buttonHoverOut() {
    document.getElementById("formSubmit").innerHTML = "Ready?";
    document.getElementById("formSubmit").style.backgroundColor = "";
}

// Validate options entered.
function validateOpt() {
    // Clear and hide previous error entries
    document.getElementById("formError").setAttribute("hidden", "hidden");
    document.getElementById("errorList").innerHTML = "";
    // Set checks to no errors first.
    var p1n = false, p1s = false, p2n = false, p2s = false, sameName = false, sameSign = false;
    // Extract Form Values
    window.p1Name = document.getElementById("p1Name").value.trim();
    window.p1Sign = Number(document.getElementById("p1Sign").value);
    window.p2Name = document.getElementById("p2Name").value.trim();
    window.p2Sign = Number(document.getElementById("p2Sign").value);
    // Error Checking time
    // Error Check 1:  Empty Player 1 Name
    if (p1Name == null || p1Name == "") {
        document.getElementById("errorList").innerHTML += "<li>Player 1 Name is not filled in.  Please enter a name for Player 1.</li>";
        p1n = true;
    } else {
        p1n = false;
    }
    fieldError("p1Name", p1n);
    // Error Check 2:  Invalid Player 1 Sign
    if (p1Sign < 1 || p1Sign > 12 || p1Sign == null || p1Sign == "" || isNaN(p1Sign)) {
        document.getElementById("errorList").innerHTML += "<li>Player 1 Zodiac Animal # is invalid or empty.  Valid range is 1-12.</li>";
        p1s = true;
    } else {
        p1s = false;
    }
    fieldError("p1Sign", p1s);
    // Error Check 3:  Empty Player 2 Name
    if (p2Name == null || p2Name == "") {
        document.getElementById("errorList").innerHTML += "<li>Player 2 Name is not filled in.  Please enter a name for Player 2.</li>";
        p2n = true;
    } else {
        p2n = false;
    }
    fieldError("p2Name", p2n);
    // Error Check 4:  Invalid Player 2 Sign
    if (p2Sign < 1 || p2Sign > 12 || p2Sign == null || p2Sign == "" || isNaN(p2Sign)) {
        document.getElementById("errorList").innerHTML += "<li>Player 2 Zodiac Animal # is invalid or empty.  Valid range is 1-12.</li>";
        p2s = true;
    } else {
        p2s = false;
    }
    fieldError("p2Sign", p2s);
    // Error Check 5:  Same Player Names
    if (p1Name.toLowerCase() == p2Name.toLowerCase() && !((p1Name == null || p1Name == "") && (p2Name == null || p2Name == ""))) {
        document.getElementById("errorList").innerHTML += "<li>The same name was typed in for both players (case insensitive).<br />Player names should be different from each other.</li>";
        p1n = true;
        p2n = true;
        sameName = true;
    }
    fieldError("p1Name", p1n);
    fieldError("p2Name", p2n);
    // Error Check 6:  Same Player Sign Choice
    if (p1Sign == p2Sign && !((p1Sign == null || p1Sign == "" || isNaN(p1Sign)) && (p2Sign == null || p2Sign == "" || isNaN(p2Sign)))) {
        document.getElementById("errorList").innerHTML += "<li>The same Zodiac Animal has been chosen for both players.<br />Players must select different animals from each other.</li>";
        p1s = true;
        p2s = true;
        sameSign = true;
    }
    fieldError("p1Sign", p1s);
    fieldError("p2Sign", p2s);
    // If there are any errors...
    if (p1n || p1s || p2n || p2s || sameName || sameSign) {
        document.getElementById("formError").removeAttribute("hidden");
        if (statusAppendError) {
            statusBar.innerHTML += "<br /><span id=\"statusFormError\">One or more fields below needs attention!  Please refer to the error list for details.</span>";
            statusAppendError = false;
        }
        alert("One or more fields need to be fixed before the game can be started!  Refer to the error list for details.");
        return false;
    }
    // No Errors past this point.
    // Subtract one for array list
    p1Sign--;
    p2Sign--;
    // call set options
    setOpt();
}

// Error Check Field Colors
function fieldError(field, check) {
    switch (check) {
        case true:
            document.getElementById(field + "Label").style.color = "red";
            document.getElementById(field).style.borderColor = "red";
            if (field == "p1Sign" || field == "p2Sign") {
                document.getElementById(field + "Label1").style.color = "red";
                document.getElementById(field + "Label1").style.fontWeight = "bold";
            }
            break;
        case false:
            document.getElementById(field + "Label").style.color = "";
            document.getElementById(field).style.borderColor = "";
            if (field == "p2Sign" || field == "p2Sign") {
                document.getElementById(field + "Label1").style.color = "";
                document.getElementById(field + "Label1").style.fontWeight = "";
            }
            break;
    }
}

// Set Game Options
function setOpt() {
    // Set Name and Animal Preference
    document.getElementById("name1").innerHTML = p1Name;
    document.getElementById("sign1").innerHTML = SignNames[p1Sign];
    document.getElementById("name2").innerHTML = p2Name;
    document.getElementById("sign2").innerHTML = SignNames[p2Sign];
    
    // Set Images
    document.getElementById("img1").setAttribute("src", "images/" + SignNames[p1Sign] + ".png");
    document.getElementById("img2").setAttribute("src", "images/" + SignNames[p2Sign] + ".png");
    document.getElementById("img1").setAttribute("alt", "Player 1 (" + p1Name + "): " + SignNames[p1Sign]);
    document.getElementById("img2").setAttribute("alt", "Player 2 (" + p2Name + "): " + SignNames[p2Sign]);
    // Hide Game Options and show Game Board.
    hideOpt();
    // Show Option to toggle JS alert windows.
    showToggleAlert();
    // Scroll page back to top.
    window.scrollTo(0,0);
    // Start Game!
    newRound();
}

// Show option to toggle JS alert windows.
function showToggleAlert() {
    document.getElementById("pop").removeAttribute("hidden");
}

// Hide Game Option and show Game Board.
function hideOpt() {
    document.getElementById("preGame").setAttribute("hidden", "hidden");
    document.getElementById("preGame").style.display = "";
    document.getElementById("game").removeAttribute("hidden");
}

// For new round
function newRound() {
    window.scrollTo(0,65);
    turn = 0;
    if (round > 0) {
        resetBox();
        hideButtons();
    }
    document.getElementById("img1").removeAttribute("hidden");
    document.getElementById("img2").removeAttribute("hidden");
    statusBar.innerHTML = "To start playing, drag one of the images onto the tic-tac-toe board.";
}

// Fancy stuff at work:  button change on hover
function buttonColorIn(ev) {
    ev.target.style.backgroundColor = "orange";
}

// Fancy stuff at work:  button change hover out
function buttonColorOut(ev) {
    ev.target.style.backgroundColor = "";
}

// The Drag over empty box that allows dropping
function allowDrop(ev) {
    ev.preventDefault();
    ev.target.style.backgroundColor = "#009900";
}

// The Start Drag function
function drag(ev) {
    ev.dataTransfer.setData("Text", ev.target.id);
}

// Leave droppable box while dragging
function dragLeave(ev) {
    ev.target.style.backgroundColor = "";
}

// After dropping image into box
function drop(ev) {
    // Increase turn #
    turn++;
    // New Round, first turn
    if (turn === 1) {
        statusBar.innerHTML = "&#8226; &#8226; &#8226; &#8226; &#8226; Round in Progress &#8226; &#8226; &#8226; &#8226; &#8226;";
        // Increase Round #
        round++;
        // Set Round #
        document.getElementById("rounds").innerHTML = round;
    }
    var data = ev.dataTransfer.getData("Text");
    var imgelement = document.getElementById(data);
    var boxelement = ev.target;
    // temporarily change img id for img in grid BEFORE cloning image
    appendId(data);
    // Clone image
    var imgCopy = imgelement.cloneNode(true);
    // Put cloned image into box
    boxelement.appendChild(imgCopy);
    ev.preventDefault();
    // revert id change on original image.
    revertId(imgelement, data);
    // Once Dragged into a box...
    // remove 
    imgCopy.style.top = 0;
    // --Make image not draggable
    nodrag(imgCopy);
    // --Make Box not droppable
    nodrop(boxelement);
    // Change background Color based on image.
    colorchange(boxelement, imgCopy);
    // Toggle next person
    toggleDrag(data);
    // Check Game status
    check();
}

// make (cloned) image not draggable
function nodrag(img) {
    img.setAttribute("draggable", "false");
    img.removeAttribute("ondragstart");
}

// make box not droppable.
function nodrop(b) {
    b.removeAttribute("ondragover");
    b.removeAttribute("ondragleave");
    b.removeAttribute("onDrop");
}

// color change box when image dropped
function colorchange(box, img) {
    switch (img.className) {
        case 'img1':
            box.style.backgroundColor = "#FFFF00";
        break;
        case 'img2':
            box.style.backgroundColor = "#FF0000";
        break;
        default:
            null;
    }
}

// cloned image should have their own unique id
function appendId(img) {
    document.getElementById(img).id += "-t" + turn;
}

// change original image back to original id
function revertId(img, original) {
    img.id = original;
}

// the stuff that puts turns into effect!
function toggleDrag(img) {
    switch (img) {
        case 'img1':
            document.getElementById("img1").setAttribute("hidden", "hidden");
            document.getElementById("img2").removeAttribute("hidden");
        break;
        case 'img2':
            document.getElementById("img2").setAttribute("hidden", "hidden");
            document.getElementById("img1").removeAttribute("hidden");
        break;
    }
}

// check if the box has an image.
function imgCheck(c) {
    if (c.hasChildNodes()) {
        return c.children[0].id;
    } else {
        return null;
    }
}

// For calculating win/lose/tie
function check() {
    // Get the boxes
    window.b1 = document.getElementById("b1");
    window.b2 = document.getElementById("b2");
    window.b3 = document.getElementById("b3");
    window.b4 = document.getElementById("b4");
    window.b5 = document.getElementById("b5");
    window.b6 = document.getElementById("b6");
    window.b7 = document.getElementById("b7");
    window.b8 = document.getElementById("b8");
    window.b9 = document.getElementById("b9");

    // RegEx searches
    window.x = /\bimg1/;
    window.o = /\bimg2/;

    // Get the image inside the box
    window.box1 = imgCheck(b1);
    window.box2 = imgCheck(b2);
    window.box3 = imgCheck(b3);

    window.box4 = imgCheck(b4);
    window.box5 = imgCheck(b5);
    window.box6 = imgCheck(b6);

    window.box7 = imgCheck(b7);
    window.box8 = imgCheck(b8);
    window.box9 = imgCheck(b9);
    
    // creates an array for the entire grid
    window.box = document.querySelectorAll(".box");

    // Check for Winning Combinations
    if (
        // X Horizontal
        (x.test(box1) && x.test(box2) && x.test(box3)) || 
        (x.test(box4) && x.test(box5) && x.test(box6)) || 
        (x.test(box7) && x.test(box8) && x.test(box9)) || 
        // X Vertical
        (x.test(box1) && x.test(box4) && x.test(box7)) || 
        (x.test(box2) && x.test(box5) && x.test(box8)) || 
        (x.test(box3) && x.test(box6) && x.test(box9)) || 
        // X Diagonal
        (x.test(box1) && x.test(box5) && x.test(box9)) || 
        (x.test(box7) && x.test(box5) && x.test(box3))
    ){  // What to do when X (Player 1) wins
        // Increase X Counter
        countX++;
        // Show Winning Combo
        showWin();
        // hide draggable images
        gameEnd();
        // Display message
        statusBar.innerHTML = "<b>" + p1Name + " (" + SignNames[p1Sign].toUpperCase() + ") has won this round!</b><br />Click \"New Round\" to start a new round";
        window.scrollTo(0,65);
        // button for new/next round
        showButtons();
        // display alert unless disabled by user
        if (popUp == 1) {
            window.alert( p1Name + " (" + SignNames[p1Sign].toUpperCase() + ") has won this round!");
        }
    } else if (
        // Y Horizontal
        (o.test(box1) && o.test(box2) && o.test(box3)) || 
        (o.test(box4) && o.test(box5) && o.test(box6)) || 
        (o.test(box7) && o.test(box8) && o.test(box9)) || 
        // Y Vertical
        (o.test(box1) && o.test(box4) && o.test(box7)) || 
        (o.test(box2) && o.test(box5) && o.test(box8)) || 
        (o.test(box3) && o.test(box6) && o.test(box9)) || 
        // Y Diagonal
        (o.test(box1) && o.test(box5) && o.test(box9)) || 
        (o.test(box7) && o.test(box5) && o.test(box3))
    ){  // What to do when Y (Player 2) wins
        // Increase Y Counter
        countO++;
        // hide draggable images
        gameEnd();
        // Show Winning Combo
        showWin();
        statusBar.innerHTML = "<b>" + p2Name + " (" + SignNames[p2Sign].toUpperCase() + ") has won this round!</b><br />Click \"New Round\" to start a new round.";
        window.scrollTo(0,65);
        // Button for next/new round
        showButtons();
        // displays alert unless disabled by user
        if (popUp == 1) {
            window.alert( p2Name + " (" + SignNames[p2Sign].toUpperCase() + ") has won this round!");
        }
    } else if (turn === 9) {
        // What to do when it is a tie
        // Increast Tie Counter
        countT++;
        // hide draggable images
        gameEnd();
        // Fade All images, since nobody won
        fadeAll();
        statusBar.innerHTML = "<b>This Game is TIED.</b><br />Click \"New Round\" to start a new round.";
        window.scrollTo(0,65);
        // Button for new/next round
        showButtons();
        // displays alert unless disabled by user
        if (popUp == 1) {
            window.alert("This game is TIED!");
        }
    }
}

// Hides original images, update scores
function gameEnd() {
    document.getElementById("img1").setAttribute("hidden", "hidden");
    document.getElementById("img2").setAttribute("hidden", "hidden");
    updateScore();
}

// Shows next/new round button
function showButtons() {
    document.getElementById("twoButtons").removeAttribute("hidden");
    document.getElementById("newRound").removeAttribute("hidden");
}

// Hides next/new round button
function hideButtons() {
    document.getElementById("twoButtons").setAttribute("hidden", "hidden");
    document.getElementById("newRound").setAttribute("hidden", "hidden");
}

// Reload page/reset game/new game/clear stats
function reload() {
    location.reload(true);
}

// Fade entire grid - draw/tie scenario only
function fadeAll() {
    window.grid = document.getElementById("grid");
    grid.className = "fade";
}

// Show Winning Combination by fading out others
function showWin() {
    // Horizontal win - top row
    if (
    (x.test(box1) && x.test(box2) && x.test(box3)) || 
    (o.test(box1) && o.test(box2) && o.test(box3))) {
        box[3].className += " fade";
        box[4].className += " fade";
        box[5].className += " fade";
        box[6].className += " fade";
        box[7].className += " fade";
        box[8].className += " fade";
    } else if (
    // Horizontal win - middle row
    (x.test(box4) && x.test(box5) && x.test(box6)) || 
    (o.test(box4) && o.test(box5) && o.test(box6))) {
        box[0].className += " fade";
        box[1].className += " fade";
        box[2].className += " fade";
        box[6].className += " fade";
        box[7].className += " fade";
        box[8].className += " fade";
    } else if (
    // Horizontal win - bottom row
    (x.test(box7) && x.test(box8) && x.test(box9)) || 
    (o.test(box7) && o.test(box8) && o.test(box9))) {
        box[0].className += " fade";
        box[1].className += " fade";
        box[2].className += " fade";
        box[3].className += " fade";
        box[4].className += " fade";
        box[5].className += " fade";
    } else if (
    // Vertical win - first column
    (x.test(box1) && x.test(box4) && x.test(box7)) || 
    (o.test(box1) && o.test(box4) && o.test(box7))) {
        box[1].className += " fade";
        box[2].className += " fade";
        box[4].className += " fade";
        box[5].className += " fade";
        box[7].className += " fade";
        box[8].className += " fade";
    } else if (
    // Vertical win - middle column
    (x.test(box2) && x.test(box5) && x.test(box8)) || 
    (o.test(box2) && o.test(box5) && o.test(box8))) {
        box[0].className += " fade";
        box[2].className += " fade";
        box[3].className += " fade";
        box[5].className += " fade";
        box[6].className += " fade";
        box[8].className += " fade";
    } else if (
    // Vertical win - last column
    (x.test(box3) && x.test(box6) && x.test(box9)) || 
    (o.test(box3) && o.test(box6) && o.test(box9))) {
        box[0].className += " fade";
        box[1].className += " fade";
        box[3].className += " fade";
        box[4].className += " fade";
        box[6].className += " fade";
        box[7].className += " fade";
    } else if (
    // Diagonal win - top-left to bottom-right
    (x.test(box1) && x.test(box5) && x.test(box9)) || 
    (o.test(box1) && o.test(box5) && o.test(box9))) {
        box[1].className += " fade";
        box[2].className += " fade";
        box[3].className += " fade";
        box[5].className += " fade";
        box[6].className += " fade";
        box[7].className += " fade";
    } else if (
    // Diagonal Win - top-right to bottom-left
    (x.test(box3) && x.test(box5) && x.test(box7)) || 
    (o.test(box3) && o.test(box5) && o.test(box7))) {
        box[0].className += " fade";
        box[1].className += " fade";
        box[3].className += " fade";
        box[5].className += " fade";
        box[7].className += " fade";
        box[8].className += " fade";
    }
}

// Updates win/tie scores
function updateScore() {
    document.getElementById("rounds").innerHTML = round;
    document.getElementById("tie").innerHTML = countT;
    document.getElementById("xWin").innerHTML = countX;
    document.getElementById("yWin").innerHTML = countO;

}

// For new round - reset/clear all boxes
function resetBox() {
    for ( i = 0 ; i < box.length ; i++ ) {
        if (box[i].hasChildNodes()) {
            box[i].removeChild(box[i].getElementsByTagName("img")[0]);
            box[i].setAttribute("ondrop","drop(event)");
            box[i].setAttribute("ondragover","allowDrop(event)");
            box[i].setAttribute("ondragleave","dragLeave(event)");
            box[i].style.backgroundColor = "";
        }
        box[i].classList.remove("fade");
    }
    grid.classList.remove("fade");
}

// Fancy Stuff at work:  User can disable JS alerts - color-coded box
function popClick() {
    if (popUp == 1) {
        popUp = 0;
        document.getElementById("pop").style.backgroundColor = "#CC0000";
    } else if (popUp == 0) {
        popUp = 1;
        document.getElementById("pop").style.backgroundColor = "#99CC66";
    }
}
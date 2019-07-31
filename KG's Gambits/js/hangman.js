(function() {
    "use strict";
    var availableLetters,
        words,
        guessInput,
        guess,
        guessButton,
        lettersGuessed,
        lettersMatched,
        lives,
        currentWord,
        numLettersMatched,
        messages,
        categoryName,
        categories,
        chosenCategory,
        inputLetter;
    var imgDraw = document.getElementById("draw");
    var srcDefault = "images/games/hangman/hangman0.png";
    var output = document.getElementById("output");
    var bonhomme = document.getElementById("bonhomme");
    var letters = document.getElementById("letters");

    function setup() {

        /* start config options */

        availableLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
            'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
            't', 'u', 'v', 'w', 'x', 'y', 'z'];
        lives = 10;
        categories = [
            ["banana", "apple", "orange", "celery", "carrot", "bread", "lasagna", "hamburger", "frenchfries", "sushi", "chicken", "salad", "chickenpotpie", "fishandchips", "soup"],
            ["pulpfiction", "americanbeauty", "littlemisssunshine", "lostintranslation", "titanic", "deadpoetssociety", "citizenkane", "ghost", "djangounchained", "rocky", "harrypotter", "chittychittybangbang", "cinderella", "marypoppins"],
            ["tokyo", "paris", "montreal", "mississauga", "london", "seoul", "washington", "newyork", "moscow", "ottawa", "kentucky", "orlando", "miami", "orangeville", "vancouver"]
        ];
        chosenCategory = categories[Math.floor(Math.random() * categories.length)];
        words = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
        currentWord = words.replace(/\s/g, "-"); //current word
        messages = {
            win: 'Congratulations, You won!' + '<br>' + 'The word was <em>' + currentWord,
            lose: 'Game over!' + '<br>' + 'The word was <em>' + currentWord,
            guessed: ' is a letter that you have already used, please try a different one',
            error: 'oops... please refresh the page!'
        }

        /* end config options */

        renderLetter();
        selectCat();

        lettersGuessed = lettersMatched = '';
        numLettersMatched = 0;
        imgDraw.style.display = "none";
        bonhomme.innerText = 'You have ' + lives + ' tries remaining';
        output.innerHTML = '';
        output.className = "";

        /* set up display of letters in current word */

        letters.innerHTML = '<li class="current-word">Current word:</li>';

        var currentLetter, i;
        for (i = 0; i < currentWord.length; i++) {
            currentLetter = '<li class="letter letter' + currentWord.charAt(i).toUpperCase() + '">' + currentWord.charAt(i).toUpperCase() + '</li>';
            letters.insertAdjacentHTML('beforeend', currentLetter);
        }
    }

    /*render letters*/

    function renderLetter() {

        var myButtons = document.getElementById('buttons');

        var letters = document.getElementById("alphabet");
        if (letters == null) {
            letters = document.createElement('ul');
            for (var i = 0; i < availableLetters.length; i++) {
                letters.id = 'alphabet';
                inputLetter = document.createElement('li');
                inputLetter.id = 'letter';
                inputLetter.innerHTML = availableLetters[i];
                check();
                myButtons.appendChild(letters);
                letters.appendChild(inputLetter);
            }
        }
    }

    /*topic*/

    var selectCat = function() {
        categoryName = document.getElementById("categoryName");
        if (chosenCategory === categories[0]) {
            categoryName.innerHTML = "The Category Is Food";
        } else if (chosenCategory === categories[1]) {
            categoryName.innerHTML = "The Category Is Movies";
        } else if (chosenCategory === categories[2]) {
            categoryName.innerHTML = "The Category Is Cities";
        }
    }

    function gameOver(win) {
        if (win) {
            output.innerHTML = messages.win;
            output.classList.add('win'); //select class css for selector
        } else {
            output.innerHTML = messages.lose;
            output.classList.add('error'); //select class css for selector
        }
    }

    /* Start game - should ideally check for existing functions attached to window.onload */

    window.onload = setup();

    /* reset button */

    document.getElementById("restart").onclick = function() {
        setup();
        imgDraw.style.display = "block";
        imgDraw.src = srcDefault;
    };


    /* main guess function when user clicks #guess */

    function check() {

        inputLetter.onclick = function(e) {
            /*handle when Win or Close*/
            if (!((output.className == "win") || (output.className == "error"))) {
                if (e.preventDefault) e.preventDefault();
                output.innerHTML = '';
                output.classList.remove('error', 'warning');
                guess = this.innerHTML;

                /* does guess have a value? if yes continue, if no, error */
                /* has it been guessed (missed or matched) already? if so, abandon & add notice */

                if ((lettersMatched && lettersMatched.indexOf(guess) > -1) || (lettersGuessed && lettersGuessed.indexOf(guess) > -1)) {
                    output.innerHTML = '"' + guess.toUpperCase() + '"' + messages.guessed;
                    output.classList.add("warning");
                }

                /* does guess exist in current word? if so, add to letters already matched, if final letter added, game over with win message */
                else if (currentWord.indexOf(guess) > -1) {
                    var lettersToShow;
                    lettersToShow = document.querySelectorAll(".letter" + guess.toUpperCase());

                    for (var i = 0; i < lettersToShow.length; i++) {
                        lettersToShow[i].classList.add("correct");
                    }
                    /* check to see if letter appears multiple times */

                    for (var j = 0; j < currentWord.length; j++) {
                        if (currentWord.charAt(j) === guess) {
                            numLettersMatched += 1;
                        }
                    }

                    lettersMatched += guess;
                    if (numLettersMatched === currentWord.length) {
                        gameOver(true);
                    }
                }

                /* guess doesn't exist in current word and hasn't been guessed before, add to lettersGuessed, reduce lives & update user */
                else {
                    if (lives === 0) {
                        gameOver();
                    } else {
                        lettersGuessed += guess;
                        lives--;
                        bonhomme.innerHTML = 'You have ' + lives + ' tries remaining';
                        imgDraw.style.display = "block";
                        imgDraw.src = "images/games/hangman/hangman" + (10 - lives) + ".png";
                    }
                }
            }
        }
    };

}());
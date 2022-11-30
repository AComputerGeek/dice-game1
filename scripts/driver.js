// Grab the DOM'S element
const player1Dice1        = document.getElementById(`player1-dice1`);
const player1Dice2        = document.getElementById(`player1-dice2`);
const player1CurrentScore = document.getElementById(`player1-current-score`);
const player1TotalScore   = document.getElementById(`player1-total-score`);

const player2Dice1        = document.getElementById(`player2-dice1`);
const player2Dice2        = document.getElementById(`player2-dice2`);
const player2CurrentScore = document.getElementById(`player2-current-score`);
const player2TotalScore   = document.getElementById(`player2-total-score`);

// Buttons (Roll Dice and New Game)
const btnRoll = document.getElementById(`btn-roll`);
const btnNew  = document.getElementById(`btn-new`);

// Round Counter (Display)
const gameRound = document.getElementById(`game-round`);

// Popup
const popup   = document.getElementById(`pop-up`);
const close   = document.getElementById(`close-pop-up`);

// Popup Message
const won     = document.getElementById(`won`);
const lost    = document.getElementById(`lost`);
const even    = document.getElementById(`even`);

// Guide (How to Play, and Rules)
const showHowPlay = document.getElementById(`show-play`);
const howPlay     = document.getElementById(`how-play`);
const showRules   = document.getElementById(`show-rules`);
const rules       = document.getElementById(`rules`);

let p1ThisRound;
let p1TotalScore = 0;

let p2ThisRound;
let p2TotalScore = 0;

// Round Counter (round counter for inside the code)
let   round = 0;

// Constants
const firstRound       = 1;
const secondRound      = 2;
const lastRound        = 3;
const firstFace        = 1;
const lastFace         = 6;
const criticalFace     = 1;
const bonusCoefficient = 2;
const p1d1Index        = 0;
const p1d2Index        = 1;
const p2d1Index        = 2;
const p2d2Index        = 3;
const fadeInDelay      = 500;


// Button Roll Dice
btnRoll.addEventListener(`click`, function(event)
{
    round++;

    if(round <= lastRound)
    {
        gameRound.innerHTML = `<b>Round Counter: <span class="blue">${round}</span></b>`;

        if(round == lastRound)
        {
            gameRound.innerHTML = `<b>Round Counter: <span class="blue">${round} (Last Round!)</span></b>`;
        }

        const dice      = new Dice();
        const thisRound = dice.roll();
    
        const p1d1 = thisRound[p1d1Index]; // Player1 Dice1
        const p1d2 = thisRound[p1d2Index]; // Player1 Dice2
        const p2d1 = thisRound[p2d1Index]; // Player2 Dice1
        const p2d2 = thisRound[p2d2Index]; // Player2 Dice2
    
        for(let i = firstFace; i <= lastFace; i++)
        {
            let imageName = `dice-face-${i}`;

            // Player 1, Dice 1
            if(p1d1 == i)
            {
                player1Dice1.innerHTML = `<img src="images/${imageName}.jpg" alt="${imageName}">`;               
            }

            // Player 1, Dice 2
            if(p1d2 == i)
            {
                player1Dice2.innerHTML = `<img src="images/${imageName}.jpg" alt="${imageName}">`; 
            }

            // Player 2, Dice 1
            if(p2d1 == i)
            {
                player2Dice1.innerHTML = `<img src="images/${imageName}.jpg" alt="${imageName}">`;
            }

            // Player 2, Dice 2
            if(p2d2 == i)
            {
                player2Dice2.innerHTML = `<img src="images/${imageName}.jpg" alt="${imageName}">`;
            }          
        }
    
        // Player 1 Score
        if(p1d1 == criticalFace || p1d2 == criticalFace)
        {
            p1ThisRound  = none;
            p1TotalScore += p1ThisRound;
    
            player1CurrentScore.innerHTML = `${p1ThisRound}`;
            player1TotalScore.innerHTML   = `${p1TotalScore}`;
        }
        else
        {
            if(p1d1 == p1d2)
            {
                p1ThisRound = bonusCoefficient * (p1d1 + p1d2);
    
                player1CurrentScore.innerHTML = `${p1ThisRound}`;
            }
            else
            {
                p1ThisRound = p1d1 + p1d2;
    
                player1CurrentScore.innerHTML = `${p1ThisRound}`; 
            }
    
            p1TotalScore += p1ThisRound;
    
            player1TotalScore.innerHTML = `${p1TotalScore}`;
        }

        // Player 2 Score
        if(p2d1 == criticalFace || p2d2 == criticalFace)
        {
            p2ThisRound  = none;
            p2TotalScore += p2ThisRound;
    
            player2CurrentScore.innerHTML = `${p2ThisRound}`;
            player2TotalScore.innerHTML   = `${p2TotalScore}`;
        }
        else
        {
            if(p2d1 == p2d2)
            {
                p2ThisRound = bonusCoefficient * (p2d1 + p2d2);
    
                player2CurrentScore.innerHTML = `${p2ThisRound}`;
            }
            else
            {
                p2ThisRound = p2d1 + p2d2;
    
                player2CurrentScore.innerHTML = `${p2ThisRound}`; 
            }
    
            p2TotalScore += p2ThisRound;
    
            player2TotalScore.innerHTML = `${p2TotalScore}`;
        }  
        
        // Table Result
        if(round == firstRound)
        {
            $(`#p1r1`).html(`<b>${p1ThisRound}</b>`);
            $(`#p1Total`).html(`<b>${p1TotalScore}</b>`);
            $(`#p2r1`).html(`<b>${p2ThisRound}</b>`);
            $(`#p2Total`).html(`<b>${p2TotalScore}</b>`);
        }
        else if(round == secondRound)
        {
            $(`#p1r2`).html(`<b>${p1ThisRound}</b>`);
            $(`#p1Total`).html(`<b>${p1TotalScore}</b>`);
            $(`#p2r2`).html(`<b>${p2ThisRound}</b>`);
            $(`#p2Total`).html(`<b>${p2TotalScore}</b>`);
        }
        else // Round 3
        {
            $(`#p1r3`).html(`<b>${p1ThisRound}</b>`);
            $(`#p1Total`).html(`<b>${p1TotalScore}</b>`);
            $(`#p2r3`).html(`<b>${p2ThisRound}</b>`);
            $(`#p2Total`).html(`<b>${p2TotalScore}</b>`);
        }

        // Popup and its Message; and also highlight the winner (border and background in the light red color)
        if(round == lastRound)
        {
            popup.style.display = `block`;

            setTimeout(function()
            {
                popup.style.opacity = 1;
            }, fadeInDelay);

            // First, clear all messages in popup
            $(`.won`).removeClass(`show`);
            $(`.lost`).removeClass(`show`);
            $(`.even`).removeClass(`show`);
            
            if(p1TotalScore > p2TotalScore)
            {
                // Highlight P1 as a winner in Display and Table Score
                $(`#p1FinalScore`).addClass(`winner`);
                $(`#p1Total`).addClass(`winner`);

                // Update the popup message
                $(`.won`).addClass(`show`);
            }
            else if(p1TotalScore < p2TotalScore)
            {
                // Highlight P2 as a winner in Display and Table Score
                $(`#p2FinalScore`).addClass(`winner`);
                $(`#p2Total`).addClass(`winner`);

                // Update the popup message
                $(`.lost`).addClass(`show`);
            }
            else // P1 and P2 are even
            {
                // Highlight P1 and P2 are even in Display and Table Score (border and background in the light green color)
                $(`#p1FinalScore`).addClass(`even-result`);
                $(`#p2FinalScore`).addClass(`even-result`);
                $(`#p1Total`).addClass(`even-result`);
                $(`#p2Total`).addClass(`even-result`);

                // Update the popup message
                $(`.even`).addClass(`show`);
            }
        }
    }
});


// Button New Game
btnNew.addEventListener(`click`, function(event)
{   
    p1ThisRound  = none;
    p1TotalScore = none;
    p2ThisRound  = none;
    p2TotalScore = none;
    round        = none;

    gameRound.innerHTML = `<b>Round Counter: </b>...`;

    // Remove all classes from Display
    $(`#p1FinalScore`).removeClass(`winner`);
    $(`#p2FinalScore`).removeClass(`winner`);
    $(`#p1FinalScore`).removeClass(`even-result`);
    $(`#p2FinalScore`).removeClass(`even-result`);

    // Remove all classes from Table
    $(`#p1Total`).removeClass(`winner`);
    $(`#p2Total`).removeClass(`winner`);
    $(`#p1Total`).removeClass(`even-result`);
    $(`#p2Total`).removeClass(`even-result`);

    // Reset the all table's value
    $(`#p1r1`).text(``);
    $(`#p1r2`).text(``);
    $(`#p1r3`).text(``);
    $(`#p1Total`).text(``);
    
    $(`#p2r1`).text(``);
    $(`#p2r2`).text(``);
    $(`#p2r3`).text(``);
    $(`#p2Total`).text(``);

    // Reset the all display's value
    player1Dice1.innerHTML        = ``;
    player1Dice2.innerHTML        = ``;
    player1CurrentScore.innerHTML = ``; 
    player1TotalScore.innerHTML   = ``; 

    player2Dice1.innerHTML        = ``;
    player2Dice2.innerHTML        = ``;
    player2CurrentScore.innerHTML = ``; 
    player2TotalScore.innerHTML   = ``; 
});


// Hide / Show (For How to play)
$(`#show-play`).click(function(event)
{
    event.preventDefault();

    let $label = $(`#show-play`).text();

    if($label == "[Hide]")
    {
        $(`#how-play`).slideUp();
        $(`#show-play`).text(`[Show]`);
    }
    else
    {
        $(`#how-play`).slideDown();
        $(`#show-play`).text(`[Hide]`);
    }
});


// Hide / Show (For Rules)
$(`#show-rules`).click(function(event)
{
    event.preventDefault();

    let $label = $(`#show-rules`).text();

    if($label == "[Hide]")
    {
        $(`#rules`).slideUp();
        $(`#show-rules`).text(`[Show]`);
    }
    else
    {
        $(`#rules`).slideDown();
        $(`#show-rules`).text(`[Hide]`);
    }
});

// Close Button in Popup
close.addEventListener(`click`, function(event)
{
    popup.style.display = `none`;
    popup.style.opacity = `0`;
});

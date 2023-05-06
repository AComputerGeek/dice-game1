// @author: Amir Armion
// @version: V.01

// Constant
const none = 0;
const max  = 5;

// Dice class
class Dice
{
    constructor()
    {
        this.currentRound = [none, none, none, none]; // [player1Dice1, player1Dice2, player2Dice1, player2Dice2]
    }

    roll() 
    {
        let number;

        for(let i = 0; i < this.currentRound.length; i++)
        {
            number               = Math.round(Math.random() * max) + 1; // 1 <= number (dice face) <= 6
            this.currentRound[i] = number;
        }   
        
        return this.currentRound;
    }
}

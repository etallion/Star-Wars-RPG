$(document).ready(function(){

// Create jQuery object reference to HTML elements we'll use through the game
var $playerHP = $("#playerHP");
var $opponenHP = $("#opponentHP");
var $displayDiv = $("#display");
var $character = $(".character");


// Create character objects
var annakin = {
    name : "Annakin",
    $div : $("#annakin"),
    $img : $("#annakin-img"),
    health : 100,
    attack : 10,
    isPlayer : false,
    isOpponent : false
};

var yoda = {
    name : "Yoda",
    $div : $("#yoda"),
    $img : $("#yoda-img"),
    health:100,
    attack:10,
    isPlayer : false,
    isOpponent: false
};

var darth = {
    name : "Darth Vader",
    $div : $("#darth"),
    $img : $("#darth-img"),
    health: 100,
    attack: 10,
    isPlayer : false,
    isOpponent: false
};

var jabba = {
    name : "Jabba the Hutt",
    $div : $("#jabba"),
    $img : $("#jabba-img"),
    health : 100,
    attack : 10,
    isPlayer : false,
    isOpponent: false
};

var characters = [annakin, yoda, darth, jabba];

$character.on("click", function(){

    if(!game.isPlayerSelected){
        playerSelection($(this));
    } else if (!game.isOpponentSelected){
        opponentSelection($(this));
    }
});

$("#attackButton").on("click", playerAttack);


// annakin.$div.click(function(){
//     var $input = $(this);
//     var leftPosition = annakin.$div.css("left");
//     console.log(leftPosition);
//     leftPosition = parseInt(leftPosition) + 100;
//     $input.css("left", "+=50");
//     console.log("annakin clicked");
// });

// jabba.$div.click(opponentSelection)

// function selectCharacter(choice){
//     choice.css("left", "50");
//     choice.css("top", "50");
// }

// function opponentSelection() {
//     console.log("inside opponentSelection")
//     $input = jabba.$div;
//     $inputImg = jabba.$img;
//     $input.css("left", 750);
//     $input.css("top", 0);
//     $inputImg.css("height", 200);
//     var count = 0;
//     characters.forEach(function(character){
//         // console.log(character);
//         if(character.$div !== annakin.$div && character.$div !== $input ){
//             console.log("count = " + count);
//             var p = 350 + (150*count);
//             character.$div.css("left", p);
//             character.$div.css("top", 200);
//             count++;
//         }
//     });
// }



var game = {
    isPlayerSelected : false,
    isOpponentSelected : false,
    playerAttackTimes : 0,
    didPlayerWin : false,
    player : null,
    comp : null,
    wins :0

};

function init(){
    //Setup up game display and field
    $displayDiv.text("Select your character!")
    //Await for user to select character
};



function startGame(){

};

function playerSelection($player){
    characters.forEach(function(character){
        if(character.$div.attr("id") === $player.attr("id")){
            console.log("player ID = " + character.id);
            character.isPlayer = true;
            game.player = character;
            // game.player.$div = $player;
        }
    });
    $player.css("pointer-events", "none");
    console.log($player);
    $player.removeClass("selectionPosition1 selectionPosition2 selectionPosition3 selectionPosition4");
    $player.addClass("playerPosition");
    game.isPlayerSelected = true;
    $displayDiv.html("<em>Select your opponent</em>");
    
    $("#playerHPSVG").css("width", game.player.health);
    $("#playerHPNum").text(game.player.health);

    
};

function opponentSelection($opponent){
    console.log("opponentselection =" + $opponent);
    console.log("opponentSelection");
    $opponent.removeClass("selectionPosition1 selectionPosition2 selectionPosition3 selectionPosition4 opponentBench1 opponentBench2");
    $opponent.addClass("opponentPosition");
    game.isOpponentSelected = true;
    
    characters.forEach(function(character){
        if(character.$div.attr("id") === $opponent.attr("id")){
            console.log("opponent ID =" + character.$div.attr("id"));
            character.isOpponent = true;
            game.comp = character;
        }
    });
    

    // move unselect characters to the bench
    var count = 0;
    characters.forEach(function(character){
        console.log(character);
        if(character.isOpponent === false && character.isPlayer === false ){
            console.log(character.name);
            if(count === 0){
                character.$div.removeClass("selectionPosition1 selectionPosition2 selectionPosition3 selectionPosition4");
                character.$div.addClass("opponentBench1");
            } else {
                character.$div.removeClass("selectionPosition1 selectionPosition2 selectionPosition3 selectionPosition4");
                character.$div.addClass("opponentBench2");
            }
            count++;
        }
    });

    $("#compHPSVG").css("width", game.comp.health);
    $("#compHPNum").text(game.comp.health);

    //update display
    $displayDiv.html("<em>Click Attack Button!</em>");
    $("#attackButton").removeClass("hidden");
};

function playerAttack(){
    $displayDiv.html(game.player.name + " attacked " + game.comp.name + ", reducing HP by " + game.player.attack);
    game.comp.health -= game.player.attack;
    $("#compHPSVG").css("width", game.comp.health);
    $("#compHPNum").text(game.comp.health);
    game.player.attack *=2;

    if(!checkWin()){
    // $game.player.$div.css("pointer-events", "none");
    setTimeout(opponentAttack, 500);
    };
};

function opponentAttack(){
    $displayDiv.append("<br>" + game.comp.name + " attacked " + game.player.name + " back, reducing your HP by " + game.comp.attack);
    game.player.health -= game.comp.attack;
    $("#playerHPSVG").css("width", game.player.health);
    $("#playerHPNum").text(game.player.health);

    // $game.player.$div.css("pointer-events", "auto");
   if(checkLost){

   };
};



function checkWin(){
    if(game.comp.health <= 0){
        //you won
        $("#attackButton").addClass("hidden");
        game.wins++;
        if(game.wins < 3){
            game.isOpponentSelected = false;
            game.comp.$div.addClass("hidden");
            $displayDiv.html("You defeated " + game.comp.name);
            $displayDiv.append("<p><em>Select your next opponent</em></p>");
        } else {
            $displayDiv.append("<p><strong>Congratulation! You're a true hero!</strong></p>");
        }
        return true;
    } else{
        return false;
    }
}

function checkLost(){

}

});
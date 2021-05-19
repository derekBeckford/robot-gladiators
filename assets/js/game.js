// Game States
// "WIN" - Player robot has defeated all enemy-robots
//    * Fight all enemy-robots
//    * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);
  return value;
};
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = randomNumber(40, 60);
console.log(enemyHealth)
var enemyAttack = 12;

var fight = function(enemyName){
    while (playerHealth > 0 && enemyHealth > 0) {
    // ask player if they'd like to fight or run
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip" || promptFight === "SKIP") {
      // confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

      // if yes (true), leave fight
    if (confirmSkip) {
        window.alert(playerName + ' has decided to skip this fight. Goodbye!');
        // subtract money from playerMoney for skipping
        playerMoney = playerMoney - 10;
        console.log("playerMoney", playerMoney)
        break;
        }
    }

    // remove enemy's health by subtracting the amount set in the playerAttack variable
    var damage = randomNumber(playerAttack - 3, playerAttack);
    enemyHealth = Math.max(0, enemyHealth - damage);
    console.log(
        playerName + ' attacked ' + enemyName + '. ' + enemyName + ' now has ' + enemyHealth + ' health remaining.'
    );

    // check enemy's health
    if (enemyHealth <= 0) {
        window.alert(enemyName + ' has died!');

      // award player money for winning
        playerMoney = playerMoney + 20;

      // leave while() loop since enemy is dead
        break;
    } else {
        window.alert(enemyName + ' still has ' + enemyHealth + ' health left.');
    }

    // remove players's health by subtracting the amount set in the enemyAttack variable
    var damage = randomNumber(enemyAttack - 3, enemyAttack);
    playerHealth = Math.max(0, playerHealth - damage);
    console.log(
        enemyName + ' attacked ' + playerName + '. ' + playerName + ' now has ' + playerHealth + ' health remaining.'
    );

    // check player's health
    if (playerHealth <= 0) {
        window.alert(playerName + ' has died!');
      // leave while() loop if player is dead
        break;
    } else {
    window.alert(playerName + ' still has ' + playerHealth + ' health left.');
    }
}
};

  var startGame = function (){
    //reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    for(var i = 0; i < enemyNames.length; i++){
      if (playerHealth > 0) {
          window.alert("Welcome to Robot Gladiators! Round " + ( i + 1 ));
          // pick new enemy to fight based on the index of the enemyNames array
          var pickedEnemyName = enemyNames[i];
          console.log(enemyHealth)

          // reset enemyHealth before starting new fight
          enemyHealth = 50;

          // use debugger to pause script from running and check what's going on at that moment in the code
          // debugger;

          // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
          fight(pickedEnemyName);

          if (playerHealth > 0 && i < enemyNames.length - 1){
            var storeConfirm = window.confirm("The fight is over, visit the store before the next round?")

            if (storeConfirm){
            console.log("entered the shop");
            shop();
            }
          }

      } else {
          window.alert ("You have lost your robot in battle! Game over!");
          break;
      } 
    }

    //play again
    endGame();
  }

  var endGame = function(){
    window.alert("The Game how now ended. Let's see how you did!");
    if (playerHealth > 0) {
      window.alert("Great job, you've survived the game! You received " + playerMoney + " coins.")
    } 
    else{
      window.alert("You lost your robot in battle. 💀🤖");
    }
    //ask if the player wants to play again 
    
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm){
      //restart the game
      startGame();
    }
    else {
      window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
  };

  var shop = function (){
    var shopOptionPrompt = window.prompt(
      "Welcome to the shop! Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );
    
    switch (shopOptionPrompt) {
      case "refill":
      case "REFILL":
        if (playerMoney >= 7){
        window.alert("Refilling player's health by 20 for 7 coins.");

        // increase health and decrease money
        playerHealth = playerHealth + 20;
        playerMoney = playerMoney -7;
        }
        else{
          window.alert("You dont have enough money!");
        }
        break;
      case "upgrade":
      case "UPGRADE":
        if (playerMoney >= 7){
        window.alert("Upgrading player's attack by 6 for 7 coins.");

        //increase attack and decrease money
        playerAttack = playerAttack + 6;
        playerMoney = playerMoney - 7;
        }
        else{
          window.alert("You dont have enough money!");
        }
        break;
      case "leave":
      case "LEAVE":
        window.alert("Leaving the store. See you next time!");

        //do nothing, so function will end
        break;
      default:
        window.alert("You did not pick a valid option. Try again.");

        //call shop() again to force player to pick a valid option
        shop();
        break;
    }

  };

  startGame();
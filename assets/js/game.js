// Game States
// "WIN" - Player robot has defeated all enemy-robots
//      * Fight all enemy-robots
//      * Defeat each enemy-robot
// "LOSE" - Player robot's health is 0 or less

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roberto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function (enemyName) {
  while (playerHealth > 0 && enemyHealth > 0) {
    // ask player if they'd like to fight or run
    var promptFight = window.prompt(
      'Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.'
    );

    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip" || promptFight === "SKIP") {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");

      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerName + " has decided to skip this fight. Goodbye!");
        // subtract money from playerMoney for skipping
        playerMoney = Math.max(0, playerMoney - 10);
        console.log("playerMoney", playerMoney);
        break;
      }
    }

    // remove enemy's health by subtracting the amount set in the playerAttack variable
    var damage = randomNumber (playerAttack - 3, playerAttack);

    enemyHealth = Math.max(0, enemyHealth - damage);
    console.log(
      playerName +
        " attacked " +
        enemyName +
        ". " +
        enemyName +
        " now has " +
        enemyHealth +
        " health remaining."
    );

    // check enemy's health
    if (enemyHealth <= 0) {
      window.alert(enemyName + " has died!");

      // award player money for winning
      playerMoney = playerMoney + 20;
      // leave while() loop since enemy is dead
      break;
    } else {
      window.alert(enemyName + " still has " + enemyHealth + " health left.");
    }

    // remove players's health by subtracting the amount set in the enemyAttack variable
    var damage = randomNumber(enemyAttack - 3, enemyAttack);
    playerHealth = Math.max(0, playerHealth - damage)
    console.log(
      enemyName +
        " attacked " +
        playerName +
        ". " +
        playerName +
        " now has " +
        playerHealth +
        " health remaining."
    );

    // check player's health
    if (playerHealth <= 0) {
      window.alert(playerName + " has died!");
      // leave while() loop if player is dead
      break;
    } else {
      window.alert(playerName + " still has " + playerHealth + " health left.");
    }
  } // end of while loop
}; // end of fight function

//function to start a new game

var startGame = function () {
  //resetting the player health whenever startGame is called
  playerHealth = 100;
  playerAttack = 10;
  playerMoney = 10;

  for (var i = 0; i < enemyNames.length; i++) {
    if (playerHealth > 0) {
      // lets the player know what round they are on.
      window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
      // picks a new enemy of them to fight based off the index of the enemyNames array
      var pickedEnemyName = enemyNames[i];
      //starts the enemy health at 50
      enemyHealth = randomNumber(40, 60);
      //initiates the fight with the chosen array enemy
      fight(pickedEnemyName);
      //if were not at the last enemy in the array
      if (playerHealth > 0 && i < enemyNames.length - 1) {
        //ask if the palyer wants to use the shop before next round
        var storeConfirm = window.confirm(
          "The fight is over, visit the store before the next round?"
        );
        // if yes, take to the shop
        if (storeConfirm) {
          shop();
        }
      }
    } else {
      window.alert("You have lost your robot in battle! Game Over!");
      break;
    }
  }
  //play again!
  endGame();
};

// This function will be used to end the game!

var endGame = function () {
  //if the player is still alive
  if (playerHealth > 0) {
    window.alert(
      "Great job! You have survived the game! You now have a score of " +
        playerMoney +
        "."
    );
  } else {
    window.alert("You've lost your robot in battle!");
  }

  var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
    //restart the game
    startGame();
  } else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
};

//Allows the player to enter the shop

var shop = function () {
  //ask the player what they would like to do
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE' or 'LEAVE' to make a choice!"
  );
  //Use a switch to carry out the action
  switch (shopOptionPrompt) {
    case "REFILL": //New case
    case "refill":
      if (playerMoney >= 7) {
        window.alert("Refilling player's health by 20 for 7 dollars!");

        //increase the health
        playerHealth = playerHealth + 20;
        playerMoney = playerMoney - 7;
      } else {
        window.alert("You dont have enough money!");
      }

      break;

    case "UPGRADE": //New case
    case "upgrade":
      if (playerMoney >= 7) {
        window.alert("Upgrading players attack by 6 for 7 dollars!");

        //Increase the attack
        playerAttack = playerAttack + 6;
        playerMoney = playerMoney - 7;
      } else {
        window.alert("You dont have enough money!");
      }

      break;

    case "LEAVE": //New case
    case "leave":
      window.alert("Leaving the store!");
      //do nothing so the function will end
      break;

    default:
      window.alert("You did not pick a valid option. Try again!");
      //call shop() again to force player to pick a valid option
      shop();
      break;
  }
};

//function to make a random number

var randomNumber = function (min, max) {

  var value = Math.floor (Math.random() * (max - min + 1) + min);
  return value;

}

// This will start the game when the page loads by initializing the above startGame() function
startGame();

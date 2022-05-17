// Game States
// "WIN" - Player robot has defeated all enemy-robots
//      * Fight all enemy-robots
//      * Defeat each enemy-robot
// "LOSE" - Player robot's health is 0 or less

var fightOrSkip = function () {
  //ask the player if theyd like to fight or skip using fightOrSkip function
  var promptFight = window.prompt(
    "Would you like to FIGHT or SKIP this battle? Enter FIGHT or SKIP to choose!"
  );

  promptFight = promptFight.toLowerCase();
  //Enter the condition recursive call here
  if (promptFight === "" || promptFight === null) {
    window.alert("You need to provide a valid response! Please try again!");
    return fightOrSkip();
  }

  //if player picks skip
  if (promptFight === "skip" || promptFight === "SKIP") {
    //confirm they want to skip
    var confirmSkip = window.alert("Are you sure you want to quit?");
    if (confirmSkip) {
      window.alert(
        playerInfo.name + " has decided to skip this fight. Goodbye!"
      );
      //subtract money from their account
      playerInfo.money = playerInfo.money - 10;
      return true;
    }
  }
  return false;
};

var fight = function(enemy) {
  // keep track of who goes first
  var isPlayerTurn = true;

  // randomly change turn order
  if (Math.random() > 0.5) {
    isPlayerTurn = false;
  }

  while (playerInfo.health > 0 && enemy.health > 0) {
    if (isPlayerTurn) {
      // ask player if they'd like to fight or skip using fightOrSkip function
      if (fightOrSkip()) {
        // if true, leave fight by breaking loop
        break;
      }

      var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

      // remove enemy's health by subtracting the amount we set in the damage variable
      enemy.health = Math.max(0, enemy.health - damage);
      console.log(
        playerInfo.name +
          " attacked " +
          enemy.name +
          ". " +
          enemy.name +
          " now has " +
          enemy.health +
          " health remaining."
      );

      // check enemy's health
      if (enemy.health <= 0) {
        window.alert(enemy.name + " has died!");

        // award player money for winning
        playerInfo.money = playerInfo.money + 20;

        // leave while() loop since enemy is dead
        break;
      } else {
        window.alert(enemy.name + " still has " + enemy.health + " health left.");
      }
      // player gets attacked first
    } else {
      var damage = randomNumber(enemy.attack - 3, enemy.attack);

      // remove player's health by subtracting the amount we set in the damage variable
      playerInfo.health = Math.max(0, playerInfo.health - damage);
      console.log(
        enemy.name +
          " attacked " +
          playerInfo.name +
          ". " +
          playerInfo.name +
          " now has " +
          playerInfo.health +
          " health remaining."
      );

      // check player's health
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + " has died!");
        // leave while() loop if player is dead
        break;
      } else {
        window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
      }
    }
    // switch turn order for next round
    isPlayerTurn = !isPlayerTurn;
  }
};

//function to start a new game

var startGame = function () {
  //resetting the player health whenever startGame is called
  playerInfo.reset();

  for (var i = 0; i < enemyInfo.length; i++) {
    if (playerInfo.health > 0) {
      // lets the player know what round they are on.
      window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
      // picks a new enemy of them to fight based off the index of the enemy.names array
      var pickedEnemyObj = enemyInfo[i];
      //starts the enemy health at 50
      pickedEnemyObj.health = randomNumber(40, 60);
      //initiates the fight with the chosen array enemy
      fight(pickedEnemyObj);
      //if were not at the last enemy in the array
      if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
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
  if (playerInfo.health > 0) {
    window.alert(
      "Great job! You have survived the game! You now have a score of " +
        playerInfo.money +
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
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter 1 for REFILL, 2 for UPGRADE, or 3 to leave!"
  );

  shopOptionPrompt = parseInt(shopOptionPrompt);
  //Use a switch to carry out the action
  switch (shopOptionPrompt) {
    case 1:
      playerInfo.refillHealth();
      break;
    case 2:
      playerInfo.upgradeAttack();
      break;
    case 3:
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
  var value = Math.floor(Math.random() * (max - min + 1) + min);
  return value;
};

//function to set name

var getPlayerName = function () {
  var name = "";
  while (name === "" || name === null) {
    name = prompt("What is your robot's name?");
  }
  console.log("Your robot's name is " + name);
  return name;
};

//moved playerInfo and enemyInfo below the randomNumber function so that it will work with the function.

var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function () {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function () {
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 dollars.");
      this.health += 20;
      this.money -= 7;
    } else {
      window.alert("You don't have enough money!");
    }
  },
  upgradeAttack: function () {
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
      this.attack += 6;
      this.money -= 7;
    } else {
      window.alert("You don't have enough money!");
    }
  },
};

var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 14),
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14),
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14),
  },
];

// This will start the game when the page loads by initializing the above startGame() function
startGame();

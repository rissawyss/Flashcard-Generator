// dependency for inquirer npm package
var inquirer = require("inquirer");


// constructor function for creating Basic flashcard objects
function BasicCard(question, answer) {
  this.question = question;
  this.answer = answer;
  this.front = question;
  this.back = answer;
}

BasicCard.prototype.printInfo = function() {
  console.log("Question: " + this.question + "\/Answer: " + this.answer +
  "\nFront: " + this.front + "\nBack: " + this.back);
};

// constructor function for creating Cloze flashcard objects
function ClozeCard(question, answer) {
  this.question = question;
  this.answer = answer;
  this.cloze = answer;
  this.fullText = question;
  this.partial = function() {
  	//take full text and replace the answer with "..."
  	var str = this.fullText;
  	var res = str.replace(this.answer, "...");
  	return res;
  }
}

ClozeCard.prototype.printInfo = function() {
  console.log("Question: " + this.question + "\/Answer: " + this.answer +
  "\nCloze: " + this.cloze + "\nFull Text: " + this.fullText + "\nPartial: " + this.partial());
};


//establish variables for user input to instantiate flashcards
var numOfQues;
var quiz;
var quizChoices = ["Basic", "Cloze"];

var makeCards = function() {
//capture user input by asking user how many and what type of cards
inquirer.prompt([
      {
        name: "quesnum",
        message: "How many questions would you like to ask?"
      }, {
        name: "quiztype",
        message: "What kind of quiz would you like to use?",
        type: "rawlist",
        choices: quizChoices
      }
    ]).then(function(num) {
    	numOfQues = num.quesnum;
    	quiz = num.quiztype;
    	console.log(numOfQues);
    	console.log(quiz);
    	if (quiz === "Basic") {
    		console.log("It's Basic!");
    		makeBasicCard();
    	} else {
    		console.log("It's Cloze!");
    		makeClozeCard();
    	};
    });
}

//function to start flashcard process
makeCards();

//depending on user input and selection from the makeCards function, instantiates flashcard by using constructor functions newBasicCard newClozeCard
var count = 0;
var basicCardQuesArr = [];
var clozeCardQuesArr = [];

//use recursion to instantiate Basic flashcard objects from user input by prompt. Store objects in an array.
function makeBasicCard() {
	if (count < numOfQues) {
	inquirer.prompt([
  {
    name: "question",
    message: "Enter Question"
  }, {
    name: "answer",
    message: "Enter Answer"
  }
]).then(function(basicQues) {

  var newQuestion = new BasicCard(basicQues.question, basicQues.answer);

  newQuestion.printInfo();
  basicCardQuesArr.push(newQuestion);

  count++;

  makeBasicCard();
	});
	} else {
    console.log(basicCardQuesArr);
    console.log("All questions entered");
    console.log("The Flashcard Application will run now. Prepare to answer questions");
    console.log("===============================================");
    basicCardExecute();
  }
};

//use recursion to instantiate Cloze flashcard objects from user input by prompt. Store objects in an array.
function makeClozeCard() {
	if (count < numOfQues) {
	inquirer.prompt([
  {
    name: "question",
    message: "Enter Question"
  }, {
    name: "answer",
    message: "Enter Answer"
  }
]).then(function(clozeQues) {

  var newQuestion = new ClozeCard(clozeQues.question, clozeQues.answer);

  newQuestion.printInfo();
  clozeCardQuesArr.push(newQuestion);

  count++;

  makeClozeCard();
	});
	} else {
    console.log(clozeCardQuesArr);
    console.log("All questions entered");
    console.log("The Flashcard Application will run now. Prepare to answer questions");
    console.log("===============================================");
    clozeCardExecute();
  }
};

// establish variables to run flashcard quiz
var score = 0;
var triv = 0;
var bCard = basicCardQuesArr;
var clCard = clozeCardQuesArr;

//use recursion to iterate through flashcard array of objects until all questions are answered.
//score increases by one for every correctly answered question
function basicCardExecute() {

   if (bCard.length > 0 && triv < bCard.length) {
  
    inquirer.prompt([
      {
        name: "ans",
        message: bCard[triv].front
      }
    ]).then(function(results) {
      console.log(results.ans);
      if (results.ans === bCard[triv].back) {
        console.log("Correct!");
        score++;
        triv++;
      } else {
        console.log("Incorrect! The correct answer is: " + bCard[triv].back);
        triv++;
      }
      basicCardExecute();
      });
  }
  else {
    console.log("All questions answered");
    console.log("Your score is: " + score);
  }
}

//use recursion to iterate through flashcard array of objects until all questions are answered.
//score increases by one for every correctly answered question
function clozeCardExecute() {
  
   if (clCard.length > 0 && triv < clCard.length) {
  
    inquirer.prompt([
      {
        name: "ans",
        message: clCard[triv].partial()
      }
    ]).then(function(results) {
      console.log(results.ans);
      if (results.ans === clCard[triv].cloze) {
        console.log("Correct!");
        console.log(clCard[triv].fullText);
        score++;
        triv++;
      } else {
        console.log("This doesn't work, oops! The correct answer is: " + clCard[triv].fullText);
        triv++;
      }
      clozeCardExecute();
      });
  }
  else {
    console.log("All questions answered");
    console.log("YOUR SCORE IS: " + score);
  }
}
    
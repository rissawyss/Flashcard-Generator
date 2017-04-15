# HW11 – {Cloze Constructors}
Homework week 11 for UCLA Coding BootCamp.
This project is a backend for a basic flashcard application.

## Description and Requirements
The application will be run through the Command Line Interface using Node.js.
The backend will essentially constitute an API that allows users to create two types of flashcards:
	-*Basic flashcards* with two parts: a front for the question and back for the answer.
	-*Cloze-Deleted flashcards* which will have three parts:
		-Full text representing the question & answer
		-The "cloze deletion" representing the answer within the full text
		-Partial text in which the cloze deletion is removed and replaced with an ellipse (...)


## Technologies Used
	-Node.JS
	-Node Package Module inquirer

-------------

## CODE EXPLANATION

### CONSTRUCTOR FUNCTIONS
Constructor functions were created for both Basic flashcards and Cloze flashcards in order for flashcard objects to be instantiated. In the Cloze constructor function, for example, a method for the partial text called this.partial() was created for cloze-deletions.

```
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

```

### INQUIRER PROMPT
User input to create flashcards is captured through use of the inquirer Node Package Module.

### RECURSION and INSTANTIATED OBJECTS
I implemented recursion to instantiate Cloze flashcard objects from user input by prompt. Objects were then stored in an array to be called upon in order to execute the flashcards.

Once the flashcards are executed, I use recursion to iterate through the flashcard array of objects until all questions are answered.
Score increases by one for every correctly answered question. The process completes once all questions in the array of objects is depleted, then score is displayed.

```
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

```
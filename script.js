startBtn = document.getElementById("startButton")

startMenu = document.getElementById("startingMenu")
quizMenu = document.getElementById("quizMenu")
resultsMenu = document.getElementById("resultsMenu")

scoreInfo = document.getElementById("scoreInfo")

function shuffleQuestions(){
	questions = shuffleArray(questions)
	questions.forEach(element => {
		element[1] = shuffleArray(element[1])
	});
}

let questions = [["When was America discovered?", 
									["1348", "476", "1492", "1452"], 
									"1492"],

                 ["How many bones have we got in our body?", 
									["159", "106", "296", "206"], 
									"206"],
									
				 ["When did the Titanic sink?", 
				 					["1897", "1912", "1909", "1934"], 
									"1912"],

				 ["What does DNA stand for?", 
				 					["Dynamic Nuclear Acid", 
									"Desoxyribonucleic acid", 
									"Disodium nucleic acid", 
									"Dioxygenic Nitric Acid"], 
									"Desoxyribonucleic acid"],

				 ["In which year did the first Harry Potter movie come out?", 
				 					["1999", "2000", "2001", "2002"], 
									"2001"],

				 ["Who was the first woman to win a Nobel Prize?", 
				 					["Marie Curie", 
									"Rosalind Franklin", 
									"Ada Lovelace", 
									"Jane Goodall"], 
									"Marie Curie"],

				 ["Who created the Sherlock Holmes character?", 
				 					["Agatha Christie", 
									"Arthur Conan Doyle", 
									"Edgar Allan Poe", "Ian Fleming"], 
									"Arthur Conan Doyle"],

				 ["Which element is most abundant in the Earth's atmosphere?", 
									["Oxygen", 
									"Carbon Dioxide", 
									"Hydrogen", 
									"Nitrogen"], 
									"Nitrogen"]]

let qCounter;
let score;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function showQuiz(){
    startMenu.style.display = "none";
    quizMenu.style.display = "flex";
	scoreInfo.style.display = "block";

    startQuiz()
}

function showResults(score){
	quizMenu.style.display = "none";
	resultsMenu.style.display = "flex";

	document.getElementById("scoreTeller").textContent = `Your score: ${score}`

	scoreInfo.style.display = "none";
}

function showMenu(){
	startMenu.style.display = "flex";
	resultsMenu.style.display = "none";
}

function correctAnswer(i, counter, score, gained){
    buttons[i].style.backgroundColor = "green";
	buttons.forEach(element => {
		element.onclick = null;
	});
    setTimeout(function(){
        counter++;
        score += score_gained;
        next_question(counter, score);
    }, 1500)
}

function wrongAnswer(i, correct, gained){
    buttons[i].style.backgroundColor = "red";
	buttons[i].onclick = null;
	gained -= 125;
	return gained;
}

function checkAnswer(question, i, counter, score, score_gained){
    if (question[1][i] === question[2]){correctAnswer(i, counter, score, score_gained)}
    else{return wrongAnswer(i, question[2], score_gained)}

	return score_gained;
}

function next_question(qCounter, score){
    scoreInfo.textContent = `Score: ${score}`;

    score_gained = 500;
    if (qCounter >= questions.length){end_quiz(score)}else{

    let question = questions[qCounter];
    questionText.textContent = question[0];
    
    for(let i = 0; i < buttons.length; i++){
        buttons[i].textContent = ["A", "B", "C", "D"][i] + ". " + question[1][i];
        buttons[i].style.backgroundColor = "rgb(102, 1, 102)";
        buttons[i].onclick = function(){
			score_gained = checkAnswer(question, i, qCounter, score, score_gained)};
    }}
}

function startQuiz(){
    questionText = document.getElementById("questionText");
    buttons = Array.from(document.getElementsByClassName("answers"));

	shuffleQuestions()
    
    qCounter = 0;
    score = 0;

    next_question(qCounter, score)
}

function end_quiz(score){
    showResults(score)
}

startBtn.onclick = showQuiz
restartBtn.onclick = showMenu
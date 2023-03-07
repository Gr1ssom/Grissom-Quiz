const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "What year did the St. Louis Blues win their first Stanley Cup?",
        choice1: "2012",
        choice2: "2019",
        choice3: "1995",
        choice4: "1975",
        answer: 2
    },    
    {
        question: "Who was the Captain of the first Stanley Cup team in St. Louis?",
        choice1: "Alex Pietrangelo",
        choice2: "Bobby Hull",
        choice3: "Vladimir Tarasenko",
        choice4: "Ryan O'Reilly",
        answer: 4
    },

    {
        question: "Who did the St. Louis Blues beat in their first Stanley Cup win?",
        choice1: "Boston Bruins",
        choice2: "Philadelphia Flyers",
        choice3: "Colorado Avalanche",
        choice4: "Chicago Blackhawks",
        answer: 1
    },

    {
        question: "Who was the coach of the St. Louis Blues when they won their first Stanley Cup?",
        choice1: "Mike Yeo",
        choice2: "Cam Janssen",
        choice3: "Craig Berube",
        choice4: "Ken Hitchcock",
        answer: 3
    }
    ]

const CORRECT_BONUS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {

    if(availableQuestions.length === 0) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign("/end.html");
    }
    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + 4;
    
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

      const classToApply = 
        selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if(classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    })
});

incrementScore = number => {
    score +=number;
    scoreText.innerText = score;
}
    
startGame ();


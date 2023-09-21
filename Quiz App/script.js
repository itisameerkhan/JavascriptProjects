const questions = [
    {
        question: "Which is the larget animal in the world?",
        answers: [
            {text: "Shark", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
        ]
    },
    {
        question: "Which is the larget desert in the world?",
        answers: [
            {text: "Kalahari", correct: false},
            {text: "Gobi", correct: false},
            {text: "Sahara", correct: true},
            {text: "Antartica", correct: false},
        ]
    },
    {
        question: "Which is fastest animal in the world",
        answers: [
            {text: "Cheetah", correct: true},
            {text: "Lion", correct: false},
            {text: "Leopard", correct: false},
            {text: "Panther", correct: false},
        ]
    },
    {
        question: "Which animal is the king of the jungle?",
        answers: [
            {text: "Tiger", correct: false},
            {text: "Panther", correct: false},
            {text: "Elephant", correct: false},
            {text: "Lion", correct: true},
        ]
    },
    {
        questions: "Which animal is omniorous",
        answers: [
            {text: "Lion", correct: false},
            {text: "Tiger", correct: false},
            {text: "Goat", correct: true},
            {text: "Frog", correct: false},
        ]
    }
]

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz()
{
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion()
{
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let quesionNumber = currentQuestionIndex + 1;
    questionElement.textContent = quesionNumber + '. ' + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.classList.add('btn');
        button.textContent = answer.text;
        answerButtons.appendChild(button);
        if(answer.correct) 
        {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click',selectAnswer);
    })
}

function resetState()
{
    nextButton.style.display = "none";
    while(answerButtons.firstChild)
    {
        answerButtons.removeChild(answerButtons.firstChild); 
    }
}

function selectAnswer(e)
{
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === 'true';
    if(isCorrect) 
    {
        selectedButton.classList.add('correct-button');
        score++;
    }
    else selectedButton.classList.add('wrong-button');

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === 'true')
        {
            button.classList.add('correct-button');
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
showQuestion();


function handleNextButton()
{
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length)
    {
        showQuestion();
    }
    else 
    {
        showScore();
    }
}

function showScore()
{
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.textContent = 'Play Again';
    nextButton.style.display = 'block';
}
nextButton.addEventListener('click', () => {
    if(currentQuestionIndex < questions.length)
    {
        handleNextButton();
    }
    else 
    {
        startQuiz();
    }
})

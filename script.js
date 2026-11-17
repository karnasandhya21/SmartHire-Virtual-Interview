let questions = {
    HR: [
        "Tell me about yourself?",
        "What are your strengths?",
        "Why should we hire you?"
    ],

    Python: [
        "What is Python?",
        "What are Python data types?",
        "What is a function?"
    ],

    Java: [
        "What is Java?",
        "What is inheritance?",
        "What is polymorphism?"
    ],

    AIML: [
        "What is Artificial Intelligence?",
        "What is Machine Learning?",
        "What is Deep Learning?"
    ]
};

let current = 0;
let selectedQuestions = [];

function startInterview() {
    let category = document.getElementById("category").value;

    selectedQuestions = questions[category];
    current = 0;

    document.getElementById("interview").style.display = "block";

    showQuestion();
}

function showQuestion() {
    document.getElementById("question").innerText =
        selectedQuestions[current];

    document.getElementById("answer").value = "";
}

function nextQuestion() {
    if (current < selectedQuestions.length - 1) {
        current++;
        showQuestion();
    } else {
        document.getElementById("question").innerText =
            "Interview Completed!";

        document.getElementById("answer").style.display = "none";
    }
}
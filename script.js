let questions = {
hr: ["Tell me about yourself?", "Why should we hire you?", "What are your strengths?", "Where do you see yourself in 5 years?", "Why do you want this job?"],
python: ["What is Python?", "What is list vs tuple?", "What is OOP in Python?", "What is lambda function?", "What is Django?"],
java: ["What is Java?", "What is OOP?", "Difference between ArrayList and LinkedList?", "What is Inheritance?", "What is Exception Handling?"],
aiml: ["What is AI?", "What is Machine Learning?", "What is Deep Learning?", "What is NLP?", "What is Neural Network?"]
};
let currentQ = 0; let score = 0; let selectedCat = "hr"; let timeLeft = 60; let timerInterval;

function startInterview(){
  let name = document.getElementById("studentName").value;
  if(name == ""){ alert("Please Enter Your Name"); return; }
  selectedCat = document.getElementById("category").value;
  document.getElementById("loginCard").classList.add("hidden");
  document.getElementById("quizCard").classList.remove("hidden");
  document.getElementById("welcomeUser").innerText = "Hi, " + name;
  showQuestion();
  startTimer();
}
function showQuestion(){
  document.getElementById("questionText").innerText = "Q" + (currentQ+1) + ": " + questions[selectedCat][currentQ];
  document.getElementById("answerInput").value = "";
  document.getElementById("feedback").innerText = "";
  setTimeout(speakQuestion, 500);
}
function nextQuestion(){
  let ans = document.getElementById("answerInput").value;
  if(ans.length > 5){ score++; document.getElementById("feedback").innerText = "Good Answer! +1"; }
  document.getElementById("scoreText").innerText = "Score: " + score;
  currentQ++;
  if(currentQ < 5){ showQuestion(); } else { finishInterview(); }
}
function startTimer(){
  timerInterval = setInterval(()=>{
    timeLeft--;
    document.getElementById("timer").innerText = "Time: " + timeLeft + "s";
    if(timeLeft <= 0){ finishInterview(); }
  }, 1000);
}
function finishInterview(){
  clearInterval(timerInterval);
  document.getElementById("quizCard").classList.add("hidden");
  document.getElementById("resultCard").classList.remove("hidden");
  document.getElementById("finalScore").innerText = score + " / 5";
  document.getElementById("finalMsg").innerText = score >= 4 ? "Excellent! You are Ready" : "Keep Practicing!";
}
function speakQuestion(){
  let q = document.getElementById("questionText").innerText;
  let speech = new SpeechSynthesisUtterance(q);
  speech.lang = "en-US";
  window.speechSynthesis.speak(speech);
}
function startVoice(){
  let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if(!SpeechRecognition){ alert("Chrome lo open chey"); return; }
  let recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  document.getElementById("voiceStatus").innerText = "Listening... Cheppu...";
  recognition.onresult = function(event){
    let voiceText = event.results[0][0].transcript;
    document.getElementById("answerInput").value = voiceText;
    document.getElementById("voiceStatus").innerText = "Nuvvu cheppindi: " + voiceText;
  };
  recognition.start();
}
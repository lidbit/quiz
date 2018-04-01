var questions = [];
var answers = [];
var progressValue = 0;
//corectanswers?
var currentQuestion = 0;
//var username = "";

//creating question objects
var question1 = {
    "id": "1",
    "type": "type1",
    "questionText": "How how many colours do dogs see?",
    "imageUrl": "images/dog2_color.jpg",
    "imageCaption": "caption",
    "answers": [{
        "choice": "Black and White",
        "correct": false
    },
    {
        "choice": "2 Colours",
        "correct": true
    },
    {
        "choice": "3 Colours",
        "correct": false
    },
    {
        "choice": "4 colours",
        "correct": false
    }
    ]
};

var question2 = {
    "id": "2",
    "type": "type1",
    "questionText": "The importance of colour. Which of these tomotoes are ripe?",
    "imageUrl": "images/tomato_black_600.jpg",
    "imageCaption": "caption",
    "answers": [{
        "choice": "drerf",
        "correct": false
    },
    {
        "choice": "crtvce",
        "correct": true
    },
    {
        "choice": " ntyrbdv",
        "correct": false
    },
    {
        "choice": " tbdfvds",
        "correct": false
    }
    ]
};


var question4 = {
    "id": "2",
    "type": "type2",
    "questionText": "What are three primary numbers?",
    imageUrl: "images/tomato_black_600.jpg",
    "answers": [{
        "imageUrl": "images/frog_image.jpg",
        "correct": false
    },
    {
        "imageUrl": "images/frog_image.jpg",
        "correct": true
    },
    ]
};

var question3 = {
    "id": "3",
    "type": "type3",
    "questionText": "What is the colour of the year 2018, according to the Pantone colour institute.",
    "imageUrl": "images/colour2018.jpg",
    "imageCaption": "caption",
    "answers": [{
        "imageUrl": "images/meadowlank2018.jpg",
        "correct": false
    },
    {
        "imageUrl": "images/littleboyblue2018.jpg",
        "correct": false
    },
    {
        "imageUrl": "images/cherry_tomato2018.jpg",
        "correct": false
    },
    {
        "imageUrl": "images/colour2018.jpg",
        "correct": true
    }
    ]
};

//putting question objects into questions array
questions.push(question1);
questions.push(question2);
questions.push(question3);
questions.push(question4);

var totalSteps = questions.length;
var stepSize = (1 / totalSteps) * 100;

//calling init function
$(document).ready(function () {
    init();
});

function updateProgress() {
    var progress = $("#progress-data");
    if (progressValue <= 100) {
        progressValue += stepSize;
        progress.width(progressValue + "%");
    }
}

function resetProgress() {
    var progress = $("#progress-data");
    progressValue = 0;
    progress.width(progressValue + "%");
}

function resetQuiz() {
    $("#nextQuestion > button").text("Next");
    $("#nextQuestion > button").click(moveNextQuestion);
    currentQuestion = 0;
    resetProgress();
}

//hiding all sections expect the scroll section
function hideAllSections() {
    $("#qtype1-section").hide();
    $("#qtype2-section").hide();
    $("#qtype3-section").hide();
    $("#results-section").hide();
    $("#hero-section").hide();
}

function hideQuestionbase() {
    $("#quiz-header").hide();
    $("#orientation").hide();
}

var moveNextQuestion = function() {
    if (currentQuestion < questions.length) {
        //$("#nextQuestion > button").text("Next >");
        loadQuestion(currentQuestion);
        currentQuestion++;
        updateProgress();
    } else {
        hideAllSections();
        $("#nextQuestion > button").text("Restart");
        $("#nextQuestion > button").click(function(){
            resetQuiz();
        });
        loadAnswers();
        $("#results-section").show();
        currentQuestion = 0;
        resetProgress()
    }

    //show how many questions been answered
    $("#orientation").show();
    updatestatusMessage(currentQuestion, questions.length)
    /*updateStatus();*/
};

//initialising document
function init() {
    $("#results-section").hide();  //results section or results page - need to decide
    $("#qtype1-section").hide();
    $("#qtype2-section").hide();
    $("#qtype3-section").hide();
    $("#quiz-header").hide();
    $("#orientation").hide();
    $("#results-page").hide();

    //when user clicks start quiz button hide all sections and load question
    $("#quiz-start").click(function () {
        hideAllSections();
        //username = $("#usernameinput").val();
        //$("#name").html(username);
        // $("#nameInput").hide();
        $("#quiz-start").hide();
        loadQuestion();
        $("#orientation").show();
        $("#quiz-header").show();
    });

    //when next button is clicked load next question, if test finished load answers 
    $("#nextQuestion > button").click(moveNextQuestion);
}
/*
function updateStatus() {
    $("#answeredQuestions").html(currentQuestion);
    $("#totalQuestions").html(questions.length);
}*/

function updatestatusMessage(answeredQs, totalQs) {
    var messagetext = "Answered " + answeredQs + " out of " + totalQs + " questions.";
    $("#status-message").html(messagetext);
}


// TODO
function loadAnswers() {
    for (let index = 0; index < answers.length; index++) {
        var ansElement = $("<div></div>").text(answers[index]);
        const element = answers[index];
        $("#results-page").append(ansElement);
    }
}

function loadQuestion(index) {
    if (typeof (index) === 'undefined' || index === null) {
        index = 0;
    }
    var question = questions[index];
    hideAllSections();
    /*question area is the same for all questions*/
    var questionText = $(".question-text");
    questionText.html(question.questionText);

    if (question.type === "type1") {

        var img = $("#qtype1Img");
        img.prop("src", question.imageUrl);

        var qOneButton1 = $("#question1button");
        var qOneButton2 = $("#question2button");
        var qOneButton3 = $("#question3button");
        var qOneButton4 = $("#question4button");
        qOneButton1.html(question.answers[0].choice);
        qOneButton1.attr("data-ans-val", question.answers[0].correct);
        qOneButton2.html(question.answers[1].choice);
        qOneButton2.attr("data-ans-val", question.answers[1].correct);
        qOneButton3.html(question.answers[2].choice);
        qOneButton3.attr("data-ans-val", question.answers[2].correct);
        qOneButton4.html(question.answers[3].choice);
        qOneButton4.attr("data-ans-val", question.answers[3].correct);

        qOneButton1.unbind("click");
        qOneButton2.unbind("click");
        qOneButton3.unbind("click");
        qOneButton4.unbind("click");

        qOneButton1.click(function () {
            checkAnswer(this);
        });
        qOneButton2.click(function () {
            checkAnswer(this);
        });
        qOneButton3.click(function () {
            checkAnswer(this);
        });
        qOneButton4.click(function () {
            checkAnswer(this);
        });

        $("#qtype1-section").show();
    } else if (question.type === "type2") {
        var img1 = $("#type2-img1");
        var img2 = $("#type2-img2");

        img1.prop("src", question.answers[0].imageUrl);
        img1.attr("data-ans-val", question.answers[0].correct);
        img2.prop("src", question.answers[1].imageUrl);
        img2.attr("data-ans-val", question.answers[1].correct);

        img1.unbind("click");
        img2.unbind("click");

        img1.click(function () {
            checkAnswer(this);
        });

        img2.click(function () {
            checkAnswer(this);
        });


        $("#qtype2-section").show();
    } else if (question.type === "type3") {
        $("#qtype3Img1").prop("src", question.answers[0].imageUrl);
        $("#qtype3Img1").attr("data-ans-val", question.answers[0].correct);
        $("#qtype3Img2").prop("src", question.answers[1].imageUrl);
        $("#qtype3Img2").attr("data-ans-val", question.answers[0].correct);
        $("#qtype3Img3").prop("src", question.answers[2].imageUrl);
        $("#qtype3Img3").attr("data-ans-val", question.answers[0].correct);
        $("#qtype3Img4").prop("src", question.answers[3].imageUrl);
        $("#qtype3Img4").attr("data-ans-val", question.answers[0].correct);

        $("#qtype3Img1").unbind("click");
        $("#qtype3Img2").unbind("click");
        $("#qtype3Img3").unbind("click");
        $("#qtype3Img4").unbind("click");

        $("#qtype3Img1").click(function () {
            checkAnswer(this);
        });
        $("#qtype3Img2").click(function () {
            checkAnswer(this);
        });
        $("#qtype3Img3").click(function () {
            checkAnswer(this);
        });
        $("#qtype3Img4").click(function () {
            checkAnswer(this);
        });

        $("#qtype3-section").show();
    }
}

// TODO
function checkAnswer(element) {
    var answerResult = $(element).attr("data-ans-val")
    console.log($(element).attr("data-ans-val"));
    if (answerResult) {
        answers.push(1);
    }
}
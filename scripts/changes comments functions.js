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
    "imageUrl": "images/dog_sees.jpg",
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


var question3 = {
    "id": "2",
    "type": "type2",
    "questionText": "What are three primary numbers?",
    imageUrl: "images/tomato_black_600.jpg",
    "answers": [{
        "imageUrl": "images/tomato_black_600.jpg",
        "correct": false
    },
    {
        "imageUrl": "images/frog_image.jpg",
        "correct": true
    },
    ]
};

var question4 = {
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

//progress bar related info
var totalSteps = questions.length;
var stepSize = (1 / totalSteps) * 100;

//calling init function
$(document).ready(function () {
    init();
});

//initialising document
function init() {
    $("#results-section").hide();  //results section or results page - need to decide
    $("#qtype1-section").hide();
    $("#qtype2-section").hide();
    $("#qtype3-section").hide();
    $("#quiz-header").hide();
    $("#orientation").hide();
    $("#results-page").hide();
    $("#answer-section").hide();

    //when user clicks start quiz button hide all sections and load question
    $("#quiz-start").click(function () {
        hideAllSections();
        $("#quiz-start").hide();
        $("#orientation").show();
        $("#quiz-header").show();
        loadQuestion();
    });

    //when next button is clicked load next question, if test finished load answers 
    $("#nextQuestion > button").click(moveNextQuestion);
}

/*checking if not at the end of quiz load question,
 if are at the end of quiz then change button to restart quiz
 and load answers
 */
var moveNextQuestion = function () {
    if (currentQuestion < questions.length) {
        currentQuestion++;
        updateProgress();
        //show how many questions been answered
        $("#orientation").show();
        updatestatusMessage(currentQuestion, questions.length)
        loadQuestion(currentQuestion);
    } else {
        hideAllSections();
        $("#nextQuestion > button").text("Restart");
        $("#nextQuestion > button").click(function () {
            resetQuiz();
        });
        loadAnswers();
        $("#results-section").show();
        currentQuestion = 0;
        resetProgress();
    }


};

/*
function updateStatus() {
    $("#answeredQuestions").html(currentQuestion);
    $("#totalQuestions").html(questions.length);
}*/

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
    //making sure the next button is set
    $("#nextQuestion > button").text("Next");
    //setting event listener
    $("#nextQuestion > button").click(moveNextQuestion);
    currentQuestion = 0;
    resetProgress();
}

//hiding all sections not needed for current question
function hideAllSections() {
    $("#qtype1-section").hide();
    $("#qtype2-section").hide();
    $("#qtype3-section").hide();
    $("#results-section").hide();
    $("#hero-section").hide();
    $("#answer-section").hide();
}



//orientaion info for user
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
    /*get question info from array*/
    var question = questions[index];
    hideAllSections();
    /*disable next button*//////////////////////////

    /*question area appears in all questions*/
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
        qOneButton1.attr("data-question-type", question.type);
        qOneButton2.html(question.answers[1].choice);
        qOneButton2.attr("data-ans-val", question.answers[1].correct);
        qOneButton2.attr("data-question-type", question.type);
        qOneButton3.html(question.answers[2].choice);
        qOneButton3.attr("data-ans-val", question.answers[2].correct);
        qOneButton3.attr("data-question-type", question.type);
        qOneButton4.html(question.answers[3].choice);
        qOneButton4.attr("data-ans-val", question.answers[3].correct);
        qOneButton4.attr("data-question-type", question.type);

        qOneButton1.unbind("click");
        qOneButton2.unbind("click");
        qOneButton3.unbind("click");
        qOneButton4.unbind("click");

        qOneButton1.click(function () {
            manageAnswer(question, element, type);
        });
        qOneButton2.click(function () {
            manageAnswer(question, element, type);
        });
        qOneButton3.click(function () {
            manageAnswer(question, element, type);
        });
        qOneButton4.click(function () {
            manageAnswer(question, element, type);
        });

        $("#qtype1-section").show();
    } else if (question.type === "type2") {
        var img1 = $("#type2-img1");
        var img2 = $("#type2-img2");

        img1.prop("src", question.answers[0].imageUrl);
        img1.attr("data-ans-val", question.answers[0].correct);
        img1.attr("data-question-type", question.type);
        img2.prop("src", question.answers[1].imageUrl);
        img2.attr("data-ans-val", question.answers[1].correct);
        img2.attr("data-question-type", question.type);

        img1.unbind("click");
        img2.unbind("click");

        img1.click(function () {
            manageAnswer(question, element, type);
        });

        img2.click(function () {
            manageAnswer(question, element, type);
        });


        ///////////////////////
        $("#qtype2-section").show();
    } else if (question.type === "type3") {

        for (var i = 0; i = question.length; i++) {
            setPropAttributeType3(question.answers[i].imageUrl, question.answers[i].correct, question.type);
        }
        /*
    $("#qtype3Img1").prop("src", question.answers[0].imageUrl);
    $("#qtype3Img1").attr("data-ans-val", question.answers[0].correct);
    $("#qtype3Img1").attr("data-question-type", question.type);
    $("#qtype3Img2").prop("src", question.answers[1].imageUrl);
    $("#qtype3Img2").attr("data-question-type", question.type);
    $("#qtype3Img2").attr("data-ans-val", question.answers[0].correct);
    $("#qtype3Img3").prop("src", question.answers[2].imageUrl);
    $("#qtype3Img3").attr("data-ans-val", question.answers[0].correct);
    $("#qtype3Img3").attr("data-question-type", question.type);
    $("#qtype3Img4").prop("src", question.answers[3].imageUrl);
    $("#qtype3Img4").attr("data-ans-val", question.answers[0].correct);
    $("#qtype3Img4").attr("data-question-type", question.type);*/

        $("#qtype3Img1").unbind("click");
        $("#qtype3Img2").unbind("click");
        $("#qtype3Img3").unbind("click");
        $("#qtype3Img4").unbind("click");

        $("#qtype3Img1").click(function () {
            manageAnswer(question, element);
        });
        $("#qtype3Img2").click(function () {
            manageAnswer(question, element);
        });
        $("#qtype3Img3").click(function () {
            manageAnswer(question, element);
        });
        $("#qtype3Img4").click(function () {
            manageAnswer(question, element);

        });

        $("#qtype3-section").show();
    }

    function manageAnswer(question, element) {
        checkAnswer(this);
        /*enable next button*//////////////////////////
        //disable image clicks
        //create answer section stuff
        //show answer section;
    }



    function nextButtonDisable(isdisable, element) {

        if (isdisable) {
            //disable the button
        }
        else {
            //enable the button
        }
    }

    function qtype1ButtonsDisable(elementName, isdisable) {
        if (isdisable) {
            //to disable
            $('elementName').attr('disabled', 'disabled');
            $('.actionButton').addClass('disabled');
        }
        else {
            //to enable
            $('.actionButton').removeAttr('disabled');
            $('.actionButton').addClass('disabled');
            $('.actionButton').removeClass('disabled');

            //or alternatively by using pointer events none

        }
    }

    function clickableImagesDisable(isdisable, qtype) {

        if (isdisable) {
            if (type = "type2") {

            }
            else {

            }
        }
        else {
            if (type = "type2") {

            }
            else {

            }
            //enable the image
        }
    }

}
/*  function setPropAttributeT3(imageUrl, isCorrect, qtype ){
           
       $("#qtype3Img1").prop("src", imageUrl);
       $("#qtype3Img1").attr("data-ans-val", isCorrect);
       $("#qtype3Img1").attr("data-question-type", qtype);
   }*/
/*
function loadQuestion(index) {
    if (typeof (index) === 'undefined' || index === null) {
        index = 0;
    }
    var question = questions[index];
    hideAllSections();
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
        qOneButton1.attr("data-question-type", question.type);
        qOneButton2.html(question.answers[1].choice);
        qOneButton2.attr("data-ans-val", question.answers[1].correct);
        qOneButton2.attr("data-question-type", question.type);
        qOneButton3.html(question.answers[2].choice);
        qOneButton3.attr("data-ans-val", question.answers[2].correct);
        qOneButton3.attr("data-question-type", question.type);
        qOneButton4.html(question.answers[3].choice);
        qOneButton4.attr("data-ans-val", question.answers[3].correct);
        qOneButton4.attr("data-question-type", question.type);

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
        img1.attr("data-question-type", question.type);
        img2.prop("src", question.answers[1].imageUrl);
        img2.attr("data-ans-val", question.answers[1].correct);
        img2.attr("data-question-type", question.type);

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
        $("#qtype3Img1").attr("data-question-type", question.type);
        $("#qtype3Img2").prop("src", question.answers[1].imageUrl);
        $("#qtype3Img2").attr("data-question-type", question.type);
        $("#qtype3Img2").attr("data-ans-val", question.answers[0].correct);
        $("#qtype3Img3").prop("src", question.answers[2].imageUrl);
        $("#qtype3Img3").attr("data-ans-val", question.answers[0].correct);
        $("#qtype3Img3").attr("data-question-type", question.type);
        $("#qtype3Img4").prop("src", question.answers[3].imageUrl);
        $("#qtype3Img4").attr("data-ans-val", question.answers[0].correct);
        $("#qtype3Img4").attr("data-question-type", question.type);

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
} */

// TODO
function checkAnswer(element) {
    var questionType = $(element).attr("data-question-type");
    var answerResult = $(element).attr("data-ans-val");

    var answerResult = $(element).attr("data-ans-val");
    var userChoice = $(element).text();
    console.log("You choose " + userChoice + "which is " + answerResult);

    var questions = $('[data-question-type="' + questionType + '"]');
    var correctAnswer = {};

    questions.each((i, v) => {
        console.log($(v).attr("data-ans-val"));
        if ($(v).attr("data-ans-val") === "true") {
            console.log("The correct answer is " + $(v).text());
        }
    });

    if (answerResult) {
        answers.push(1);
    }
}
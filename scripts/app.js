var questions = [];
var answers = [];
var currentQuestion = 0;
var username = "";

var question1 = {
    "id": "1",
    "type": "type1",
    "questionValue": "What are three primary numbers?",
    "imageUrl": "/images/image1.png",
    "imageCaption": "caption",
    "answers": [{
            "choice": "7 colours",
            "correct": false
        },
        {
            "choice": "3 colours",
            "correct": true
        },
        {
            "choice": "2 colours",
            "correct": false
        },
        {
            "choice": "11 colours",
            "correct": false
        }
    ]
};

var question2 = {
    "id": "2",
    "type": "type2",
    "questionValue": "What are three primary numbers?",
    "imageUrl": "/images/image2.pngg",
    "imageCaption": "caption",
};

var question3 = {
    "id": "3",
    "type": "type3",
    "imageUrl": "/images/image3.png",
    "imageCaption": "caption",
    "answers": [{
            "imageUrl": "/images/image1.png",
            "correct": false
        },
        {
            "imageUrl": "/images/image2.png",
            "correct": true
        },
        {
            "imageUrl": "/images/image3.png",
            "correct": false
        },
        {
            "imageUrl": "/images/image4.png",
            "correct": false
        }
    ]
};


questions.push(question1);
questions.push(question2);
questions.push(question3);

$(document).ready(function() {
    console.log("loaded");
    init();
});

function hideAllSections() {
    $("#qtype1-section").hide();
    $("#qtype2-section").hide();
    $("#qtype3-section").hide();
    $("#results-section").hide();
}

function init() {
    $("#statubar").hide();
    $("#results-section").hide();
    $("#qtype1-section").hide();
    $("#qtype2-section").hide();
    $("#qtype3-section").hide();
    $("#nextQuestion").hide();

    $("#startQuiz").click(function() {
        hideAllSections();
        username = $("#usernameinput").val();
        $("#name").html(username);
        $("#nameInput").hide();
        $("#startQuiz").hide();
        loadQuestion();
        $("#nextQuestion").show();
    });

    $("#nextQuestion").click(function() {
        if (currentQuestion < questions.length) {
            $("#nextQuestion").html("Next");
            loadQuestion(currentQuestion);
            currentQuestion++;
        } else {
            hideAllSections();
            $("#nextQuestion").html("Restart");
            loadAnswers();
            $("#results-section").show();
            currentQuestion = 0;
        }

        $("#statubar").show();
        updateStatus();
    });
}

function updateStatus() {
    $("#answeredQuestions").html(currentQuestion);
    $("#totalQuestions").html(questions.length);
}

// TODO
function loadAnswers() {
    for (let index = 0; index < answers.length; index++) {
        var ansElement = $("<div></div>").text(answers[index]);
        const element = answers[index];
        $("#results-page").append(ansElement);
    }
}

function appendTextExample() {
    var txt1 = "<p>Text.</p>"; // Create element with HTML  
    var txt2 = $("<p></p>").text("Text."); // Create with jQuery
    var txt3 = document.createElement("p"); // Create with DOM
    txt3.innerHTML = "Text.";
    $("body").append(txt1, txt2, txt3); // Append the new elements 
}

function loadQuestion(index) {
    if (typeof(index) === 'undefined' || index === null) {
        index = 0;
    }
    var question = questions[index];

    if (question.type === "type1") {
        // update div values and show div

        var questionText = $("#type1-question");
        questionText.html(question.questionValue);
        var img = $("#qtype1Img");
        img.prop("src", question.imageUrl);

        var qOneButton1 = $("#question1button");
        var qOneButton2 = $("#question2button");
        var qOneButton3 = $("#question3button");
        var qOneButton4 = $("#question4button");
        qOneButton1.html(question.answers[0].choice);
        qOneButton2.html(question.answers[1].choice);
        qOneButton3.html(question.answers[2].choice);
        qOneButton4.html(question.answers[3].choice);

        qOneButton1.unbind("click");
        qOneButton2.unbind("click");
        qOneButton3.unbind("click");
        qOneButton4.unbind("click");

        qOneButton1.click(function() {
            checkAnswer(this);
        });
        qOneButton2.click(function() {
            checkAnswer(this);
        });
        qOneButton3.click(function() {
            checkAnswer(this);
        });
        qOneButton4.click(function() {
            checkAnswer(this);
        });

        $("#qtype1-section").show();
    } else if (question.type === "type2") {
        $("#qtype1-section").hide();

        console.log("qtype2-section");

        $("#qtype2-section").show();
    } else if (question.type === "type3") {
        $("#qtype2-section").hide();

        $("#qtype3Img1").prop("src", question.answers[0].imageUrl);
        $("#qtype3Img2").prop("src", question.answers[1].imageUrl);
        $("#qtype3Img3").prop("src", question.answers[2].imageUrl);
        $("#qtype3Img4").prop("src", question.answers[3].imageUrl);

        $("#qtype3Img1").unbind("click");
        $("#qtype3Img2").unbind("click");
        $("#qtype3Img3").unbind("click");
        $("#qtype3Img4").unbind("click");

        $("#qtype3Img1").click(function() {
            checkAnswer(this);
        });
        $("#qtype3Img2").click(function() {
            checkAnswer(this);
        });
        $("#qtype3Img3").click(function() {
            checkAnswer(this);
        });
        $("#qtype3Img4").click(function() {
            checkAnswer(this);
        });

        $("#qtype3-section").show();
    }
    console.log(question);
}

// TODO
function checkAnswer(element) {
    $(element).attr("data-ans-val", true);
    console.log($(element).attr("data-ans-val"));
    answers.push($(element).attr("data-ans-val"));
}
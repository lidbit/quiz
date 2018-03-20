var questions = [];
var currentQuestion = 0;

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
    "imageCaption": "caption"
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
}

function init() {
    $("#statubar").hide();
    $("#results-section").hide();
    $("#qtype1-section").hide();
    $("#qtype2-section").hide();
    $("#qtype3-section").hide();

    $("#nextQuestion").click(function() {
        console.log(currentQuestion);
        if (currentQuestion < questions.length) {
            $("#nextQuestion").html("Next");
            loadQuestion(currentQuestion);
            currentQuestion++;
        } else {
            hideAllSections();
            $("#nextQuestion").html("Restart");
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

function loadQuestion(index) {
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
        console.log(question.answers);
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



        $("#qtype3-section").show();
    }
    console.log(question);
}

function checkAnswer(element) {
    console.log(element);
}
var questions = [];
var answers = [];
var currentQuestion = 0;
var username = "";

var question1 = {
    "id": "1",
    "type": "type1",
    "questionText": "What are three primary numbers?",
    "imageUrl": "images/image1.png",
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
    "questionText": "What are three primary numbers?",
    "answers": [{
            "imageUrl": "images/image3.png",
            "correct": false

        },
        {
            "imageUrl": "images/image4.png",
            "correct": true
        },
    ]
};

var question3 = {
    "id": "3",
    "type": "type3",
    "questionText": "What are three primary numbers?",
    "imageUrl": "images/image3.png",
    "imageCaption": "caption",
    "answers": [{
            "imageUrl": "images/image1.png",
            "correct": false
        },
        {
            "imageUrl": "images/image2.png",
            "correct": true
        },
        {
            "imageUrl": "images/image3.png",
            "correct": false
        },
        {
            "imageUrl": "images/image4.png",
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
        questionText.html(question.questionText);
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

        var img1 = $("#type2-img1");
        var img2 = $("#type2-img2");

        img1.prop("src", question.answers[0].imageUrl);
        img2.prop("src", question.answers[1].imageUrl);

        img1.unbind("click");
        img2.unbind("click");

        img1.click(function() {
            console.log("img1 clicked");
        });

        img2.click(function() {
            console.log("img2 clicked");
        });

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


////////////////////////////////// EDITOR ONLY ///////////////////////////////////////

function editor_load() {
    var newAnswers = [];
    var editor = $("#editor");
    dragElement($(editor)[0]);
    $("#editor_close").click(function() {
        editor.hide();
    });

    $("#editor_save").click(function() {
        addQuestion();
    });

    $("#add_answer").click(function() {
        var row = $("<div class='row'></div>");
        var col1 = $("<div class='col-3'></div>");
        var col2 = $("<div class='col-1'></div>");

        var newchoice = $("<input id='newchoice' type='text'></input>").text("");
        var newChoiceCorrect = $("<input id='newChoiceCorrect' type='checkbox'></input>");
        var newChoiceAdd = $("<button>+</button>");

        $("#answers").append(row, col1, newchoice, newChoiceCorrect, col2, newChoiceAdd);
        newChoiceAdd.click(function() {
            newAnswers.push({
                "choice": $("#newchoice").val(),
                "correct": $("#newChoiceCorrect").is(":checked")
            });
            $("#answers").empty();
            console.log(newAnswers);
        });
    });

    function addQuestion() {
        var newQId = $("#newqId").val();
        var newQType = $("select#newqType option:checked").val();
        var newQText = $("#newqText").val();

        // TODO: answers
        console.log(newAnswers);
        var newQuestion = {
            "id": newQId,
            "type": newQType,
            "questionText": newQText,
            "answers": newAnswers
        };
        questions.push(newQuestion);

        $("#newqId").val("");
        $("select#newqType option:checked").prop("selected", false)
        $("#newqText").val("");
    }

    editor.show();
}

function dragElement(elmnt) {
    console.log(elmnt);
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
var questions = [];
var currentQuestion = 0;

var question1 = {
    "id": "1",
    "type": "type1",
    "imageUrl": "/images/1.png",
    "imageCaption": "caption"
};

var question2 = {
    "id": "1",
    "type": "type2",
    "imageUrl": "/images/1.png",
    "imageCaption": "caption"
};

var question3 = {
    "id": "1",
    "type": "type3",
    "imageUrl": "/images/1.png",
    "imageCaption": "caption"
};


questions.push(question1);
questions.push(question2);
questions.push(question3);

$(document).ready(function() {
    console.log("loaded");
    init();
});

function init() {

    $("#nextQuestion").click(function() {
        loadQuestion(currentQuestion);
        currentQuestion++;
    });
    // get divs
    $("#results-section").hide();
    $("#qtype2-section").hide();
    $("#qtype3-section").hide();
}

function loadQuestion(index) {
    var question = questions[index];
    console.log(question);
}
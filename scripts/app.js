var questions = [];

var question1 = {
    "id": "1",
    "type": "image",
    "imageUrl": "/images/1.png",
    "imageCaption": "caption"
};

var question2 = {
    "id": "1",
    "type": "image",
    "imageUrl": "/images/1.png",
    "imageCaption": "caption"
};

var question3 = {
    "id": "1",
    "type": "image",
    "imageUrl": "/images/1.png",
    "imageCaption": "caption"
};

var question4 = {
    "id": "1",
    "type": "image",
    "imageUrl": "/images/1.png",
    "imageCaption": "caption"
};

questions.push(question1);
questions.push(question2);
questions.push(question3);
questions.push(question4);

$(document).ready(function() {
    console.log("loaded");
    init();
});

function init() {
    // get divs
    var divs = $("#results-section").hide();
}
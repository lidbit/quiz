/* Colour quiz created by Lydia Douglas 2018 */
/* This quiz has been created to be extendable in the future*/
/* The questions are stored as an array of objects which contain 
the question and answers and the type of question and layout supporting info.*/
/* currently these questions are coded but could in future come from a database*/
/*  These are 3 types of questions:
    Type 1  = has an image, question and 4 buttons(number of buttons could change if neded)
    Type 2 = has two clickable images and question text
    Type 3 = has 4 clickable images and question text )
*/


/*** declare global variables **/
var questions = [];
var answers = [];
var progressValue = 0;
var correctAnswers = 0;
var currentQuestion = 0;

//creating question objects

var question1 = {
    "id": "1",
    "type": "type2",
    "questionText": "Click on the image that shows bioluminescence.",
    "answerImageUrl": "images/jellyfish_400.jpg",
    "answerText": "Jellyfish - Bioluminescent <br>This occurs due to chemical reaction in the body of a creature. No UV light needed to glow.<br>The rock is Fluorescent <br>This occurs due to physical reaction. The UV light makes the rock glow.",
    "answers": [{
            "imageUrl": "images/jellyfish_400.jpg",
            "correct": true
        },
        {
            "imageUrl": "images/rock_400.jpg",
            "correct": false
        },
    ]
};

var question6 = {
    "id": "6",
    "type": "type2",
    "questionText": "Which of these colour schemes is Analogous?",
    "answerImageUrl": "images/Analogous_C_scheme.jpg",
    "answerText": "This is Analogous(similar hue).<br>The other one is Monochromatic Scheme.(same hue different shades, tones and tints.) ",
    "answers": [{
            "imageUrl": "images/Monochromatic_C_scheme.jpg",
            "correct": false
        },
        {
            "imageUrl": "images/Analogous_C_scheme.jpg",
            "correct": true
        },
    ]
};

var question2 = {
    "id": "2",
    "type": "type1",
    "questionText": "The importance of colour. Which of these tomatoes are ripe?",
    "imageUrl": "images/tomatoes_black_800.jpg",
    "answerImageUrl": "images/tomatoes_color_800.jpg",
    "answerText": "The following combination is correct: A B E",
    "imageCaption": "caption",
    "answers": [{
            "choice": " B D E ",
            "correct": false
        },
        {
            "choice": " C E F ",
            "correct": false
        },
        {
            "choice": " A C D ",
            "correct": false
        },
        {
            "choice": " A B E ",
            "correct": true
        }
    ]
};

var question3 = {
    "id": "3",
    "type": "type3",
    "questionText": "What is the colour of the year 2018, according to the Pantone colour institute?<br><br>Ever noticed how everyone seems to start wearing pink all of a sudden?<br> or Salmon pink/grey websites start poping up like mushrooms after the rain?",
    "imageUrl": "images/colour2018.jpg",
    "answerImageUrl": "images/colour2018.jpg",
    "answerText": "Ultraviolet 2018!<br>Watch how suddenly lilacs and purples will appear in the media and shops. Honestly!",
    "imageCaption": "caption",
    "answers": [{
            "imageUrl": "images/colour2018.jpg",
            "correct": true
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
            "imageUrl": "images/meadowlank2018.jpg",
            "correct": false
        }
    ]
};

var question4 = {
    "id": "4",
    "type": "type1",
    "questionText": "How many colours can dogs see?",
    "imageUrl": "images/dog800_350.jpg",
    "answerImageUrl": "images/dog800_350_dog_vision.png",
    "answerText": "The dog can only see 2 colors: Yellow and Blue.<br>Mostly likely the dog will see this.",
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

var question5 = {
    "id": "5",
    "type": "type1",
    "questionText": "How many colours make the bar in the middle?",
    "imageUrl": "images/contrastExperiment800_q.jpg",
    "answerImageUrl": "images/contrastExperiment800_a.jpg",
    "answerText": "It is the same colour! Ahhh the power of contrast...",
    "imageCaption": "caption",
    "answers": [{
            "choice": " 1 colours ",
            "correct": true
        },
        {
            "choice": " 2 colours ",
            "correct": false
        },
        {
            "choice": " 3 colours ",
            "correct": false
        },
        {
            "choice": " 4 colours ",
            "correct": false
        }
    ]
};


//putting question objects into questions array
questions.push(question1);
questions.push(question2);
questions.push(question3);
questions.push(question4);
questions.push(question5);
questions.push(question6);

//progress bar related info
var totalSteps = questions.length;
var stepSize = (1 / totalSteps) * 100;

//calling init function
$(document).ready(function() {
    init();
});

//initialising document
function init() {
    $("#results-section").hide(); //results section or results page - need to decide
    $("#qtype1-section").hide();
    $("#qtype2-section").hide();
    $("#qtype3-section").hide();
    $("#quiz-header").hide();
    $("#orientation").hide();
    $("#results-page").hide();
    disableNextButton();

    //when user clicks start quiz button hide all sections and load question
    $("#quiz-start").click(function() {
        hideAllSections();
        $("#quiz-start").hide();
        loadQuestion();
        $("#orientation").show();
        $("#quiz-header").show();
        $("footer").show();
    });

    //when next button is clicked load next question, if test finished load answers 
    $(".nextQuestion > button").click(moveNextQuestion);
    /*$("#quiz-header").click(resetQuiz);*/

}

//updating the progress bar data
function updateProgress() {
    var progress = $(".progress-data");
    if (progressValue <= 100) {
        progressValue += stepSize;
        progress.width(progressValue + "%");
    }
}

//resetting progress bar to empty
function resetProgress() {
    var progress = $(".progress-data");
    progressValue = 0;
    progress.width(progressValue + "%");
}

/*can use this code later is decide that take quiz again should be a button
and reset quiz rather than go to homepage
function resetQuiz() {
    //setting event listener
    $(".nextQuestion > button").click(moveNextQuestion);
    currentQuestion = 0;
    resetProgress();
    enableNextButton();
}*/

//hiding all sections not needed for current question
function hideAllSections() {
    $("#qtype1-section").hide();
    $("#qtype2-section").hide();
    $("#qtype3-section").hide();
    $("#results-section").hide();
    $("#hero-section").hide();
}

//enabling the next button when question has been answered
function enableNextButton() {
    $(".nextQuestion > button").prop("disabled", false);
}

//disabling the next button when question has been answered
function disableNextButton() {
    $(".nextQuestion > button").prop("disabled", true);
}

/*checking if not at the end of quiz load question,
 if are at the end of quiz then change button to restart quiz
 and load answers
 */
var moveNextQuestion = function() {
    currentQuestion++;
    updateProgress();
    //checking if at end of quiz load qs or show results
    if (currentQuestion < questions.length) {
        loadQuestion(currentQuestion);
    } else {
        //hide everything related to quiz and show results
        hideAllSections();
        $(".nextQuestion > button").hide();
        $(".progress").hide();
        hideResultImages();
        //set score message
        $("#score").html(correctAnswers + " out of " + questions.length + ": " + answerToPercent() + " %");
        //decide which image and encouraging message to show and set it
        var scorePercent = answerToPercent();
        if (scorePercent < 50) {
            $("#tryagain_image").show();
            $("#results-text").html("No need to be blue! <br>Click the link below to try again.");
        } else if (scorePercent >= 50 && scorePercent < 75) {
            $("#welldone_image").show();
            $("#results-text").html("Well done! Keep exploring!<br> May the colour be with you!");
        } else if (scorePercent >= 75) {
            $("#brilliant_image").show();
            $("#results-text").html("You are brilliant! Celebrate!");
        }
        //show results section with all info pre set
        $("#results-section").show();
        currentQuestion = 0;

    }
};

//hiding all three result images
function hideResultImages(){
    $("#tryagain_image").hide();
    $("#welldone_image").hide();
    $("#brilliant_image").hide();
}

//getting the question data and loading it into question card
function loadQuestion(index) {
    //if no more questions do nothing
    if (currentQuestion >= questions.length) {
        return;
    }

    //disable and hide next button
    disableNextButton();
    $(".nextQuestion").hide();
    if (typeof(index) === 'undefined' || index === null) {
        index = 0;
    }

    //make sure no sectins showing
    hideAllSections();

    //get current question and set question related data
    var question = questions[index];
    initQuestion(question);
}

//get data from question object and put it into question card
function initQuestion(question) {
    var questionText = $(".question-text");
    var questionButtons = $('[data-question-type="' + question.type + '"]');
    questionButtons.each((i, v) => {
        $(v).prop("disabled", false);
    });
    //set question related data depending on question type
    if (question.type === "type1") {
        initQuestionType1(question, questionText);
        $("#qtype1-section").show();
    } else if (question.type === "type2") {
        initQuestionType2(question, questionText);
        $("#qtype2-section").show();
    } else if (question.type === "type3") {
        initQuestionType3(question, questionText);
        $("#qtype3-section").show();
    }
}
/* setting information related to type1 question. 
In future implementation this would be broken down into related functions
*/
function initQuestionType1(question, questionText) {

    questionText.html(question.questionText);
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

    //show question buttons
    $("#button-group").show();

    qOneButton1.click(function() {
        checkAnswer(this);
        enableNextButton();
        $("#button-group").hide();
        img.prop("src", question.answerImageUrl);
        questionText.html(question.answerText);

    });
    qOneButton2.click(function() {
        checkAnswer(this);
        enableNextButton();
        $("#button-group").hide();
        img.prop("src", question.answerImageUrl);
        questionText.html(question.answerText);
    });
    qOneButton3.click(function() {
        checkAnswer(this);
        enableNextButton();
        $("#button-group").hide();
        img.prop("src", question.answerImageUrl);
        questionText.html(question.answerText);
    });
    qOneButton4.click(function() {
        checkAnswer(this);
        enableNextButton();
        $("#button-group").hide();
        img.prop("src", question.answerImageUrl);
        questionText.html(question.answerText);
    });
}


/* setting information related to type2 question. 
In future implementation this would be broken down into related functions
*/
function initQuestionType2(question, questionText) {
    questionText.html(question.questionText);
    var img1 = $("#type2-img1");
    var img2 = $("#type2-img2");

    img1.prop("src", question.answers[0].imageUrl);
    img1.attr("data-ans-val", question.answers[0].correct);
    img1.attr("data-question-type", question.type);
    img2.prop("src", question.answers[1].imageUrl);
    img2.attr("data-ans-val", question.answers[1].correct);
    img2.attr("data-question-type", question.type);

    var imageQuestions = $('img[data-question-type="' + question.type + '"]');
    imageQuestions.each((i, v) => {
        var imageWrapper = $(v).parent();
        $(imageWrapper).removeClass("disabled");
        $(v).removeClass("disabled");
    });

    img1.unbind("click");
    img2.unbind("click");

    img1.click(function() {
        checkAnswer(this);
        enableNextButton();
        img1.prop("src", question.answerImageUrl);
        img2.prop("src", question.answerImageUrl);
        questionText.html(question.answerText);
    });

    img2.click(function() {
        checkAnswer(this);
        enableNextButton();
        img2.prop("src", question.answerImageUrl);
        img1.prop("src", question.answerImageUrl);
        questionText.html(question.answerText);
    });
}

/* setting information related to type1 question. 
In future implementation this would be broken down into related functions
*/
function initQuestionType3(question, questionText) {
    questionText.html(question.questionText);
    $("#qtype3Img1").prop("src", question.answers[0].imageUrl);
    $("#qtype3Img1").attr("data-ans-val", question.answers[0].correct);
    $("#qtype3Img1").attr("data-question-type", question.type);
    $("#qtype3Img2").prop("src", question.answers[1].imageUrl);
    $("#qtype3Img2").attr("data-question-type", question.type);
    $("#qtype3Img2").attr("data-ans-val", question.answers[1].correct);
    $("#qtype3Img3").prop("src", question.answers[2].imageUrl);
    $("#qtype3Img3").attr("data-ans-val", question.answers[2].correct);
    $("#qtype3Img3").attr("data-question-type", question.type);
    $("#qtype3Img4").prop("src", question.answers[3].imageUrl);
    $("#qtype3Img4").attr("data-ans-val", question.answers[3].correct);
    $("#qtype3Img4").attr("data-question-type", question.type);

    $("#qtype3Img1").unbind("click");
    $("#qtype3Img2").unbind("click");
    $("#qtype3Img3").unbind("click");
    $("#qtype3Img4").unbind("click");

    $("#qtype3Img1").click(function() {
        checkAnswer(this);
        enableNextButton();
        setT3Answer(question);
    });
    $("#qtype3Img2").click(function() {
        checkAnswer(this);
        enableNextButton();
        setT3Answer(question);
    });
    $("#qtype3Img3").click(function() {
        checkAnswer(this);
        enableNextButton();
        setT3Answer(question);
    });
    $("#qtype3Img4").click(function() {
        checkAnswer(this);
        enableNextButton();
        setT3Answer(question);
    });
}

//setting all images to answer image and setting answer text
function setT3Answer(question){
    $("#qtype3Img1").prop("src", question.answerImageUrl);
    $("#qtype3Img2").prop("src", question.answerImageUrl);
    $("#qtype3Img3").prop("src", question.answerImageUrl);
    $("#qtype3Img4").prop("src", question.answerImageUrl);
    questionText.html(question.answerText);
}


function checkAnswer(element) {
    console.log(element);

    var parent = $(element).parent().parent();
    var questionType = $(element).attr("data-question-type");
    var answerResult = $(element).attr("data-ans-val");

    if (answerResult == "true") {
        correctAnswers++;
    }

    if ($(element).is('img')) {
        console.log("its an image");
        var imageParent = $(element).parent().parent();

        var imageQuestions = $(imageParent).find('img[data-question-type="' + questionType + '"]');
        imageQuestions.each((i, v) => {
            var imageWrapper = $(v).parent();
            $(imageWrapper).addClass("disabled");
            $(v).addClass("disabled");
        });
    }

    if ($(element).is('button')) {
        var questions = $(parent).find('[data-question-type="' + questionType + '"]');

        questions.each((i, v) => {
            $(v).prop("disabled", true);
            if ($(v).attr("data-ans-val") === "true") {
                console.log("The correct answer is " + $(v).text());
            }
        });
    }
    $(".nextQuestion").show();
}

function answerToPercent() {
    var percent = (correctAnswers / questions.length) * 100;
    return Math.round(percent);
}






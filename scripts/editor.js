////////////////////////////////// EDITOR ONLY ///////////////////////////////////////
$(document).ready(function() {

    setTimeout(
        function() {
            $(".frog").removeClass("showing");
        }, 5000);

    $(".frog").click(function() {
        console.log("frog clicked");
    })
});

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
        var col1 = $("<div class='col-1'></div>");
        var col2 = $("<div class='col-3'></div>");

        var newchoice = $("<input id='newchoice' type='text'></input>").text("");
        var newChoiceCorrect = $("<input id='newChoiceCorrect' type='checkbox'></input>");
        var newChoiceAdd = $("<button>+</button>");

        col2.append(newChoiceAdd, newchoice, newChoiceCorrect);
        var newRow = row.append(col2);

        $("#answers_edit").append(newRow);

        newChoiceAdd.click(function() {
            newAnswers.push({
                "choice": $("#newchoice").val(),
                "correct": $("#newChoiceCorrect").is(":checked")
            });
            $("#answers").append($("#newchoice").val(), " ", $("#newChoiceCorrect").is(":checked"), "<br />");
            $("#answers_edit").empty();
        });
    });

    function addQuestion() {
        var newQId = $("#newqId").val();
        var newQType = $("select#newqType option:checked").val();
        var newQText = $("#newqText").val();

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
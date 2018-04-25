
var items = [];
var count = 0;
var plainVal = [];
var answersCount = 0;
var randomTarget = 10;
var answersContainer = [];

function InitialLoad(string) {
    $.getJSON(string, function (data) {
        // plainVal = data;
        var randomQuestions = getRandomQuestions(randomTarget, data);

        $.each(randomQuestions, function (key, val) {
            plainVal.push(val);
            var mainDiv = populateHtml(val);
            items.push(mainDiv);
        });

        items[count].appendTo(".green");
    });
}



function populateHtml(val) {

    var mainDiv = $("<div/>", {
        "class": "col-12"
    });
    var innerDiv = $("<div/>", {
        "class": "row"
    }).appendTo(mainDiv);

    var h3 = $("<h3/>", {
        "class": "questions-heading",
        "html": val.question
    }).appendTo(innerDiv);

    for (var i = 0; i < val.options.length; i += 1) {
        var optionDiv = $("<div/>", {
            class: 'col-12'
        }).appendTo(innerDiv);
        if (val.radio) {
            var radio = $("<input/>").attr({
                type: 'radio', name: 'mydata', class: 'mydata radio-gap', value: i, id: i
            }).appendTo(optionDiv);
        }
        else {
            var radio = $("<input/>").attr({
                type: 'checkbox', class: 'mydata radio-gap', value: i, id: i
            }).appendTo(optionDiv);
        }
        var span = $("<div/>", {
            "html": val.options[i], class: 'answer-options'
        }).appendTo(optionDiv);

        var br = $("</br>").appendTo(span);
    }
    return mainDiv
}

function getRandomQuestions(randomTarget, data) {

    var randomArr = [];
    if (randomTarget != 0) {
        for (var y = 0; y < randomTarget; y += 1) {
            var randNumber = Math.floor(Math.random() * data.length);
            var randQuestion = data[randNumber];

            var found = false;
            if (y == 0) {
                randomArr.push(randQuestion);
                continue;
            }

            for (var z = 0; z < randomArr.length; z += 1) {
                if (randQuestion.id === randomArr[z].id) {
                    found = true;
                    y--;
                    break;
                }
            }
            if (!found) {
                randomArr.push(randQuestion);
                found = false;
            }

        }
    }
   // console.log(randomArr);
    return randomArr;
};

$("#submit").click(function () {
    checkRightVal(count);
});

$("#next").click(function () {

    count++;
    $("#progress").html(count + 1 + " of " + randomTarget);
    $(".green").html('');
    $("<div/>", {
        html: items[count]
    }).appendTo(".green");

    $("#submit").removeClass("d-none");
    $("#next").addClass("d-none");
    $("#answer").html("");

    if (items.length === count) {
        var passResult = 0.7; //this is 70%
        var finalResult = passResult * items.length;

        $("#submit").addClass("d-none");
        $("#next").html("d-none");
        // $(".green").addClass("hidden");
        $("#answer").addClass("d-none");
        // alert(answersCount);
        $("#progress").html("<h4>You need 70% to pass the test.</h4> <h4>Your Score is " + answersCount + " of " + randomTarget+"</h4>");
        if (answersCount >= finalResult) {
            //$("<div/>", {
            //    "class": "col-xs-12 lightgreen",
            //    html: "You have passed",
            //    style:""
            //}).appendTo(".green");
            $(".green").html("<h2>Congratulations!<h2><h3>You have passed.</h3>")
                .css({"background-color":"green","text-align":"center","color":"white"});
        }
        else {
            $(".green").html("<h2>YOU HAVE FAILED!<h2>")
                .css({"background-color":"red","text-align":"center"});
            //$("<div/>", {
            //    "class": "col-xs-12 red",
            //    html: "You have NOT passed"
            //}).appendTo(".green");
        }
    }
});

jQuery.fn.extend({
    animateAnswer: function () {
        this
            .fadeIn(500).animate({
                left: '5%',
                opacity: '0.7'
            }).animate({
                left: '25%',
                opacity: '1'
            }).fadeOut(2300);

        return this;
    }
});

function checkRightVal(count) {
    var answers = $(".mydata:checked");
    // var x = $("input:radio[name=mydata]:checked");
    if (plainVal[count].radio && (answers.length === 1)) {

        var myAnswer = parseInt(answers.attr("id"));
        var defaultAnswer = plainVal[count].answer;


        if (defaultAnswer === myAnswer) {
            $("#answer").text("Success").addClass("lightgreen")
                .animateAnswer()
                .removeClass("red");
            $(".answer-options:eq("+myAnswer+")").css("border","3px solid green");
            answersCount++;
        }
        else {
            $("#answer").text("Incorect").addClass("red")
                .animateAnswer()
                .removeClass('lightgreen');
            $(".answer-options:eq("+myAnswer+")").css("border","3px solid red");
            $(".answer-options:eq("+defaultAnswer+")").css("background-color","lightgreen");
        }
        $("#submit").addClass("d-none");
        $("#next").removeClass("d-none");
        $(".radio-gap").attr("disabled",true);

    }
    else if (!plainVal[count].radio  && (answers.length > 1)) {

        var userAnswers = [];
        var countCheckBoxAnswers = 0;
        var defaultAnswer = plainVal[count].answer;

        var defaultAnswerLength = plainVal[count].answer.length;

        for (var i = 0; i < answers.length; i += 1) {
            var checkboxValue = answers[i].id;
            userAnswers.push(checkboxValue);
        }

        for(var t = 0; t < defaultAnswerLength; t+=1){

            if(defaultAnswerLength == userAnswers.length){

                if(defaultAnswer[t] == userAnswers[t]){
                    countCheckBoxAnswers++;
                    if(countCheckBoxAnswers == defaultAnswerLength){

                        $("#answer").text("Success").addClass("lightgreen")
                                .animateAnswer()
                                .removeClass("red");
                            for(var m = 0; m < userAnswers.length; m++){
                                $(".answer-options:eq("+userAnswers[m]+")").css("border","3px solid green");
                            }
                        answersCount++;
                    }
                }
                else{

                    for(var j = 0; j < plainVal.length; j++){
                        $(".answer-options:eq("+j+")").css("background-color","red");
                    }
                    for(var j = 0; j < userAnswers.length; j++){
                        $(".answer-options:eq("+defaultAnswer[j]+")").css("background-color","lightgreen");
                    }
                    $("#answer").text("Incorect").addClass("red")
                        .animateAnswer()
                        .removeClass('lightgreen');
                    break;
                }
            }
            else {
                console.log("evry selected")
                console.log(plainVal)
                for(var q = 0; q <= plainVal.length; q++){
                    $(".answer-options:eq("+q+")").css("background-color","red");

                }
                for(var q = 0; q < defaultAnswerLength; q++){

                    $(".answer-options:eq("+defaultAnswer[q]+")").css("background-color","lightgreen");
                }
                $("#answer").text("Incorect").addClass("red")
                    .animateAnswer()
                    .removeClass('lightgreen');
                break;
            }

        }


        $("#submit").addClass("d-none");
        $("#next").removeClass("d-none");
        $(".radio-gap").attr("disabled",true);
    }

    else {
        $("#answer").text("You must enter a value!").addClass("red")
            .fadeIn(500)
            .fadeOut(2300)
            .removeClass('lightgreen');
    }
}
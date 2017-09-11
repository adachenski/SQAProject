
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
        "class": "col-xs-12",
    });
    var innerDiv = $("<div/>", {
        "class": "row",
    }).appendTo(mainDiv);

    var h3 = $("<h3/>", {
        "class": "questions-heading",
        "html": val.question
    }).appendTo(innerDiv);

    for (var i = 0; i < val.options.length; i += 1) {
        var span = $("<span/>", {

        }).appendTo(innerDiv);
        if (val.radio) {
            var radio = $("<input/>").attr({
                type: 'radio', name: 'mydata', class: 'mydata radio-gap', value: i, id: i
            }).appendTo(span);
        }
        else {
            var radio = $("<input/>").attr({
                type: 'checkbox', class: 'mydata radio-gap', value: i, id: i
            }).appendTo(span);
        }
        var span = $("<span/>", {
            "html": val.options[i], class: ''
        }).appendTo(span);

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
    console.log(randomArr);
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

    $("#submit").removeClass("hidden");
    $("#next").addClass("hidden");
    $("#answer").html("");

    if (items.length === count) {
        var passResult = 0.7; //this is 70%
        var finalResult = passResult * items.length;
        console.log(finalResult);
        $("#submit").addClass("hidden");
        $("#next").html("hidden");
        // $(".green").addClass("hidden");
        $("#answer").addClass("hidden");
        // alert(answersCount);
        $("#progress").html("You need 70% to pass the test.</br> Your Score is " + answersCount + " of " + randomTarget);
        if (answersCount >= finalResult) {
            $("<div/>", {
                "class": "col-xs-12 lightgreen",
                html: "You have passed"
            }).appendTo(".green");
        }
        else {
            $("<div/>", {
                "class": "col-xs-12 red",
                html: "You have NOT passed"
            }).appendTo(".green");
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
    if (answers.length === 1) {
        var value = answers.attr("id");
        if (plainVal[count].answer == value) {
            $("#answer").text("Success").addClass("lightgreen")
                .animateAnswer()
                .removeClass("red");
            answersCount++;
        }
        else {
            $("#answer").text("Incorect").addClass("red")
                .animateAnswer()
                .removeClass('lightgreen');
        }
        $("#submit").addClass("hidden");
        $("#next").removeClass("hidden");

    }
    else if (answers.length > 1) {
        var userAnswers = [];
        for (var i = 0; i < answers.length; i += 1) {
            var checkboxValue = answers[i].id;
            userAnswers.push(checkboxValue);
        }
        var countCheckBoxAnswers = 0;
        for (var y = 0; y < plainVal[count].answer.length; y += 1) {
            for (var z = 0; z < userAnswers.length; z += 1) {
                if (plainVal[count].answer[y] == userAnswers[z]) {
                    countCheckBoxAnswers++;
                }
            }
        }
        if (plainVal[count].answer.length == countCheckBoxAnswers) {
            $("#answer").text("Success").addClass("lightgreen")
                .animateAnswer()
                .removeClass("red");
            answersCount++;
        }
        else {
            $("#answer").text("Incorect").addClass("red")
                .animateAnswer()
                .removeClass('lightgreen');
        }
        // console.log('chexbox answers: ' + countCheckBoxAnswers);
        $("#submit").addClass("hidden");
        $("#next").removeClass("hidden");
    }
    else {
        $("#answer").text("You must enter a value!").addClass("red")
            .fadeIn(500)
            .fadeOut(2300)
            .removeClass('lightgreen');
    }
}
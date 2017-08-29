var express = require('express');
var questionRouter = express.Router();
var sqaQuestions2 = require('../../public/json/portnovQuestions2');
var detailQuestions = require('../../public/json/fullQuestions');

function getCategory(val) {

    var randomTarget = 5;
    var tempQuestions = sqaQuestions2;

    var finalQuestions = (function () {
        var finalArr = [];
        for (var i = 0; i < tempQuestions.length; i += 1) {

            if (tempQuestions[i].category === val) {
                finalArr.push(tempQuestions[i]);
            }
        }
        return finalArr;
    })();

    var randomQuestions = (function () {
        var randomArr = [];
        for (var y = 0; y < randomTarget; y += 1) {
            var randNumber = Math.floor(Math.random() * finalQuestions.length);
            var randQuestion = finalQuestions[randNumber];
            // console.log(randNumber);
            // console.log(randQuestion);
            // console.log('rand num'+randNumber);
            var found = false;
            if (y == 0) {
                randomArr.push(randQuestion);
                continue;
            }

            for (var z = 0; z < randomArr.length; z += 1) {
                // console.log('rand-Ques '+randQuestion.category);
                // console.log('rand-Arr '+randomArr[z].category);
                if (randQuestion.id === randomArr[z].id) {
                    found = true;
                    y--;

                }
            }
            if (!found) {
                randomArr.push(randQuestion);
                found = false;
            }

        }
        return randomArr;
    })();

    // console.log(finalQuestions);
    return {
        finalQuestions: finalQuestions,
        randomQuestions: randomQuestions
    }
}


var router = function (quest) {

    var randomQuestions = [];
    var finalQuestions = [];

    questionRouter.route('/')
        .get(function (req, res) {
            res.render('questions', {
                title: 'All Questions',
                testType: 'qaBasics',
                questions: sqaQuestions2
            })
        });
   

    function detailSelection(detailQuestions, id) {
        var singleTopic = {
            "title": "No extra info for this subject!",
            "content": "You can aways add some..."
        };

        for (var i = 0; i < detailQuestions.length; i += 1) {
            // console.log(detailQuestions[i]['referToId']);
            if (id == detailQuestions[i].referToId) {
                singleTopic = detailQuestions[i];
            }
        }

        return singleTopic;
    }

    questionRouter.route('/:id')
        .get(function (req, res) {
            var id = req.params.id;
            var referToId = id;
            res.render('single-question', {
                title: 'all',
                questions: sqaQuestions2[id],
                details: detailSelection(detailQuestions, id)
            })
        })

    return questionRouter;
}
module.exports = router;
var express = require('express');
var questionRouter = express.Router();
var sqaQuestions2 = require('../../public/json/portnovQuestions2');

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
    questionRouter.route('/qaBasics')
        .get(function (req, res) {
            finalQuestions = getCategory("testingTypes").finalQuestions;
            res.render('sqa-questions', {
                title: "SQA Basics",
                testType: 'qaBasics',
                questions: finalQuestions
            });
        });
         questionRouter.route('/qaBasics/random')
        .get(function (req, res) {
            randomQuestions = getCategory("qaBasics").randomQuestions;
            res.render('sqa-questions-random', {
                title: "SQA Basics",
                testType: 'qaBasics',
                randQuestions: randomQuestions
            })
        })
    questionRouter.route('/testingTypes')
        .get(function (req, res) {
            finalQuestions = getCategory("testingTypes").finalQuestions;
            // randomQuestions = getCategory("testingTypes").randomQuestions;
            res.render('sqa-questions', {
                title: "Testing Types",
                testType: 'testingTypes',
                questions: finalQuestions,
                // randQuestions: randomQuestions
            })

        }).post(function (req, res) {
            console.log(req.body);
            res.send('staf ' + req.body.cars);
        })
    questionRouter.route('/testingTypes/random')
        .get(function (req, res) {
            randomQuestions = getCategory("testingTypes").randomQuestions;
            res.render('sqa-questions-random', {
                title: "Testing Types",
                testType: 'testingTypes',
                randQuestions: randomQuestions
            })
        })
    questionRouter.route('/bugs')
        .get(function (req, res) {
            finalQuestions = getCategory("bugs").finalQuestions;
            res.render('sqa-questions', {
                title: "Bugs",
                testType: 'bugs',
                // img:'img/bug.png',
                questions: finalQuestions
            });
        })
    questionRouter.route('/bugs/random')
        .get(function (req, res) {
            randomQuestions = getCategory("bugs").randomQuestions;
            res.render('sqa-questions-random', {
                title: "Bugs",
                testType: 'bugs',
                // img:'img/bug.png',
                randQuestions: randomQuestions
            });
        })
    questionRouter.route('/documentation')
        .get(function (req, res) {
            res.render('sqa-questions', {
                title: 'Documentation',
                testType: 'documentation',
                questions: getCategory('documentation').finalQuestions
            })
        })
         questionRouter.route('/documentation/random')
        .get(function (req, res) {
            randomQuestions = getCategory("documentation").randomQuestions;
            res.render('sqa-questions-random', {
                title: "Documentation",
                testType: 'documentation',
                randQuestions: randomQuestions
            })
        })
    questionRouter.route('/technical')
        .get(function (req, res) {
            res.render('sqa-questions', {
                title: 'Technical',
                testType: 'technical',
                questions: getCategory('technical').finalQuestions
            })
        })
         questionRouter.route('/technical/random')
        .get(function (req, res) {
            randomQuestions = getCategory("technical").randomQuestions;
            res.render('sqa-questions-random', {
                title: "Technical",
                testType: 'technical',
                randQuestions: randomQuestions
            })
        })
    questionRouter.route('/mobile')
        .get(function (req, res) {
            res.render('sqa-questions', {
                title: 'Mobile',
                testType: 'mobile',
                questions: getCategory('mobile').finalQuestions
            })
        })
    questionRouter.route('/mobile/random')
        .get(function (req, res) {
            randomQuestions = getCategory("mobile").randomQuestions;
            res.render('sqa-questions-random', {
                title: "mobile",
                testType: 'mobile',
                randQuestions: randomQuestions
            })
        })
    questionRouter.route('/:qaQuestion/:id')
        .get(function (req, res) {
            var sqBasics = req.params.qaQuestion;
            var id = req.params.id;
            res.render('single-question', {
                title: sqBasics,
                questions: finalQuestions[id]
            });
        });

 questionRouter.route('/:qaQuestion/random/:id')
        .get(function (req, res) {
            var sqBasics = req.params.qaQuestion;
            var id = req.params.id;
             //var rand = req.params.random;
            res.render('single-random', {
                title: sqBasics,
                randQuestions: randomQuestions[id]
            });
        });
    questionRouter.route('/single')
        .get(function (req, res) {
            res.send('Hello single books');
        });

    return questionRouter;
}
// app.use(bodyParser.urlencoded({ extended: true }));
module.exports = router;
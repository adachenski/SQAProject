var express = require('express');

var questionRouter = express.Router();

var sqaQuestions2 = require('../../public/json/portnovQuestions2');
function getCategory(val) {
    var tempQuestions = sqaQuestions2;
    var finalQuestions = [];
    for (var i = 0; i < tempQuestions.length; i += 1) {

        if (tempQuestions[i].category == val) {
            finalQuestions.push(tempQuestions[i]);
        }
    }
    // console.log(finalQuestions);
    return finalQuestions;
}

var router = function (quest) {

    questionRouter.route('/qaBasics')
        .get(function (req, res) {
            res.render('sqa-questions', {
                title: "SQA Basics",
                testType: 'qaBasics',
                questions: getCategory("qaBasics")
            });
        });
    questionRouter.route('/testingTypes')
        .get(function (req, res) {
            res.render('sqa-questions', {
                title: "Testing Types",
                testType: 'testingTypes',
                questions: getCategory("testingTypes")
            })
        })
           questionRouter.route('/bugs')
        .get(function (req, res) {
            res.render('sqa-questions', {
                title: "Bugs",
                testType: 'bugs',
                // img:'img/bug.png',
                questions: getCategory("bugs")
            })
        })
        questionRouter.route('/documentation')
        .get(function(req, res){
            res.render('sqa-questions',{
                title:'Documentation',
                testType: 'documentation',
                questions: getCategory('documentation')
            })
        })
        questionRouter.route('/technical')
        .get(function(req, res){
            res.render('sqa-questions',{
                title: 'Technical',
                testType:'technical',
                questions: getCategory('technical')
            })
        })
        questionRouter.route('/mobile')
        .get(function(req, res){
            res.render('sqa-questions',{
                title: 'Mobile',
                testType: 'mobile',
                questions: getCategory('mobile')
            })
        })
    questionRouter.route('/:qaQuestion/:id')
        .get(function (req, res) {
            var sqBasics = req.params.qaQuestion;
            var id = req.params.id;
            res.render('single-question', {
                title: sqBasics,
                questions: getCategory(sqBasics)[id]
            });
        });

    questionRouter.route('/single')
        .get(function (req, res) {
            res.send('Hello single books');
        });

    return questionRouter;
}
module.exports = router;
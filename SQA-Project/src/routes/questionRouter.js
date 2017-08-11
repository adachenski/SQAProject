var express = require('express');

var questionRouter = express.Router();

var router = function (quest) {

    questionRouter.route('/')
        .get(function (req, res) {
            res.render('sqa-basics', {
                title: "SQA Questions",
                list: [
                    { name: 'Atanas', age: 31 },
                    { name: 'Rally', age: 21 }
                ],
                questions: quest
            });
        });

    questionRouter.route('/:id')
        .get(function (req, res) {
            var id = req.params.id;
            res.render('book', {
                title: "Books",
                list: [
                    { name: 'Atanas', age: 31 },
                    { name: 'Rally', age: 21 }
                ],
                questions: quest[id]
            });
        });

    questionRouter.route('/single')
        .get(function (req, res) {
            res.send('Hello single books');
        });

    return questionRouter;
}
module.exports = router;
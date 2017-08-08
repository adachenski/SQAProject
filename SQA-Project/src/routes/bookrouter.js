var express = require('express');

var bookRouter = express.Router();

var router = function (quest) {

    bookRouter.route('/')
        .get(function (req, res) {
            res.render('index', {
                title: "Books",
                list: [
                    { name: 'Atanas', age: 31 },
                    { name: 'Rally', age: 21 }
                ],
                questions: quest
            });
        });

    bookRouter.route('/:id')
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

    bookRouter.route('/single')
        .get(function (req, res) {
            res.send('Hello single books');
        });

    return bookRouter;
}
module.exports = router;
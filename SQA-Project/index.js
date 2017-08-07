var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var bookRouter = express.Router();

var sqaQuestions = [
    {
        "id": 0,
        "title": "What is Quality?",
        "content": "Customer's satisfaction; Product being under requirements. BUT! Each type of customer will have their own view on quality. Meeting the requirements doesn't guarantee customer's popularity."
    },

    {
        "id": 1,
        "title": " What is Software Quality? ",
        "content": " Software Quality is how close the actual software product is to the expected (intended) product. Quality Software: Bug-free; Meets requirements and expectations; Delivered on time. "
    },

    {
        "id": 2,
        "title": " What is Software Quality Assurance? ",
        "content": " Software QA is the process of monitoring and improving all activities associated with software development, from requirements gathering, design and reviews to coding, testing and implementation. "
    },

    {
        "id": 3,
        "title": " What is Software Testing? ",
        "content": " Software Testing is the process of analyzing the software in order to detect differences between existing and required conditions and to evaluate the features of the software. "
    },

    {
        "id": 4,
        "title": " Purpose of Software Testing? ",
        "content": " Verification (Check the actual results against the requirements); Validation (Check that our system is what the user actually wanted); Error detection. "
    }
];
//app.set('view engine','html');
app.use(express.static('public'));
app.set('views', './src/views');


//app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

//app.set('views','./src/views');
app.get('/', function (req, res) {
    res.render('index', {
        title: "Hello from render",
        list: [
            { name: 'Atanas', age: 31 },
            { name: 'Rally', age: 21 }
        ],
        questions: sqaQuestions
    });

});

app.get('/sqa-test', function (req, res) {
    res.render('sqaTest');
});

bookRouter.route('/')
    .get(function (req, res) {
        res.render('index', {
            title: "Books",
            list: [
                { name: 'Atanas', age: 31 },
                { name: 'Rally', age: 21 }
            ],
            questions: sqaQuestions
        });
    });
bookRouter.route('/single')
    .get(function (req, res) {
        res.send('Hello single books');
    });
app.use('/Books', bookRouter);

app.listen(port, function (err) {
    console.log('Running on port ', port);
})
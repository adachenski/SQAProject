var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var sqaQuestions2 = require('./public/json/portnovQuestions2');
var bookRouter = require('./src/routes/bookrouter')(sqaQuestions2);

//app.set('view engine','html');
app.use(express.static('public'));
app.set('views', './src/views');

var fs = require('fs');
// fs.readFile('./public/json/portnovQuestions.json', function (err, content) {
//     if (err) throw err;
//     var newJson = JSON.parse(content);

//     for (var i = 0; i < newJson.length; i += 1) {
//         if (i < 14) {

//             newJson[i]["category"] = "qaBasics"
//         }
//         else if (i <= 49) {
//             newJson[i].category = "testingTypes"
//         }
//         else if (i <= 66) {
//             newJson[i].category = "bugs"
//         }
//         else if (i <= 80) {
//             newJson[i].category = "documentation"
//         }
//         else if (i <= 108) {
//             newJson[i].category = "technical"
//         }
//         else {
//             newJson[i].category = "mobile"
//         }
//     }
//     fs.writeFile('./public/json/portnovQuestions2.json', JSON.stringify(newJson), function (err) {
//         if (err) throw err;
//     })
// })

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
        questions: sqaQuestions2
    });

});

app.get('/sqa-test', function (req, res) {
    res.render('sqaTest');
});

app.use('/Books', bookRouter);

app.listen(port, function (err) {
    console.log('Running on port ', port);
})
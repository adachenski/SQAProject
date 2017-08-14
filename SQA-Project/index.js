var express = require('express');
var app = express();
 var path = require('path');
var port = process.env.PORT || 3000;
var homeRouter = require('./src/routes/homeRouter');
var sqaQuestions2 = require('./public/json/portnovQuestions2');
var questionRouter = require('./src/routes/questionRouter')(sqaQuestions2);

var bodyParser = require('body-parser');

var rootPath = path.normalize(__dirname + '/');
app.use(bodyParser.urlencoded({ extended: false })); 

app.use(express.static(rootPath+'public'));
app.set('views', path.join(rootPath+'src/views'));

// var fs = require('fs');
// fs.readFile('./public/json/portnovQuestions2.json', function (err, content) {
//     if (err) throw err;
//     var newJson = JSON.parse(content);

//     for (var i = 0; i < newJson.length; i += 1) {
//         if (newJson[i]["content"]) {
//             var x = newJson[i]["content"].replace(/;/g,";</br>");
//             newJson[i]["content"] = x;
//         }
        
//     }
//     fs.writeFile('./public/json/portnovQuestions3.json', JSON.stringify(newJson), function (err) {
//         if (err) throw err;
//     })
// })

app.set('view engine', 'ejs');

app.set('views','./src/views');
app.get('/', function (req, res) {
    res.render('index', {
        title: "Index",
    });
});

//app.use('/',homeRouter);

app.get('/sqa-test', function (req, res) {
    res.render('sqaTest');
});

app.use('/Questions', questionRouter);

app.listen(port, function (err) {
    console.log('Running on port ', port);
});


// function getCategory(val) {
//     var tempQuestions = sqaQuestions2;
//     var finalQuestions = [];
//     for (var i = 0; i < tempQuestions.length; i += 1) {

//         if (tempQuestions[i].category == val) {
//             finalQuestions.push(tempQuestions[i]);
//         }
//     }
//     return finalQuestions;
// }

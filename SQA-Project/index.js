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

app.use(express.static(rootPath + 'public'));
app.set('views', path.join(rootPath + 'src/views'));

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
var detailQuestions = require('./public/json/fullQuestions');
function getDetailCategory(allQuestions, category) {
    var tempArr = [];
    for (var i = 0; i < allQuestions.length; i += 1) {
        if (allQuestions[i].category == category) {
            tempArr.push(allQuestions[i])
        }
    }
    return tempArr;

};
function getRandomQuestions(arr, target) {
    var randomArr = [];
    for (var y = 0; y < target; y += 1) {
        var randNumber = Math.floor(Math.random() * arr.length);
        var randQuestion = arr[randNumber];
        var found = false;
        if (y == 0) {
            randomArr.push(randQuestion);
            continue;
        }

        for (var z = 0; z < randomArr.length; z += 1) {
            if (randQuestion.id == randomArr[z].id) {
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
}
app.set('view engine', 'ejs');

app.set('views', './src/views');
app.get('/', function (req, res) {
    var allQuestions = detailQuestions;
    var testingTypes = getDetailCategory(allQuestions, 'testingTypes');
    var randomTestingTypes = getRandomQuestions(testingTypes, 3);
    var documentation = getDetailCategory(allQuestions, 'documentation');
    var randomDocumentation = getRandomQuestions(documentation, 3);
    console.log(randomDocumentation);
    res.render('index', {
        title: "Index",
        testingTypes: randomTestingTypes,
        documentation: randomDocumentation
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

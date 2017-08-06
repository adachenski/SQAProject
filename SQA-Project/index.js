var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

//app.set('view engine','html');
app.use(express.static('src/views'));
app.use(express.static('public'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//app.set('views','./src/views');
app.get('/',function(req, res){
    res.render('index');
});

app.get('/books',function(req, res){
    res.send('Hello books');
});

app.listen(port, function(err){
    console.log('Running on port ',port);
})
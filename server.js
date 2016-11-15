var express        = require('express'),
    bodyParser     = require('body-parser'),
    mongoose       = require('mongoose'),
    logger         = require('morgan'),
    port           = process.env.PORT  || 3000,
    app            = express();


mongoose.Promise = global.Promise;
var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/jatg';
mongoose.connect(mongoURI);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.static('public'));
app.use('/scripts', express.static(__dirname + '/bower_components'))


app.get('/', function(req, res){
  res.send('./public/index.html')
});

app.use('/api/', require('./controllers/choreApi.js'));

app.listen(port, function(){
  console.log('I am running here --->  ' + port)
});

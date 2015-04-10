var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var InvIndex = require('./lib/invertedIndex');
var invIndex = new InvIndex();

app.post('/api/doc/query', function(req, res){
    if (!req.body || !req.body.queryWords) return res.sendStatus(400);

    // curl -X POST -H "Content-Type: application/json" -d '{"queryWords":["it","banana"]}' localhost:3000/api/doc/query
    queryWords = req.body.queryWords;
    res.json(invIndex.searchQuery(queryWords));
});

app.post('/api/doc/add', function(req, res){
    if (!req.body || !req.body.doc) return res.sendStatus(400);

    // curl -X POST -H "Content-Type: application/json" -d '{"doc":"sometimes an old banana"}' localhost:3000/api/doc/add
    // curl -X POST -H "Content-Type: application/json" -d '{"doc":"some new words here"}' localhost:3000/api/doc/add
    invIndex.addDoc(req.body.doc);
    res.json({"status":"ok"});
});

app.get('/api/doc/getAll', function(req, res){
    // curl localhost:3000/api/doc/getAll
    res.json(invIndex.data);
});


app.listen(3000, function() {
    console.log('Listening on port 3000');
});

// Add some initial documents
var d = [ 
    "it is what it is",
    "what is it",
    "it is a banana",
    "this is a new banana"
];

d.forEach(function(doc){
    invIndex.addDoc(doc);
});



var InvIndex = require('./lib/invertedIndex');
var invIndex = new InvIndex();

var d = [ 
    "it is what it is",
    "what is it",
    "it is a banana",
    "this is a new banana"
];

d.forEach(function(doc){
    invIndex.addDoc(doc);
});

console.log(invIndex.data);
console.log(invIndex.searchQuery('what new'));

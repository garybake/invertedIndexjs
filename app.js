// http://en.wikipedia.org/wiki/Inverted_index

var invertedIndex = {
    docs: [],
    idx: {}
};

var d = [];
d[0] = "it is what it is";
d[1] = "what is it";
d[2] = "it is a banana";

function addDoc(doc){
    var invIdx = invertedIndex.idx;
    invertedIndex.docs.push(doc);
    var docId = invertedIndex.docs.length - 1;
    var words = doc.split(" ");
    words.forEach(function(word, widx){
        if (invIdx.hasOwnProperty(word)) {
            var arr = invIdx[word];
            if (arr.indexOf(docId) === -1){
                arr.push(docId);
            }
        } else {
            invIdx[word] = [docId];
        }
    });
}

function searchWord(word){
    return(invertedIndex.idx[word] ? invertedIndex.idx[word] : []);
}

function searchQuery(words){
    var queryWords = words.split(" ");
    var results = searchWord(queryWords[0]);
    for (var i = 1; i < queryWords.length; i++){
        var matches = searchWord(queryWords[i]);
        results = mergeArray(results, matches);
    }
    return results;
}

function mergeArray(a, b){
    var c = a.concat(b.filter(function (item) {
        return a.indexOf(item) < 0;
    }));
    return c;
}

// -----------------------

d.forEach(function(doc){
    addDoc(doc);
});

addDoc("this is a new banana");

console.log(invertedIndex);

console.log(searchQuery('what new'));
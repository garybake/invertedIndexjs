// http://en.wikipedia.org/wiki/Inverted_index

module.exports = function(){

    this.data = {
        docs: [],
        idx: {}
    };

    this.addDoc = function(doc){
        var invIdx = this.data.idx;
        this.data.docs.push(doc);
        var docId = this.data.docs.length - 1;
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
    };

    this.searchWord = function(word){
        return(this.data.idx[word] ? this.data.idx[word] : []);
    };

    this.searchQuery = function(queryWords){
        // var queryWords = words.split(" ");
        var results = this.searchWord(queryWords[0]);
        for (var i = 1; i < queryWords.length; i++){
            var matches = this.searchWord(queryWords[i]);
            results = this.mergeArray(results, matches);
        }
        return results;
    };

    this.mergeArray = function(a, b){
        var c = a.concat(b.filter(function (item) {
            return a.indexOf(item) < 0;
        }));
        return c;
    };

};
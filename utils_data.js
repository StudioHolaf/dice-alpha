module.exports = {

    remove_duplicates_es6 : function uniq(a) {
        return Array.from(new Set(a));
    },
    
    replace_in_array : function(array, toReplace, replacement)
    {
        var indexes = [], i = -1;
        while ((i = array.indexOf(toReplace, i+1)) != -1){
            indexes.push(i);
        }
        indexes.forEach(function(id)
        {
            array[id] = replacement;
        });
    },

    objectSize : function(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    }
};
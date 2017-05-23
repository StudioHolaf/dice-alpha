module.exports = {

    remove_duplicates_es6 : function uniq(a) {
        return Array.from(new Set(a));
    },
    
    replace_in_array : function(array, toReplace, replacement)
    {
        var index = array.indexOf(toReplace);
        if (index !== -1) {
            array[index] = replacement;
        }
    }

};
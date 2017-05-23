var utils_data = require( './utils_data' );

module.exports = {

    construct_player : function(player, callback)
    {
        var face_ids = [];
        player._deck.forEach(function (deck, deck_id) {
            deck.forEach(function (dice, dice_id) {
                dice.forEach(function (face, face_id) {
                    face_ids.push(face);
                });
            });
        });
        var face_ids_uniques = utils_data.remove_duplicates_es6(face_ids);
        db.collection("faces").find({_id:{ $in: face_ids_uniques}}, function (err, faces) {
            var nbFaces = 0;
            var length = faces.s.numberOfRetries;
            faces.forEach(function(face)
            {
                player._deck.forEach(function(deck){
                    deck.forEach(function (dice, dice_id) {
                        utils_data.replace_in_array(dice, parseInt(face._id), face);
                    });
                });
                nbFaces++
                if(nbFaces == length+1)
                {
                    callback(player);
                }
            });
        });
    }

};
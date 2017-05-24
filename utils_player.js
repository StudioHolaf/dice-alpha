var utils_data = require( './utils_data' );

module.exports = {

    construct_player : function(player, callback)
    {
        console.log("construct player");
        var face_ids = [];
        player._deck.forEach(function (deck, deck_id) {
            deck.forEach(function (dice, dice_id) {
                dice.forEach(function (face, face_id) {
                    face_ids.push(parseInt(face));
                });
            });
        });
        var face_ids_uniques = utils_data.remove_duplicates_es6(face_ids);
        console.log("face_ids_uniques = ",face_ids_uniques);
        db.collection("faces").find({_id:{ $in: face_ids_uniques}}, function (err, faces) {
            var nbFaces = 0;
            var length = face_ids_uniques.length-1;
            faces.forEach(function(face)
            {
                player._deck.forEach(function(deck){
                    deck.forEach(function (dice, dice_id) {

                        utils_data.replace_in_array(dice, parseInt(face._id), face);
                    });
                });
                nbFaces++;
                if(nbFaces == length+1)
                {
                    callback(player);
                }
            });
        });
    }

};
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
            var length = face_ids_uniques.length;
            faces.forEach(function(face)
            {
                player._deck.forEach(function(deck){
                    deck.forEach(function (dice, dice_id) {
                        utils_data.replace_in_array(dice, parseInt(face._id), face);
                    });
                });
                nbFaces++;
                if(nbFaces == length)
                {
                    callback(player);
                }
            });
        });
    },

    construct_owned_faces: function (tab_owned_faces, callback) {
        console.log("construct owned faces");
        var face_ids_uniques = utils_data.remove_duplicates_es6(tab_owned_faces);
        //console.log("face_ids_uniques = ", face_ids_uniques);
        db.collection("faces").find({_id: {$in: face_ids_uniques}}, function (err, faces) {
            var nbFaces = 0;
            var length = face_ids_uniques.length;
            faces.forEach(function(face)
            {
                utils_data.replace_in_array(tab_owned_faces, parseInt(face._id), face);

                nbFaces++;
                if (nbFaces == length) {
                    callback(tab_owned_faces);
                }
            });
        });
        //console.log("Owned Faces : %o ", tab_owned_faces);
    }
};

// AFFICHER LE CONTENU DE TAB OWNED FACE ET ENSUITE L'ENVOYEZ A L'INTERFACE
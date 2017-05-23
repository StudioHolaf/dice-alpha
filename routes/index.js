/**
 * Created by Thibaut on 22/05/2017.
 */

var utils = require( '../utils_server' );

/* ------------------------------------------------------------ INDEX ------------------------------------------------------------ */

exports.index = function (req, res) {
    // try to initialize the db on every request if it's not already
    // initialized.
    if (!db) {
        initDb(function(err){});
    }
    if (db) {
        var col = db.collection('counts');
        // Create a document with request IP and current time of request
        col.insert({ip: req.ip, date: Date.now()});
        col.count(function(err, count){
            res.render('index.html', { pageCountMessage : count});
        });
    } else {
        res.render('index.html', { pageCountMessage : null});
    }
};

/* ------------------------------------------------------------ MATCH PAGE ------------------------------------------------------------ */

exports.match = function (req, res) {
    if (!db) {
        initDb(function(err){});
    }
    if (db) {

        res.render('match.html');
        console.log("parameters = ",req.params.idj1,req.params.idj2);
        var j1_id = parseInt(req.params.idj1);
        var j2_id = parseInt(req.params.idj2);

        io.sockets.on('connection', function (socket) {

            db.collection("player").findOne({_id: j1_id}, function (err, player) {
                if (err) throw err;
                construct_player(1, player, function(){sendPlayer(1,player);});
            });

            db.collection("player").findOne({_id: j2_id}, function (err, player) {
                if (err) throw err;
                construct_player(2, player, function(){sendPlayer(2,player);});
            });

        });
    } else {
        res.render('match.html');
    }
}

function construct_player(id, player, callback)
{
    var face_ids = [];
    player._deck.forEach(function (deck, deck_id) {
        deck.forEach(function (dice, dice_id) {
            dice.forEach(function (face, face_id) {
                face_ids.push(face);
            });
        });
    });
    var face_ids_uniques = utils.remove_duplicates_es6(face_ids);
    db.collection("faces").find({_id:{ $in: face_ids_uniques}}, function (err, faces) {
        var nbFaces = 0;
        var length = faces.s.numberOfRetries;
        faces.forEach(function(face)
        {
            player._deck.forEach(function(deck){
                deck.forEach(function (dice, dice_id) {
                    utils.replace_in_array(dice, parseInt(face._id), face);
                });
            });
            nbFaces++
            if(nbFaces == length+1)
            {
                callback();
            }
        });
    });
}

function sendPlayer(position, datas)
{
    io.sockets.emit('player_init', { position: position, datas: datas });
}

/* ------------------------------------------------------------ PAGECOUNT ------------------------------------------------------------ */

exports.pagecount = function (req, res) {
    // try to initialize the db on every request if it's not already
    // initialized.
    if (!db) {
        initDb(function(err){});
    }
    if (db) {
        db.collection('counts').count(function(err, count ){
            res.send('{ pageCount: ' + count + '}');
        });
    } else {
        res.send('{ pageCount: -1 }');
    }
}

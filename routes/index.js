/**
 * Created by Thibaut on 22/05/2017.
 */

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
            res.render('main-menu.html', { pageCountMessage : count});
        });
    } else {
        res.render('main-menu.html', { pageCountMessage : null});
    }
};

/* ------------------------------------------------------------ MATCH PAGE ------------------------------------------------------------ */

exports.match = function (req, res) {
    if (!db) {
        initDb(function(err){});
    }
    if (db) {

        res.render('match.html',{room_id : req.params.roomid});

    } else {
        res.render('match.html',{room_id : req.params.roomid});
    }
}

/* ------------------------------------------------------------ FORGE PAGE ------------------------------------------------------------ */

exports.forge = function (req, res) {
    if (!db) {
        initDb(function(err){});
    }
    if (db) {
        res.render('forge.html');

    } else {
        res.render('forge.html');
    }
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

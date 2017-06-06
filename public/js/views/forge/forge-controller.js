////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////        ***** FORGE STUFF *****         ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

var socket = io.connect();

socket.on('ask_for_login', function () {
    swal({
            title: "BIENVENUE DANS LA FORGE !",
            text: "Enter user id",
            type: "input",
            showCancelButton: true,
            confirmButtonColor: "#3F8F4E",
            confirmButtonText: "ashi !",
            closeOnConfirm: true,
            inputPlaceholder: "User id"
        },
        function (inputValue) {
            if (inputValue === false) return false;

            if (inputValue === "") {
                swal.showInputError("You need to write something!");
                return false
            }
            console.log("user id : ", inputValue);
            player_1_id = parseInt(inputValue);
            socket.emit('player_connection_forge', inputValue);
        });
})

function getAllIDofDeck(player)
{
    console.log("dans getAllIDofDeck");
    var face_ids = [];
    //player._deck.forEach(function (deck, deck_id) {
        player._deck[0].forEach(function (dice, dice_id) {
            dice.forEach(function (face, face_id) {
                face_ids.push(face);
            });
        });
    /*});*/
    return face_ids;
}

function getDifferentielArrays(DeckFaces, OwnedFaces)
{
    var differentielArray = OwnedFaces.slice(0);

    console.log("DeckFaces : %o",DeckFaces);
    console.log("OwnedFaces : %o",OwnedFaces);

    for (var i = 0; i < DeckFaces.length ; i++)
    {
        for (var j = differentielArray.length-1; j >= 0; j--)
        {
            if (differentielArray[j]._id == DeckFaces[i]._id)
            {
                differentielArray.splice(j, 1);
                break;
            }
        }
    }
    console.log("Tableau diff : %o", differentielArray);
    return differentielArray;
}


socket.on('player_forge_init', function (datas) {

    var DeckFaces = [];
    var arrayDifferentiel = [];

    var arrayDiffObject = [];
    var arrayDeckObject = [];
    var arrayOwnedFacesObject = [];

    var player = [];

    var playerDecode = JSON.parse(datas.player);
    console.log("PLAYER :",playerDecode);
    player = Object.assign(new Player, playerDecode);
    player.deck = constructDeckFromJSON(player);
    console.log("PLAYER :",player);


    var OwnedFacesDecode = JSON.parse(datas.ownedFaces);
    DeckFaces = getAllIDofDeck(playerDecode);

    arrayDifferentiel = getDifferentielArrays(DeckFaces, OwnedFacesDecode);
    arrayDiffObject = constructFacesFromJSON(arrayDifferentiel);
    arrayDeckObject = constructFacesFromJSON(DeckFaces);
    player.ownedFaces = constructFacesFromJSON(OwnedFacesDecode);
    console.log("PLAYER :",player);

});

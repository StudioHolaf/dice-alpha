var arrayDifferentiel = [];
var arrayDiffObject = [];
var player = [];
var rv_differenciates;

$(document).ready(function(){
    var dices_slider = $('.dices-slider.owl-carousel').owlCarousel(
        {
            center: true,
            items:1,
            loop:false,
            nav: true,
            mouseDrag:false,
            touchDrag: false,
            navText: ["<img src='/assets/img/arrow-left.png'>","<img src='/assets/img/arrow-right.png'>"]
        }
    );

    dices_slider.on('changed.owl.carousel',function(property) {
        $("#dice-number").html(property.item.index+1);
    });

    $(".open-dice-button").click(function()
    {
        var current = $(this);
        current.parent().parent().addClass("wrap-invisible");
        $(".dices-slider").addClass("slider-controls-invisible");
        setTimeout(function()
        {
            current.parent().parent().addClass("wrap-hidden");
            $(".dices-slider").addClass("slider-controls-hidden");
            current.parent().parent().addClass("unwrap-display");
            setTimeout(function() {
                current.parent().parent().addClass("unwrap-visible");
            },10);
        },1000)
    });

    $(".dice-open-exit").click(function()
    {
        var current = $(this);
        current.parent().parent().removeClass("unwrap-visible");
        $(".dices-slider").removeClass("slider-controls-hidden");
        setTimeout(function()
        {
            current.parent().parent().removeClass("wrap-hidden");
            current.parent().parent().removeClass("unwrap-display");
            $(".dices-slider").removeClass("slider-controls-invisible");
            setTimeout(function() {
                current.parent().parent().removeClass("wrap-invisible");
            },10);
        },1000)
    });

});
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
            player_1_id = parseInt(inputValue);
            socket.emit('player_connection_forge', inputValue);
        });
})

function getAllIDofDeck(player)
{
    var face_ids = [];
    console.log("player %o",player);
        player._deck[0].forEach(function (dice, dice_id) {
            dice._faces.forEach(function (face, face_id) {
                face_ids.push(face);
            });
        });
    return face_ids;
}

function getDifferentielArrays(DeckFaces, OwnedFaces)
{
    var newDifferentielArray = OwnedFaces.slice(0);

    for (var i = 0; i < DeckFaces.length ; i++)
    {
        for (var j = newDifferentielArray.length-1; j >= 0; j--)
        {
            if (newDifferentielArray[j]._id == DeckFaces[i]._id)
            {
                newDifferentielArray.splice(j, 1);
                break;
            }
        }
    }
    return newDifferentielArray;
}

socket.on('player_forge_init', function (datas) {

    var DeckFaces = [];
    var arrayOwnedFacesObject = [];
    var playerDecode = JSON.parse(datas.player);

    player = Object.assign(new Player, playerDecode);
    player.deck = constructDeckFromJSON(player);


    var OwnedFacesDecode = JSON.parse(datas.ownedFaces);
    DeckFaces = getAllIDofDeck(playerDecode);

    arrayDifferentiel = getDifferentielArrays(DeckFaces, OwnedFacesDecode);
    arrayDiffObject = constructFacesFromJSON(arrayDifferentiel);
    player.ownedFaces = constructFacesFromJSON(OwnedFacesDecode);

    rivets.binders['face-spell'] = function (el, value) {
        el.style.backgroundImage = "url('" + value + "')";
    };

    rivets.bind($('.dice-item[dice-id="0"]'), player.getDiceOnDeck(0,0));
    rivets.bind($('.dice-item[dice-id="1"]'), player.getDiceOnDeck(0,1));
    rivets.bind($('.dice-item[dice-id="2"]'), player.getDiceOnDeck(0,2));
    rivets.bind($('.dice-item[dice-id="3"]'), player.getDiceOnDeck(0,3));
    rivets.bind($('.dice-item[dice-id="4"]'), player.getDiceOnDeck(0,4));

    var i = 0;
    console.log(arrayDiffObject);
    rv_differenciates = rivets.bind($("#available-faces-container"), {faces:arrayDiffObject});

    console.log("player : %o", player);
});

function swapFaces()
{
    if($(".dice-face.selected").length > 0)
    {
        if($(".available-face.selected").length > 0)
        {
            var face_number_available = parseInt($(".available-face.selected").attr("face_number"));
            var face_number_deck = parseInt($(".dice-face.selected").attr("face_position"));
            var dice_number_deck = parseInt($(".dice-face.selected").closest(".dice-item").attr("dice-id"));

            var tmp = player.getDiceOnDeck(0, dice_number_deck).getFaceByPosition(face_number_deck);
            if (typeof arrayDiffObject[face_number_available] != 'undefined' && arrayDiffObject[face_number_available] != null)
                player.getDiceOnDeck(0, dice_number_deck).setFaceByPosition(face_number_deck, arrayDiffObject[face_number_available]);
            if (typeof tmp != 'undefined' && tmp != null) {
                arrayDiffObject[face_number_available] = tmp;
            }
            else
                arrayDiffObject.splice(face_number_available,1);
            $(".available-face.selected").removeClass("selected");
            $(".dice-face.selected").removeClass("selected");
        }
    }
}

$("#available-faces-container").delegate(".available-face", "click", function () {

    $(".available-face").removeClass("selected");
    $(this).toggleClass("selected");

    swapFaces();
});

$(".dice-face").click(function () {

    $(".dice-face").removeClass("selected");
    $(this).toggleClass("selected");
    $(".delete-face").addClass("active");

    swapFaces();
});

$(".delete-face").click(function () {

    var face_number_deck = parseInt($(".dice-face.selected").attr("face_position"));
    var dice_number_deck = parseInt($(".dice-face.selected").closest(".dice-item").attr("dice-id"));

    arrayDiffObject.push(player.getDiceOnDeck(0, dice_number_deck).getFaceByPosition(face_number_deck)); //je push dans le tableau diff la face avant de la détruire
    player.getDiceOnDeck(0, dice_number_deck).setFaceByPosition(face_number_deck, null); //je lui change sa face par null

    $(".available-face.selected").removeClass("selected");
    $(".dice-face.selected").removeClass("selected");
});

$(".save-dice-button").click(function () {

    var copyDeckPlayerJSON = JSON.stringify(player._deck);
    var copyDeckPlayer = JSON.parse(copyDeckPlayerJSON);

    copyDeckPlayer.forEach(function (deck) {
        deck.forEach(function (dice) {
            var tab_ids_faces = [];
            dice._faces.forEach(function (face) {
                tab_ids_faces.push(face._id);
            });
            dice._faces = tab_ids_faces;
        });
    });
    //console.log("tab_ids_faces : %o", copyDeckPlayer);
    var deck_encode = JSON.stringify(copyDeckPlayer);
    socket.emit('player_deck_saved', {deck: deck_encode, player_id:player._id});
});

$(document).ready(function() {

    var socket = io.connect();

    $("#popup-room-opener").click(function()
    {
        $("#popup-room").addClass("open");
        socket.emit('player_display_rooms');
    })

    $(".popup-exit").click(function()
    {
        $(this).parent().parent().removeClass("open");
    })

    socket.on('available_rooms', function (roomsEncoded) {
        console.log("roomsEncoded.datas = %o",roomsEncoded.datas);
        console.log("roomsEncoded.id = %o",roomsEncoded.id);
        var rooms = JSON.parse(roomsEncoded.datas)
        console.log("rooms = %o",rooms);

        var rooms_list_view = rivets.bind($(".rooms-list-item"), {rooms:rooms});
        rivets.bind($("#new-room-button"), {id:"/match/"+roomsEncoded.id});
    })


    
});
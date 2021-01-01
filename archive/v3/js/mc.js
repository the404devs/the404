var url = "https://api.minetools.eu/ping/mc.the404.nl/25565";
$.getJSON(url, function(r) {
    //data is the JSON string
    if (r.error) {
        $('#rest').html('<b>Status: </b>Offline');
        return false;
    }

    $('#rest').html("<b>Status: </b>Online<br><b>Players:</b> " + r.players.online + "/" + r.players.max + "<br><b>Version:</b> " + r.version.name + "<br><br><button class='button' onclick=\"location.href='http://mc.the404.nl:8123'\"><i class='far fa-map' style='font-size:18px; width: 25px; margin-right: 3px; padding-bottom: 4px;'></i><span>Server Map</span></button>");
});
var ChessWebAPI = require('chess-web-api');
var chessAPI = new ChessWebAPI();

var prompt = require('prompt');

function evolution(playername, year, month, time_class, callback){

    chessAPI.getPlayerCompleteMonthlyArchives(playername, year, month).then(function(response) {
        var tab = new Array();
        var data = response.body;

        for(var i=0; i < data.games.length; i++){
            if(data.games[i].time_class.toLowerCase() === time_class.toLowerCase()){
                if(data.games[i].white.username.toLowerCase() === playername.toLowerCase() ){
                    intermedios = data.games[i].white.rating;
                    tab.push(intermedios);
                }else{
                    intermedios = data.games[i].black.rating;
                    tab.push(intermedios);
                }
            }
        }
        callback(tab);

    }, function(err) {
        console.error(err);
    });

}

function listePartie(playername, year, month, time_class, callback){
    chessAPI.getPlayerCompleteMonthlyArchives(playername, year, month).then(function(response) {

        var data = response.body;
        var tab = new Array();

        for(var i=0; i < data.games.length; i++){
            if(data.games[i].time_class.toLowerCase() === time_class.toLowerCase()){
                var intermedios = new Array() //on remet à zéro intermédios
                var j1 = data.games[i].white.username;
                var j2 = data.games[i].black.username;
                intermedios.push(j1.concat(' vs ', j2));

                intermedios.push(data.games[i].url); //url de la partie

                // les coups de la partie
                var str = data.games[i].pgn;
                var res = str.slice(str.search("https://www.chess.com/openings/"), str.search("UTCDate") - 4); //analyse de l'ouverture part l'ordi
                intermedios.push(res);

                //on ajoute le tableau dans le tableau final
                tab.push(intermedios);

            }

        }
        callback(tab);

    }, function(err) {
        console.error(err);
    });

}

function isStreamer(playername, callback){
    chessAPI.getPlayer(playername).then(function(response) {

        var data = response.body;
        callback(data.is_streamer);

    }, function(err) {
        console.error(err);
    });
}

prompt.start();

//saisie des infos à obtenir dans l'api
prompt.get(['playername', 'year', 'month', 'time_class', 'datas'], function (err, result) {

    var playername = String(result.playername);
    var year = parseInt(result.year);
    var month = parseInt(result.month);
    var time_class = String(result.time_class);
    var menu = result.datas;


    //appel de la fonction adéquate
    if(menu == 1){

        evolution( playername, year, month, time_class, function(donnees){
            console.table(donnees);
        });
    }

    if( menu == 2){
        listePartie(playername, year, month, time_class, function(donnees){
            console.table(donnees);
        });
    }

    if(menu ==3){
        isStreamer(playername, function(donnees){
            console.log(playername + ' streamer ? ' + donnees);
        })
    };

});


    

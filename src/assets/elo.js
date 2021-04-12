var ChessWebAPI = require('chess-web-api');
var chessAPI = new ChessWebAPI();

const fetch = require('node-fetch');



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

async function infoTwitch(url){
    fetch(url ,{
        headers: {
            'client-id' : '7jlr1k18l7mqrudhw5824rymletjv1', // l'id client autorisant chesscope a utiliser l'api twitch
            'Authorization' : 'btbntze0zqnekqg4aune1fp481oyf0' //le jeton de chesscope
        }
    })
    .then(res => res.json())
    .then(json => console.log(json));
}

evolution('moicflo', 2020, 04, 'blitz', function(result) {
    console.table(result);
})

listePartie('moicflo', 2020, 04, 'blitz', function(result) {
    console.table(result);
})

const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () =>{
  console.log(`${bot.user.username} is online`);


});

bot.on("message", async message =>{
  if (message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArrray = message.content.split(" ");
  let cmd = messageArrray[0];
  let yoo = messageArrray[1];
  let yoo2 = messageArrray[2];
  let args = messageArrray.slice(1);

  if (cmd === `${prefix}stasjon`) {

    if(yoo2 !=null){ yoo = yoo + ' ' + yoo2;}
    var req = require('request');

    req.get({
        url: 'https://oslobysykkel.no/api/v1/stations',
        headers: {
           'Client-Identifier': '64364bf3f1b08bc1940a37c5ad79db29'
        },
        method: 'GET'
       },

      function (e, r, body) {
            var jsonC = JSON.parse(body);


          var index = jsonC.stations.findIndex(function(item, i){
              return item.title === yoo
              });

              var id1 = jsonC.stations[index].id;




if (yoo2 == null) {

        req.get({
            url: 'https://oslobysykkel.no/api/v1/stations/availability',
            headers: {
               'Client-Identifier': '64364bf3f1b08bc1940a37c5ad79db29'
            },
            method: 'GET'
           },

           function (e, r, body) {
                var jsonC = JSON.parse(body);


                var pos = jsonC.stations.findIndex(function(item, i){
                    return item.id === id1
                    });

                return message.channel.send("stasjonen : "+ yoo  + " har " +  jsonC.stations[pos].availability.bikes + " ledige sykler, og  " + jsonC.stations[pos].availability.locks + " ledige plasser");
           });
  }else {

      yoo = yoo + ' ' + yoo2;

      req.get({
        url: 'https://oslobysykkel.no/api/v1/stations/availability',
        headers: {
           'Client-Identifier': '64364bf3f1b08bc1940a37c5ad79db29'
        },
        method: 'GET'
       },

       function (e, r, body) {
            var jsonC = JSON.parse(body);
            var stat = jsonC.stations;

            var pos = jsonC.stations.findIndex(function(item, i){
                return item.id === id1
                });

            return message.channel.send("stasjonen : "+ yoo  + " har " +  jsonC.stations[pos].availability.bikes + " ledige sykler, og  " + jsonC.stations[pos].availability.locks + " ledige plasser");


       });


  }

});
}
});

bot.login(botconfig.token);

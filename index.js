'use strict';
let websocket = require('ws');
let serv = new websocket.Server({noServer: true});
console.log(serv);



let http = require('http2');

let webSock = require('ws');

let Static = require('node-static');

let clients = {};

webSock = new webSock.Server({port:5});

webSock.on('connection', function(tr) {
    let id = Math.round(Math.random() * 100);
    clients[id] = tr;
    console.log('new connection ' + id);

    tr.on('message', function(message) {
        console.log(`received from (client ${id}): ` + message);

        for ( let key in clients) {
            clients[key].send(message);
        }
    });


    tr.on('close', function() {
        console.log('connection is close ' + id);
        delete clients[id];
      });
});

//обычный сервер (статика) на порту 8080
let fileServer = new Static.Server('.');
http.createServer(function (req, res) {
  
  fileServer.serve(req, res);

}).listen(2080);


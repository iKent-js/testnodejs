'use strict';
if (!window.WebSocket) {
	document.body.innerHTML = 'WebSocket в этом браузере не поддерживается.';
}

// создать подключение
let socket = new WebSocket("ws://localhost:5");
// отправить сообщение из формы publish
document.forms.publish.onsubmit = function() {
  let outgoingMessage = this.message.value;
  console.log(typeof outgoingMessage, outgoingMessage);
  socket.send(outgoingMessage);
  return false;
};

// обработчик входящих сообщений
socket.onmessage = function(event) {
  console.log(event, event.data);
  let incomingMessage = event.data;
  // showMessage(incomingMessage); 
  let ps = incomingMessage.text();
  ps.then((response) => { showMessage(response); });
};

// показать сообщение в div#subscribe
function showMessage(message) {
  let messageElem = document.createElement('div');
  messageElem.appendChild(document.createTextNode(message));
  document.getElementById('subscribe').appendChild(messageElem);
}

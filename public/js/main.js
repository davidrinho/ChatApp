const {username} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

const messages =  document.getElementById('messages'); 
const socket = io();

socket.emit('userJoin', username);


socket.on('message', message => {
    var newMsg = document.createElement('li');
    newMsg.appendChild(document.createTextNode(message));
    messages.appendChild(newMsg);
});

$('form').submit(function(e) {
    e.preventDefault(); // prevents page reloading
    socket.emit('chat message', {
        message: $('#message').val(),
        username: username
    }); 
    $('#message').val('');
    return false;
});


function updateScroll() {
    console.log('firing');
    var element = document.getElementById('messages');
    element.scrollTop = element.scrollHeight;
};

socket.on('chat message', function(data) {
    var $usernameMsg = $('<span style="font-weight:900">' + data['username'] + ': </span>');
    var $messageContent = data['message'];
    console.log($messageContent);
    $('#messages').append($('<li>').append($usernameMsg, $messageContent));
    updateScroll();
});
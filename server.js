//this require is a function this is used to load other javascript modules
var app = require('express')();//first we imported express library then we created a new instance of express and assigned it to app
var server = require('http').createServer(app);//we are importing http module, we created express app and we set this app to handle http request coming from http server
 //using this http module we can create a web server that listens to http request on a given port 
var io = require('socket.io')(server);//now we are adding socket.io to handle chat messages from client to the server
//this sockt.io needs an http server to transmit these sockets
//and we are transferring the sockets over http server that we have created
var users=[];
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');//we are telling express app to handle the http request of type get which make us to open home directory and to index.html file to browser
//__direname returns name of current directory of the running script
//sendFile() method will send the file from client to the server

});
app.get('/styles/style.css', function(req, res){
  res.sendFile(__dirname + '/styles/style.css');//to load css file we are adding this
});


io.on('connection', function(socket){ //on method act as event listner
  var name ="";//when socket creates it defines a variable called name for its own
  socket.on("has connected",function(username){
    name=username; //username is local to this function inorder to access outside we are assigning it to name 
users.push(username); //login usernames we are pushing it to users array
io.emit("has connected",{username: username, usersList :users});
 //now we are sending list of users connected to the every socket hat are conected to the server so we are emitting here
});
socket.on("disconnect",function(){
  users.slice(users.indexOf(name),1);//when a user disconnects from the server we are deleting that particular users name
  io.emit("has disconnected",{username:name,usersList:users});//and we are sending our user list back to the view
  });
  socket.on("new message",function(message){
    io.emit("new message",message);//now we want to emit to the  every socket this event called new message
    //so by this particular sockets message is displayed to every socket including that particular socket also
  
  });
});

//socket.on('disconnect', function(){
      
//});
server.listen(3000, function(){ //we made surver to listen to the port 3000 and through this we are checking that

  console.log('listening on *:3000');
});

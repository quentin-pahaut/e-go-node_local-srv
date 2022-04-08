"use strict"

/*
--== Imports node Libs ==--
*/ 
const { SerialPort } = require('serialport');

const { ReadlineParser} = require ('@serialport/parser-readline');

const { io } = require('socket.io-client');

/*
--== Socket.io Instance ==--

*/


//set socket with distant server adress
const socket = io("http://192.168.1.6:8888");

//set function used to send bike amper to distant server
function sendData(bikeData){
    // socket emit event named "bikeAmper" with data
    socket.emit("bikeAmper", bikeData);
};

//sendData(data);
 

/*
--== SerialPort Instance ==--

Used to set Serial port communication
*/ 

const port = new SerialPort({
    path: '/dev/ttyACM0',
    baudRate: 9600,
    function (err) {
        if (err) {
            return console.log('Error :', err.message);
        }
    }
});

/*
--== ReadlineParser Instance ==--

Used to emit data after newline (arduino:println) delimiter received.
Default encoding option is : UTF8.
*/ 

const parser = new ReadlineParser({delimiter:"\n"});

port.pipe(parser);

//Set comminication usig parse (every newline received)
parser.on('data', function (data){
    
    //hexa to float conversion
    let bikeOutput = parseFloat(data);
    
    // if bike make current 
    if (bikeOutput > 0){
        console.log(bikeOutput);
        //send 'bikeOutput' value to distant socket server
        sendData(bikeOutput);
    }
});



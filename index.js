"use strict"

//import node libs
const { SerialPort } = require('serialport'); 
const { ReadlineParser} = require ('@serialport/parser-readline');

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
    
    if (bikeOutput > 0){
        console.log(bikeOutput);
    }
});



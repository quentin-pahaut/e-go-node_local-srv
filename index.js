"use strict"


const { SerialPort } = require('serialport'); 
console.log(SerialPort);

const port = new SerialPort({
    path: '/dev/ttyACM0',
    baudRate: 9600,
})

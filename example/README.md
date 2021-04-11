# ESCPos Server Example
In this example, you will send `text` command to the `ESCPos` server and print `Hello World`. I create a little wrapper library (escpos.js)[https://github.com/share424/ecspos-server/blob/master/example/escpos.js] to make your life easier

# How to use?
```
// create new ESCPos and set the server location and the print options
// Please refer to https://www.npmjs.com/package/escpos for more information about the options
const escpos = new ESCPos("http://localhost:3000", {
    encoding: "GB18030" // default encoding
});

// Now we can send the print command to the server
escpos
    .text("Hello World")
    .cut() // this command is important to flush the buffer
    .close() // this command is important to close the connection
    .print(); // this command is important to send the commands
```
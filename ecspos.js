const escpos = {
    print: async function(event, commands, options) {
        const escpos = require('escpos');
        escpos.USB = require('escpos-usb');
        const device  = new escpos.USB();
        if(!device) {
            event.sender.send('log', 'No Printer detected');
        }
        const printer = new escpos.Printer(device, options);

        await device.open(async function(error) {
            if(error) {
                event.sender.send('log', 'Failed to connect to device');
                console.log(error);
            }
            for(let i = 0; i<commands.length; i++) {
                const command = commands[i];
                event.sender.send('log', 'Execute: ' + JSON.stringify(command));
                switch(command.command) {
                    case 'text': printer.text(...command.args); break;
                    case 'image': await printer.image(...command.args); break;
                    case 'encode': printer.encode(...command.args); break;
                    case 'control': printer.control(...command.args); break;
                    case 'align': printer.align(...command.args); break;
                    case 'font': printer.font(...command.args); break;
                    case 'size': printer.size(...command.args); break;
                    case 'barcode': await printer.barcode(...command.args); break;
                    case 'options': printer.options(...command.args); break;
                    case 'cut': printer.cut(...command.args); break;
                    case 'cashdraw': printer.cashdraw(...command.args); break;
                    case 'beep': printer.beep(...command.args); break;
                    case 'close': printer.close(...command.args); break;
                    default: event.sender.send('log', "Command " + command.command + " is not found");
                }
            }
        });
    }
}

module.exports = escpos;
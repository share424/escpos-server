# ESCPOS Server
This is a simple ESCPos Server written in [NodeJS](https://nodejs.org). This project use [node-escpos](https://www.npmjs.com/package/escpos) as the printer driver. If you have any issue with the printer driver, please refer to their site.

# How to use
1. Download the compiled server on the release page (Currently available on Windows, you can compile the server by yourself)
2. Install the usb adapter (Please refer to [this](https://github.com/share424/escpos-server#how-to-install-the-usb-adapter) section)
3. Open the `ESCPos.exe`
4. Set your port (default `3000`)
5. Click `Start Server` button
6. Wait until the server started
7. Now you can send http post request to the server to execute node-escpos [commands](https://www.npmjs.com/package/escpos#methods)

Example Commands:
```
{
    "commands": [
        {
            "command": "text",
            "args": ["Hello World"]
        },
        {
            "command": "cut", // this command is important, because cut will flush the buffer printer
            "args": []
        },
        {
            "command": "close", // this command is important to close the printer connection
            "args": []
        }
    ],
    "options": {
        "encoding": "GB18030"
    }
}
```

# How to install the usb adapter
+ On Linux, you'll need `libudev` to build libusb.
+ On Ubuntu/Debian: `sudo apt-get install build-essential libudev-dev`
+ On Windows, Use [Zadig](https://zadig.akeo.ie/) to install the WinUSB driver for your USB device

# How to use Zadig on windows
1. Download [Zadig](https://zadig.akeo.ie/)
2. Connect your printer
3. Open Zadig
4. Select Options -> List all devices
5. Select your printer from the dropdown list (Note: Be careful! select the right printer, because this software will replace your device driver)
6. Select WinUSB
7. Replace Driver, wait until the process finished

if you have any trouble or issue, please refer to the [Zadig](https://zadig.akeo.ie/) site

# Example
you can try the example [here](https://github.com/share424/escpos-server/blob/master/example)

# How to build your own server
1. Install [NodeJs](https://nodejs.org) (I'm using version `12`)
2. Install the dependencies `npm install` or `yarn install`
3. Run `npm run make`
4. Check the `out` directory, your binary files will be there

this project use [ElectronJS](https://electronjs.org) to create the GUI

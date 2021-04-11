const { app, BrowserWindow } = require('electron')
const { ipcMain } = require('electron')
const server = require('./server');
const path = require('path')


function createWindow () {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
		preload: path.join(__dirname, 'preload.js')
		}
	})

	win.loadFile('index.html')
}

let serverApp;

ipcMain.handle('start-server', async (event, ...args) => {
	serverApp = await server.createServer(event, args[0]);
});

ipcMain.handle('stop-server', (event, ...args) => {
	if(serverApp) {
		serverApp.close();
		event.sender.send('log', "Server stopped");
		event.sender.send('server-status', 'stopped')
	}
});

ipcMain.handle('test', async (event) => {
	event.sender.send('log', "Test Print");
	const escpos = require('./ecspos');
	escpos.print(event, [
		{
			command: 'text',
			args: ["Hello World"]
		},
		{
			command: 'cut',
			args: []
		},
		{
			command: 'close',
			args: []
		}
	], {
		encoding: "GB18030"
	})
	.catch(err => {
		console.log(err);
		event.sender.send('log', err);
	})
})

app.whenReady().then(() => {
	createWindow()

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow()
		}
	})
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

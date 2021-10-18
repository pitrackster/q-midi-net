const { app, BrowserWindow } = require('electron')
const path = require('path')
const dgram = require('dgram');
const PORT = 21928
const HOST = '225.0.0.37'
const { ipcMain } = require('electron') 

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,

        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
        }
    })



    const noteOn = Buffer.from([0x90, 0x60, 0x7f])
    const noteOff = Buffer.from([0x80, 0x60, 0])
    const client = dgram.createSocket('udp4');

    ipcMain.on('send-note-on', (event, arg) => {
        event.returnValue = 'toto'
        client.send(noteOn, 0, noteOn.byteLength, PORT, HOST, function (err, bytes) {
            if (err) throw err;
            console.log('UDP message sent to ' + HOST + ':' + PORT);
            //client.close();
        });
    })

    ipcMain.on('send-note-off', (event, arg) => {
        event.returnValue = 'titi'
        client.send(noteOff, 0, noteOn.byteLength, PORT, HOST, function (err, bytes) {
            if (err) throw err;
            console.log('UDP message sent to ' + HOST + ':' + PORT);
            //client.close();
        });
    })

    win.loadFile('index.html')
}


app.whenReady().then(() => { createWindow() })

app.on('window-all-closed', function () { if (process.platform !== 'darwin') app.quit() })
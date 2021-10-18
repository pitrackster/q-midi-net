
// import the module -->
const { ipcRenderer } = require('electron')

console.log('titi')

document.getElementById('start').addEventListener('click', function () {
    var result = ipcRenderer.sendSync('send-note-on', '')

    //process our data however we want, in this example we print it on the browser console -->
    console.log(result)
})

document.getElementById('stop').addEventListener('click', function () {
    var result = ipcRenderer.sendSync('send-note-off', '')

    //process our data however we want, in this example we print it on the browser console -->
    console.log(result)
})

// here we request our message and the event listener we added before, will respond and because it's JSON file we need to parse it -->


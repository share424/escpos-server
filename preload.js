const { ipcRenderer } = require('electron')

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const type of ['chrome', 'node', 'electron']) {
      replaceText(`${type}-version`, process.versions[type])
    }

    const btnStartServer = document.getElementById("btn-start-server");
    const btnTest = document.getElementById("btn-test");
    const log = document.getElementById("log");

    let serverStatus = 'stopped';

    btnStartServer.addEventListener("click", function() {
        if(serverStatus == 'stopped') {
            const port = document.getElementById("port").nodeValue;
            ipcRenderer.invoke('start-server', port);
            btnStartServer.disabled = true;
        } else if(serverStatus == 'started') {
            ipcRenderer.invoke('stop-server');
        }
    });

    btnTest.addEventListener("click", function() {
        ipcRenderer.invoke("test");
    });

    ipcRenderer.on('server-status', function(event, args) {
        serverStatus = args;
        if(args == 'starting') {
            btnStartServer.innerHTML = "Starting Server...";
        } else if(args == 'started') {
            btnStartServer.innerHTML = "Stop";
            btnStartServer.classList.remove("btn-primary");
            btnStartServer.classList.add("btn-danger");
            btnStartServer.disabled = false;
        } else if(args == 'stopped') {
            btnStartServer.innerHTML = "Start Server";
            btnStartServer.classList.add("btn-primary");
            btnStartServer.classList.remove("btn-danger");
        }
    });

    ipcRenderer.on('log', function(event, args) {
        const value = log.innerHTML;
        if(value != "") {
            log.innerHTML = value + "\n" + args;
        } else {
            log.innerHTML = args;
        }
    });
})


  
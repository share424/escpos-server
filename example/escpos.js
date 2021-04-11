function ESCPos(server, options) {

    this.commands = [];

    this.addCommand = function(command, args) {
        this.commands.push({
            command,
            args
        })
    }

    this.text = function(...args) {
        this.addCommand('text', args);
        return this;
    }

    this.image = function(...args) {
        this.addCommand('image', args);
        return this;
    }

    this.encode = function(...args) {
        this.addCommand('encode', args);
        return this;
    }

    this.control = function(...args) {
        this.addCommand('control', args);
        return this;
    }

    this.align = function(...args) {
        this.addCommand('align', args);
        return this;
    }

    this.font = function(...args) {
        this.addCommand('font', args);
        return this;
    }

    this.size = function(...args) {
        this.addCommand('size', args);
        return this;
    }

    this.barcode = function(...args) {
        this.addCommand('barcode', args);
        return this;
    }

    this.options = function(...args) {
        this.addCommand('options', args);
        return this;
    }

    this.cut = function(...args) {
        this.addCommand('cut', args);
        return this;
    }

    this.cashdraw = function(...args) {
        this.addCommand('cashdraw', args);
        return this;
    }

    this.beep = function(...args) {
        this.addCommand('beep', args);
        return this;
    }

    this.close = function(...args) {
        this.addCommand('close', args);
        return this;
    }

    this.print = function(onSuccess) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                if(onSuccess) onSuccess();
            }
        }
        xhr.open("POST", server, true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify({
            commands: this.commands,
            options: options
        }))
    }

}
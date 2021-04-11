const server = {
    createServer: async function(event, port) {
        port = port || 3000;
        console.log("Starting server at port " + port);
        event.sender.send('server-status', 'starting');
        event.sender.send('log', 'Starting server at port ' + port);
        
        // Require the framework and instantiate it
        const fastify = require('fastify')({ logger: true });
        await fastify.register(require('fastify-cors'), {});

        // Declare a route
        fastify.post('/', async (request, reply) => {
            event.sender.send('log', 'Print request received');
            event.sender.send('log', 'Print options: ' + JSON.stringify(request.body.options));
            const escpos = require('./ecspos');
            escpos.print(event, request.body.commands, request.body.options)
                .catch(err => {
                    console.log(err);
                    event.sender.send('log', err);
                })
            return { status: 'ok' }
        })

        // Run the server!
        const start = async () => {
            try {
                await fastify.listen(port)
            } catch (err) {
                fastify.log.error(err)
                event.sender.send('log', err);
                process.exit(1)
            }
        }
        await start()

        
        event.sender.send('server-status', 'started');
        event.sender.send('log', 'Server started. Send post request to http://localhost:' + port);
        console.log("Server started");

        return fastify;
    }
}

module.exports = server;
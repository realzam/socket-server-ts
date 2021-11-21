import express from 'express';
import * as http from 'http';
import * as sockio from "socket.io";
import * as path from 'path';
import Sockets from './Sockets';
import cors from 'cors'

class Server {


    constructor(
        private app = express(),
        private port = process.env.PORT,
        private server = http.createServer(app),
        public io = new sockio.Server(server, {
            cors: {
                origin: '*',
            }
        }),
    ) {
        this.execute()
    }

    public execute() {
        this.middlewares()
        this.server.listen(this.port, () => {
            console.log('Server correindo en puerto :' + this.port);

        });
        this.configurarSockets()
    }

    public middlewares() {
        this.app.use(express.static(path.resolve(__dirname, '..', 'public')));
        //CORS
        this.app.use(cors())


    }

    public configurarSockets() {
        new Sockets(this.io)
    }


}

export default Server;
import * as sockio from "socket.io";

class Sockets {

    constructor(
        public io: sockio.Server,
        // public clientes
    ) {
        this.socketEvents()
    }

    socketEvents() {


        this.io.on('connection', (socket) => {

            socket.on('mensaje-to-server', (data: { msg: string }) => {
                console.log(data);

                this.io.emit('mensaje-from-server', data);
            })


        });
    }


}

export default Sockets;
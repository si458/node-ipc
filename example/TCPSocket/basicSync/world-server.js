var ipc=require('../../../node-ipc');

/***************************************\
 *
 * You should start both hello and world
 * then you will see them communicating.
 *
 * *************************************/

ipc.config.id   = 'world';
ipc.config.retry= 1500;
ipc.config.sync = true; //sync servers do not bradcast defined events

ipc.serveNet(
    function(){
        ipc.server.on(
            'message',
            function(data,socket){
                ipc.log('got a message : '.debug, data);
                //fake some synch procedural code
                setTimeout(
                    function(){
                        ipc.server.emit(
                            socket,
                            'message',
                            data+' world!'
                        );
                    },
                    3000
                );
            }
        );

        ipc.server.on(
            'socket.disconnected',
            function(data,socket){
                console.log(arguments)
            }
        );
    }
);

ipc.server.define.listen.message='This event type listens for message strings as value of data key.';

ipc.server.start();
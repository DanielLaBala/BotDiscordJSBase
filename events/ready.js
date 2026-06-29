const { Events } = require('discord.js'); 

module.exports = (client) => {
    client.once(Events.ClientReady, (clientReady) => { // Suscripcion al evento 'ready' se llamara lo que hay dentro cuando se emita. Once = una sola vez.
        console.log(`Bot conectado como ${clientReady.user.tag}`);
    });
}
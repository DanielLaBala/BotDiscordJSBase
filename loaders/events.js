const fs = require('fs');
const path = require('path');
// Ejecutan los eventos de forma dinamica, la alternativa para tenerlo separado seria ir ejecutando uno por uno con requires en el main si no, en java se usaria reflexion
module.exports = (client) => {
    const eventsPath = path.join(__dirname, "..", 'events'); 
    const eventFiles = fs.readdirSync(eventsPath).filter(f => f.endsWith('.js'));

    for (const file of eventFiles) {
        const event = require(path.join(eventsPath, file)); 
        event(client);
    }
}
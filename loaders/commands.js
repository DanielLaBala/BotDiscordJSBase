const fs = require('fs');
const path = require('path');
// Guardan los comandos en el cliente para luego en el evento de MessageListener poderlos ejecutar
module.exports = (client) => {
    const commandsPath = path.join(__dirname, "..", 'commands'); // Al ser una aplicacion de un servidor no tiene sentido empaquetar la app y no dara problemas, aun asi se podria empaquetar y entonces tendriamos que usar otra manera para importar modulos de js (require, de forma estatica como lo hice en el bot de discord) pero como es un server y no un client no tiene sentido
    const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(path.join(commandsPath, file)); // Nos permite usar las funciones que se declaren en el exports y si no hay exports pues todas, se usan como si fueran metodos de Java
        client.commands.set(command.name, command); // Añadimos el comando al registro de comandos del bot
    }

    console.log(`${client.commands.size} comandos cargados`);
}
const { Client, GatewayIntentBits, Collection } = require('discord.js'); 

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection(); // Añadimos al objeto de la clase Client un atributo .commands que es un Hash, donde guardaremos los comandos, esto se puede hacer porque en js los objetos son Hash al final, aun asi en proyectos mas grandes es mejor extender la clase usando TypeScript asi el IDE te puede autocompletar
// ^^ Collection es un Map de js pero con mas cosas añadidas por discord.js

module.exports = client; // Devolvemos el cliente

// Este script en Java se haria con un gestor de cliente por ejemplo (el caso tipico en java seria con el caso de una bdd, tiene un metodo para crear la conexion que devuelve la conexion, aqui devuelve el cliente)
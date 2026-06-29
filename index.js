require('dotenv').config({quiet: true}); // Añade las variables en las variables de entorno, luego las añade a process.env, process es una variable que te da informacion del proceso que se esta ejecutando de Node.js 

// A partir de 2500 servidores hace falta iniciarlo con ShardingManager 

const client = require("./client")
const loadCommands = require("./loaders/commands")
const loadEvents = require("./loaders/events")

loadCommands(client);
loadEvents(client);

client.login(process.env.DISCORD_TOKEN); // Hacemos la conexion, llama a la API de discord, pilla si puede usarlo y en que servidores se encuentra el bot en para luego mandar mensajes con el, y crea una conexion mediante WebSocket donde se enviaran eventos como los de mensajes recibidos y demas
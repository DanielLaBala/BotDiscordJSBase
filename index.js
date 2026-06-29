require('dotenv').config();
const { Client, GatewayIntentBits, Collection, Events } = require('discord.js'); 
const fs = require('fs');
const path = require('path');

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection(); // Añadimos al objeto de la clase Client un atributo .commands que es un Hash, donde guardaremos los comandos, esto se puede hacer porque en js los objetos son Hash al final, aun asi en proyectos mas grandes es mejor extender la clase usando TypeScript asi el IDE te puede autocompletar

const commandsPath = path.join(__dirname, 'commands'); // Al ser una aplicacion de un servidor no tiene sentido empaquetar la app y no dara problemas, aun asi se podria empaquetar y entonces tendriamos que usar otra manera para importar modulos de js (require, de forma estatica como lo hice en el bot de discord) pero como es un server y no un client no tiene sentido
const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));
  client.commands.set(command.name, command); // Añadimos el comando al registro de comandos del bot
}

const prefix = 'd';
  
client.once(Events.ClientReady, () => { // Suscripcion al evento 'ready' se llamara lo que hay dentro cuando se emita. Once = una sola vez.
  console.log(`Bot conectado como ${client.user.tag}`);
});

client.on(Events.MessageCreate, async (message) => { // Suscripcion al evento 'messageCreate' o el enum Events.MessageCreate recibe un mensaje y todo lo de dentro es asincrono. On = siempre que pase el evento.
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/); // Evitamos leer el prefix, quitamos espacios en blanco y lo separamos por espacios en blanco para sacar los argumentos, es una regex
    const commandName = args.shift().toLowerCase(); // Saca el comando exacto y lo quita del array de args

    const command = client.commands.get(commandName); // Sacamos el objeto del comando del registro de comandos del bot
    
    if (!command) return;

    try { //
        await command.execute(message, args, client); // En JS al igual que se pueden añadir atributos a un objeto, se pueden pasar atributos de mas a una funcion por el tema del polimorfismo, algunos lo van a utilizar y otros no
    } catch (error) {
        console.error(`Error en comando ${commandName}:`, error);
        await message.reply('Hubo un error ejecutando ese comando.');
    }
});

client.login(process.env.DISCORD_TOKEN); // Hacemos la conexion, llama a la API de discord, pilla si puede usarlo y en que servidores se encuentra el bot en para luego mandar mensajes con el, y crea una conexion mediante WebSocket donde se enviaran eventos como los de mensajes recibidos y demas
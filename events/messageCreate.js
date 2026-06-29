const { Events, Collection } = require('discord.js'); 
const cooldown = require("../utils/cooldown")

module.exports = (client) => {
    const prefix = process.env.PREFIX;
    
    let saludoInicial = false;

    client.on(Events.MessageCreate, async (message) => { // Suscripcion al evento 'messageCreate' o el enum Events.MessageCreate recibe un mensaje y todo lo de dentro es asincrono. On = siempre que pase el evento.
        if (message.author.bot) return;
        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/); // Evitamos leer el prefix, quitamos espacios en blanco y lo separamos por espacios en blanco para sacar los argumentos, es una regex
        const commandName = args.shift().toLowerCase(); // Saca el comando exacto y lo quita del array de args

        const command = client.commands.get(commandName); // Sacamos el objeto del comando del registro de comandos del bot

        if (!command) return;

        let cooldownTime = cooldown(command, message.author.id); // Devuelve null si no tiene cd, sino devuelve el tiempo faltante.

        if (cooldownTime != null) { // Si no es null tiene cd
            return message.reply(`Te faltan ${cooldownTime} para volver a usar este comando.`); // Sera una promesa, no hace falta esperar (await) para nada, to fixed hace que solo haya 1 decimal
        }

        if (message.author.id == 480073126151979020 && !saludoInicial) {
          saludoInicial = true;
          await message.channel.send("Hi creator.");
        }

        try { //
            await command.execute(message, args, client); // En JS al igual que se pueden añadir atributos a un objeto, se pueden pasar atributos de mas a una funcion por el tema del polimorfismo, algunos lo van a utilizar y otros no
        } catch (error) {
            console.error(`Error en comando ${commandName}:`, error);
            await message.reply('Hubo un error ejecutando ese comando.');
        }
    });
}
module.exports = {
    name: "help",
    description: "PLACEHOLDER DESCRIPTION",
    
    async execute(message, args, client) {
        let mensaje = "";

        for (const comando of client.commands.values()) { // en este caso of > in al ser un Hash con clave y valor
            mensaje += `\`${process.env.PREFIX}${comando.name}\` -- ${comando.description} \n`; 
        }

        await message.reply(mensaje);
        
    }
}
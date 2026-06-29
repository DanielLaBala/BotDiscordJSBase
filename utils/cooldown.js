const { Collection } = require('discord.js'); 

const comandosCooldown = new Collection();

module.exports = (command, userId) => {
    if (command.cooldown) {
        const commandName = command.name;

        if (!comandosCooldown.has(commandName)) {
            comandosCooldown.set(commandName, new Collection()); 
        }

        let cooldownUsuarios = comandosCooldown.get(commandName); 

        const now = Date.now();
        const lastTime = cooldownUsuarios.get(userId); 
        const diferenciaSegundos = (now - lastTime) / 1000

        if (lastTime != null && diferenciaSegundos < command.cooldown) { 
            return (command.cooldown - diferenciaSegundos).toFixed(1);
        }

        cooldownUsuarios.set(userId, now);
        return null;
    }
}
// export default { -> Añadir al package.json lo siguiente -> "type": "module" para utilizar ESModule en vez de CommonJS. Con ESModules hay que usar import en vez de require
module.exports = { // Es digamos el public de Java, para que se pueda importar desde otros scripts, devolvemos un objeto
  name: 'info',
  description: 'PLACEHOLDER DESCRIPTION',

  async execute(message, args, client) {
    await message.reply(
        `**SERVER INFO**\n` +
        `NAME: ${message.guild.name}\n` +
        `MEMBERS COUNT: ${message.guild.memberCount}\n` +
        `CREATED AT: ${message.guild.createdAt.toLocaleDateString('es-ES')}`
    );
  }
};
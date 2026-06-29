// export default { 
module.exports = { // Es digamos el public de Java, para que se pueda importar desde otros scripts, devolvemos un objeto
  name: 'ping',
  description: 'PLACEHOLDER DESCRIPTION',
  cooldown: 10,
  
  async execute(message, args, client) {
    await message.reply(`Ping: ${client.ws.ping}ms`); // Espera a que el servidor le responda (lo delega al SO por ser una operacion de red), el await es lo que desengancha y permite que ahora pueda hacer otra operacion con otro mensaje al estar desbloqueado momentaneamente. Al volver se une a la cola, Node no es apropiativo.
  }
};
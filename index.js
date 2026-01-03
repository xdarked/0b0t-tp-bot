const mineflayer = require('mineflayer')
const tpalist = ["uuid1", "uuid2", "uuid3"] //long uuid - eg "af12dc7d-fe8f-4524-a216-63b8a323e961" (xdarked)



var options = {
  host: "serverip", //server ip 
  port: 25565,
  version: "1.20",
  auth: 'microsoft',
  username: "username", //acount username

};

function startBot() {
  const bot = mineflayer.createBot(options)


bot.once('spawn', () => {
  bot.chatAddPattern(/^(\w+) wants to teleport to you\. \[ACCEPT\] \[DENY\] \[IGNORE\]$/, "tpa", "tparequest");
});
  bot.on('tpa', function (username) {
    console.log(`${username} tried to tp.`)
    let sender_uuid = bot.players[username].uuid;
    if (tpalist.includes(sender_uuid)) {
      bot.chat(`/tpy ${username} `)
      console.log(`accepted tpa from ${username}`)
    } else {
      bot.chat(`/tpn ${username} `)
      console.log(`denided tpa from ${username}`)
    }
  })



  bot.on("login", () => { console.log(`${bot.username} connected to server at ${new Date}`) });
  bot.once("spawn", () => { console.log(`bot spawned at ${bot.entity.position}`) });
  bot.on("end", (reason) => {
  console.log(`Disconnected: ${reason}`)
  setTimeout(() => { startBot() }, 10000)
  });
  bot.on("kicked", (reason) => { console.log(`bot kicked for: ${reason}`) });
  bot.on("error", (err) => { console.error(`Bot error: ${err}`) });
}


startBot()


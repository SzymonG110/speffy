exports.run = async (client, guild) => {

    const { MessageEmbed } = require('discord.js')

    const { channels } = require("../../Data/Config.json")

    const channel = client.channels.cache.get(channels.botJoinLeave)
    channel.send(
        new MessageEmbed()
            .setTimestamp()
            .setColor("RANDOM")
            .setTitle("Dodano na nowy serwer!")
            .setDescription([
                `Nazwa: \`${guild.name}\``,
                `ID: \`${guild.id}\``,
                `ID shard'a: \`${guild.shardID}\``,
                `Użytkownicy: \`${guild.members.cache.filter(u => !u.user.bot).size}\``,
                `Boty: \`${(guild.members.cache.filter(u => u.user.bot).size)}\``,
                `ID właściciela: \`${guild.ownerID}\``,
                `Tag właściciela: \`${client.users.cache.get(guild.ownerID).tag}\``
            ].join("\n"))
    )

}
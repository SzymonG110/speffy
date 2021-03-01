const { MessageEmbed } = require("discord.js")

exports.run = async (client, message) => {

    if (!message.guild) return;
    if (message.author.bot) return;
    if (message.member.hasPermission("MANAGE_MESSAGES")) return

    const db = client.db

    const antyInvite = db.prepare("SELECT * FROM autoMod WHERE guildID = ?").get(message.guild.id)

    if (antyInvite) {

        let invite = false

        const invites = ["discord.gg/", "discord.com/invite", "discordapp.com/invite", "nadsc.pl", "marketingbot.tk", "market-bot.pl"]

        invites.forEach(inv => {
            if (message.content.includes(inv)) invite = true
        })

        if (invite) {

            message.delete()

            const inviteEmbed = new MessageEmbed()
                .setAuthor(`AutoMod ${client.user.username}!`, client.user.displayAvatarURL())
                .setColor(client.config.embedErrorColor)
                .setDescription(`${message.author.tag} (\`${message.author.id}\`) złamał regulamin i wysłał zaproszenie na inny serwer!`)
                .setFooter(`Wysłał: ${message.author.tag} ( ${message.author.id} )`, message.author.displayAvatarURL({ dynamic: true }))
            message.channel.send(inviteEmbed)

        }

    }

}
const { MessageEmbed } = require("discord.js")

class Embeds {

    constructor() { };

    create(message, client, title, emoji, desc, color, channel) {

        if (message != "") {

            const embed = new MessageEmbed()
                .setTitle(emoji ? `${emoji}  •  ${title}` || `Nie ustawiono` : title || `Nie ustawiono`)
                .setDescription(desc ? desc : `Nie ustawiono`)
                .setColor(color ? color : client.config.embedSuccessColor)
                .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                .setFooter(`Wykonał: ${message.author.tag}`, client.user.displayAvatarURL())
                .setTimestamp()
            channel ? channel.send(embed) : message.channel.send(embed)

        } else {

            const embed = new MessageEmbed()
                .setTitle(emoji ? `${emoji}  •  ${title}` || `Nie ustawiono` : title || `Nie ustawiono`)
                .setDescription(desc ? desc : `Nie ustawiono`)
                .setColor(color ? color : client.config.embedSuccessColor)
                .setTimestamp()
            channel.send(embed)

        }

    }

    error(message, client, desc) {

        const embed = new MessageEmbed()
            .setTitle(`:x:  •  Błąd!`)
            .setDescription(desc ? desc : `Nie ustawiono`)
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .setFooter(`Wykonał: ${message.author.tag}`, client.user.displayAvatarURL())
            .setTimestamp()
            .setColor(client.config.embedErrorColor)
        message.channel.send(embed)

    }

}

module.exports = Embeds;
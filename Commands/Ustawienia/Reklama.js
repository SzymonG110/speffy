const { MessageEmbed } = require("discord.js")

exports.run = async (client, message, args) => {

    const db = client.db
    const data = await db.prepare("SELECT * FROM adSettings WHERE guildID = ?").get(message.guild.id)

    if (!data)
        return {

            embed: {

                type: "error",
                desc: "Najpierw ustaw kanał!"

            }


        }

    const channel = message.guild.channels.cache.get(data.channelID)
    let blocked = false
    let errBlacklist = false

    if (!data || !channel)
        return {

            embed: {

                type: "error",
                desc: "Najpierw ustaw kanał!"

            }


        }

    await channel.permissionOverwrites.forEach(p => {
        const perms = channel.permissionsFor(p.id).serialize()
        if (perms["VIEW_CHANNEL"] === false || perms["READ_MESSAGE_HISTORY"] === false) blocked = true
    })

    if (blocked === true)
        return {

            embed: {

                type: "error",
                desc: "Najpierw ustaw kanał!"

            }


        }

    const adStatus = db.prepare("SELECT * FROM adVerification WHERE guildID = ?").get(message.guild.id)

    if (adStatus)
        return {

            embed: {

                type: "error",
                desc: "Reklama jest w trakcie weryfikacji!"

            }


        }

    if (!args[0])
        return {

            embed: {

                type: "error",
                desc: "Należy podać treść reklamy!"

            }


        }

    const content = args.join(" ")

    if (content.length < 30 || content.length > 1000)
        return {

            embed: {

                type: "error",
                desc: "Długość reklamy musi wynosić minimalnie 30 znaków, a maksymalnie 1000!"

            }


        }

    if (message.mentions.users.first() || message.mentions.roles.first() || message.content.includes("@everyone") || message.content.includes("@here"))
        return {

            embed: {

                type: "error",
                desc: "Reklama nie może zawierać żadnych wzmianek!"

            }


        }

    const blackList = ["discord.gg/", "discord.com/invite", "discordapp.com/invite", "nadsc.pl", "marketingbot.tk", "market-bot.pl"]

    blackList.forEach(word => {
        if (message.content.includes(word)) errBlacklist = true
    })

    if (errBlacklist === true)
        return {

            embed: {

                type: "error",
                desc: "Reklama nie może zawierać zaproszenia na serwer!"

            }


        }

    db.prepare("UPDATE adSettings SET ad = ? WHERE guildID = ?").run(content, message.guild.id)
    db.prepare("INSERT INTO adVerification (guildID, userID) VALUES (?,?)").run(message.guild.id, message.author.id)

    const verification = db.prepare("SELECT * FROM adVerificated WHERE guildID = ?").get(message.guild.id)
    const number = db.prepare("SELECT * FROM adNumber WHERE guildID = ?").get(message.guild.id)

    const kanal = client.config.channels.verification

    if (verification)
        db.prepare("DELETE FROM adVerificated WHERE guildID = ?").run(message.guild.id)

    if (number) {

        client.channels.cache.get(kanal).send(`ID reklamy: \`${number.number}\`! Należy zweryfikować reklamę pod to samo ID.`)
        db.prepare("DELETE FROM adNumber WHERE guildID = ?").run(message.guild.id)

    }

    new client.embeds().create(message, client,
        "Reklama do weryfikacji!",
        ":newspaper:",
        `Reklama serwera: \`${message.guild.name} (${message.guild.id})\`,
        Użytkownik: \`${message.author.tag} \` [\`(${message.author.id})\` (<@!${message.author.id}>)],
        Zaproszenie: ${data.invite},
        Treść:\n${content}`,
        client.config.embedSuccessColor,
        client.channels.cache.get(kanal)
    )

    return {

        embed: {

            type: "success",
            title: "Reklama",
            emoji: ":gear:",
            desc: `Pomyślnie wysłano reklamę do weryfikacji.`

        }

    }

}


exports.info = {

    name: 'reklama',
    aliases: ["ad"],
    description: 'Ustawia reklame serwera.',
    category: 'Ustawienia',
    permissions: 'MANAGE_GUILD',
    usage: '<reklama>'

}
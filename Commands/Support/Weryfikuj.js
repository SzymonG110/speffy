exports.run = async (client, message, args) => {

    if (!message.member.roles.cache.has(client.config.roles.verificator))
        return {

            embed: {

                type: "error",
                desc: "Nie jesteś weryfikatorem reklam!"

            }

        }

    if (message.channel.id !== client.config.channels.verification) return message.author.send(`<#${client.config.channels.verification}>`)

    if (!args[0] || isNaN(args[0]))
        return {

            embed: {

                type: "error",
                desc: "Należy podać ID serwera!"

            }


        }

    if (!args[1] || isNaN(args[1]))
        return {

            embed: {

                type: "error",
                desc: "Należy podać numer na które zostanie dodana reklama!"

            }


        }

    const db = client.db
    const check = db.prepare("SELECT * FROM adVerification WHERE guildID = ?").get(args[0])

    if (!check)
        return {

            embed: {

                type: "error",
                desc: "Nie ma takiej reklamy do sprawdzenia!"

            }


        }

    const checkNum = db.prepare("SELECT * FROM adNumber WHERE number = ?").get(`${Number(args[1])}`)
    if (checkNum)
        return {

            embed: {

                type: "error",
                desc: "Ten numer jest już zajęty!"

            }


        }

    const guild = client.guilds.cache.get(args[0])
    if (!guild) {

        db.prepare("DELETE FROM adVerification WHERE guildID = ?").run(args[0])

        return {

            embed: {

                type: "error",
                desc: "Bot nie jest na podanym serwerze!"

            }


        }

    }

    const adSettings = db.prepare("SELECT * FROM adSettings WHERE guildID = ?").get(args[0])
    const adVerification = db.prepare("SELECT * FROM adVerification WHERE guildID = ?").get(args[0])

    /* NA KANAŁ DO LOGÓW */
    new client.embeds().create(message, client,
        "Reklama zweryfikowana!",
        ":newspaper:",
        `Reklama serwera \`${guild.name}\` została zweryfikowana! Numer reklamy: \`${Number(args[1])}\`.`,
        client.config.embedSuccessColor,
        client.channels.cache.get(client.config.channels.logs)
    )

    try {
        /* DO UŻYTKOWNIKA */
        new client.embeds().create(message, client,
            "Reklama zweryfikowana!",
            ":newspaper:",
            `Reklama Twojego serwera \`${guild.name}\` została zweryfikowana! Numer reklamy: \`${Number(args[1])}\`.`,
            client.config.embedSuccessColor,
            guild.members.cache.get(adVerification.userID)
        )
    } catch (e) { }

    try {
        /* NA KANAŁ UŻYTKOWNIKA */
        new client.embeds().create(message, client,
            "Reklama zweryfikowana!",
            ":newspaper:",
            `Reklama Twojego serwera \`${guild.name}\` została zweryfikowana! Numer reklamy: \`${Number(args[1])}\`.`,
            client.config.embedSuccessColor,
            client.channels.cache.get(adSettings.channelID)
        )
    } catch (e) { }

    db.prepare("INSERT INTO adNumber (guildID, number) VALUES(?,?)").run(args[0], `${Number(args[1])}`)
    db.prepare("INSERT INTO adVerificated (guildID, userID) VALUES(?,?)").run(args[0], message.author.id)
    db.prepare("DELETE FROM adVerification WHERE guildID = ?").run(args[0])

    if (!db.prepare("SELECT * FROM adSended WHERE guildID = ?").get(args[0]))
        db.prepare("INSERT INTO adSended (guildID, number) VALUES(?,?)").run(args[0], `0`)

    return {

        embed: {

            type: "success",
            title: "Reklama zweryfikowana!",
            emoji: ":newspaper:",
            desc: `Pomyślnie zweryfikowano reklamę.`

        }

    }

}


exports.info = {

    name: 'weryfikuj',
    aliases: ["wer", "acc", "accept", "zweryfikuj", "zwer"],
    description: 'Weryfikuje reklamę.',
    category: 'Support',
    usage: '<ID serwera> <numer reklamy>'

}
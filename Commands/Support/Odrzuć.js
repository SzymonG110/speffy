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

    if (!args[1])
        return {

            embed: {

                type: "error",
                desc: "Należy podać powód odrzucenia!"

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
        "Reklama odrzucona!",
        ":newspaper:",
        `Reklama serwera \`${guild.name}\` została odrzucona! Powód: \`${args.slice(1).join(" ")}\`.`,
        client.config.embedSuccessColor,
        client.channels.cache.get(client.config.channels.logs)
    )

    try {
        /* DO UŻYTKOWNIKA */
        new client.embeds().create(message, client,
            "Reklama odrzucona!",
            ":newspaper:",
            `Reklama Twojego serwera \`${guild.name}\` została odrzucona! Powód: \`${args.slice(1).join(" ")}\`.`,
            client.config.embedSuccessColor,
            guild.members.cache.get(adVerification.userID)
        )
    } catch (e) { }

    try {
        /* NA KANAŁ UŻYTKOWNIKA */
        new client.embeds().create(message, client,
            "Reklama zweryfikowana!",
            ":newspaper:",
            `Reklama Twojego serwera \`${guild.name}\` została odrzucona! Powód: \`${args.slice(1).join(" ")}\`.`,
            client.config.embedSuccessColor,
            client.channels.cache.get(adSettings.channelID)
        )
    } catch (e) { }

    db.prepare("INSERT INTO adVerificated (guildID, userID) VALUES(?,?)").run(args[0], message.author.id)
    db.prepare("DELETE FROM adVerification WHERE guildID = ?").run(args[0])

    return {

        embed: {

            type: "success",
            title: "Reklama odrzucona!",
            emoji: ":newspaper:",
            desc: `Pomyślnie odrzucono reklamę.`

        }

    }

}


exports.info = {

    name: 'odrzuć',
    aliases: ["odrzuc", "decline", "dec", "dis", "discard"],
    description: 'Odrzuca reklamę.',
    category: 'Support',
    usage: '<ID serwera> <powód>'

}
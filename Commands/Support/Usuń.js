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

    const verification = db.prepare("SELECT * FROM adNumber WHERE guildID = ?").get(args[0])
    if (!verification)
        return {

            embed: {

                type: "error",
                desc: "Zamieniać można tylko zweryfikowane reklamy!"

            }


        }

    let check = db.prepare("SELECT * FROM adNumber WHERE guildID = ?").get(args[0])

    if (!check)
        return {

            embed: {

                type: "error",
                desc: "Nie ma takiej reklamy do zamiany!"

            }


        }

    const guild = client.guilds.cache.get(args[0])
    if (!guild) {

        check = check.number

        db.prepare("DELETE FROM adNumber WHERE guildID = ?").run(args[0])

        return {

            embed: {

                type: "error",
                desc: `Bot nie jest na podanym serwerze! Zwolnił się numer: \`${check}\`.`

            }


        }

    }

    db.prepare("DELETE FROM adNumber WHERE guildID = ?").run(args[0])

    const adSettings = db.prepare("SELECT * FROM adSettings WHERE guildID = ?").get(args[0])

    /* NA KANAŁ DO LOGÓW */
    new client.embeds().create(message, client,
        "Reklama usunięta!",
        ":newspaper:",
        `Reklama serwera \`${guild.name}\` została usunięta! Powód: \`${args.slice(1).join(" ")}\`.`,
        client.config.embedSuccessColor,
        client.channels.cache.get(client.config.channels.logs)
    )

    try {
        /* NA KANAŁ UŻYTKOWNIKA */
        new client.embeds().create(message, client,
            "Reklama usunięta!",
            ":newspaper:",
            `Reklama Twojego serwera \`${guild.name}\` została usunięra! Powód: \`${args.slice(1).join(" ")}\`.`,
            client.config.embedSuccessColor,
            client.channels.cache.get(adSettings.channelID)
        )
    } catch (e) { }

    return {

        embed: {

            type: "success",
            title: "Reklama usunięta!",
            emoji: ":newspaper:",
            desc: `Pomyślnie usunięto reklamę.`

        }

    }

}


exports.info = {

    name: 'usuń',
    aliases: ["usun", "delete", "remove", "rem"],
    description: 'Usuwa reklamę.',
    category: 'Support',
    usage: '<ID serwera> <powód>'

}
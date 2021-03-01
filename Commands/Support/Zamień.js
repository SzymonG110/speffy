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
                desc: "Należy podać numer na który ma zostać zmieniona reklama!"

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
    db.prepare("INSERT INTO adNumber (guildID, number) VALUES(?,?)").run(args[0], `${Number(args[1])}`)

    const adSettings = db.prepare("SELECT * FROM adSettings WHERE guildID = ?").get(args[0])

    /* NA KANAŁ DO LOGÓW */
    new client.embeds().create(message, client,
        "Numer reklamy zmieniony!",
        ":newspaper:",
        `Reklama serwera \`${guild.name}\` została przeniesiona na inny numer! Numer reklamy: \`${Number(args[1])}\`.`,
        client.config.embedSuccessColor,
        client.channels.cache.get(client.config.channels.logs)
    )

    try {
        /* NA KANAŁ UŻYTKOWNIKA */
        new client.embeds().create(message, client,
            "Numer reklamy zmieniony!",
            ":newspaper:",
            `Reklama Twojego serwera \`${guild.name}\` została przeniesiona na inny numer! Numer reklamy: \`${Number(args[1])}\`.`,
            client.config.embedSuccessColor,
            client.channels.cache.get(adSettings.channelID)
        )
    } catch (e) { }

    return {

        embed: {

            type: "success",
            title: "Numer reklamy zamieniony!",
            emoji: ":newspaper:",
            desc: `Pomyślnie zamieniono numer reklamy.`

        }

    }

}


exports.info = {

    name: 'zamień',
    aliases: ["zamien", "replace", "change", "zmień", "zmien"],
    description: 'Zamienia numer reklamy.',
    category: 'Support',
    usage: '<ID serwera> <numer reklamy>'

}
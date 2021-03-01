exports.run = async (client, message, args) => {

    if (!message.member.roles.cache.has(client.config.roles.verificator))
        return {

            embed: {

                type: "error",
                desc: "Nie jesteś weryfikatorem reklam!"

            }

        }

    if (!args[0] || isNaN(args[0]))
        return {

            embed: {

                type: "error",
                desc: "Należy podać ID serwera bądź numer reklamy!"

            }


        }

    const db = client.db

    let adNumber = db.prepare("SELECT * FROM adNumber WHERE number = ?").get(args[0])
    if (!adNumber) {

        adNumber = db.prepare("SELECT * FROM adNumber WHERE guildID = ?").get(args[0])

        if (!adNumber)
            return {

                embed: {

                    type: "error",
                    desc: "Reklama o takim numerze nie istnieje!"

                }


            }

    }

    const guild = db.prepare("SELECT * FROM adSettings WHERE guildID = ?").get(adNumber.guildID)
    const verificator = db.prepare("SELECT * FROM adVerificated WHERE guildID = ?").get(adNumber.guildID)

    const send = [
        `Numer reklamy: \`${args[0]}\``,
        `Zaproszenie: [kliknij](${guild.invite})`,
        `Serwer: \`${client.guilds.cache.get(adNumber.guildID) ? client.guilds.cache.get(adNumber.guildID).name : "Error"}\` (\`${adNumber.guildID}\`)`,
        `Weryfikator: ${client.users.cache.get(verificator.userID) ? client.users.cache.get(verificator.userID) : "Error"} \` ${client.users.cache.get(verificator.userID) ? client.users.cache.get(verificator.userID).tag : "Error"}\`(\`${verificator.userID}\`)`,
        `Kanał: ${client.channels.cache.get(guild.channelID) ? client.channels.cache.get(guild.channelID) : "Error"} ${client.channels.cache.get(guild.channelID) ? client.channels.cache.get(guild.channelID).name : "Error"}(\`${guild.channelID}\`)`,
        `Reklama (poniżej)`,
        `\n${guild.ad}`
    ]

    return {

        embed: {

            type: "success",
            title: "Informacje o reklamie!",
            emoji: ":newspaper:",
            desc: send

        }

    }

}


exports.info = {

    name: 'infoAd',
    aliases: ["infoad", "adInfo", "adinfo"],
    description: 'Informacje o reklamie.',
    category: 'Support',
    usage: '<numer reklamy / ID serwera>'

}
exports.run = async (client, message, args) => {

    if (!client.config.owners.includes(message.author.id)) return

    if (!args[0] || isNaN(args[0]) || !client.guilds.cache.get(args[0]) || !args[1])
        return {

            embed: {

                type: "error",
                desc: `Podany serwer nie istnieje oraz trzeba podać argument drugi.`

            }

        }

    const on = [
        "nadaj",
        "give",
        "add"
    ]

    const off = [
        "odbierz",
        "usuń",
        "usun",
        "remove"
    ]

    if (on.includes(args[1])) {

        if (client.db.prepare("SELECT * FROM premium WHERE guildID = ?").get(args[0]))
            return {

                embed: {

                    type: "error",
                    desc: `Serwer posiada już premium.`

                }

            }

        client.db.prepare("INSERT INTO premium (guildID, developerID) VALUES (?, ?)").run(args[0], message.author.id)

        return {

            embed: {

                type: "success",
                title: "Premium",
                emoji: ":gear:",
                desc: `Pomyślnie dodano serwer do listy premium.`

            }

        }

    }

    if (off.includes(args[1])) {

        if (!client.db.prepare("SELECT * FROM premium WHERE guildID = ?").get(args[0]))
            return {

                embed: {

                    type: "error",
                    desc: `Serwer nie posiada premium.`

                }

            }

        client.db.prepare("DELETE FROM premium WHERE guildID = ?").run(args[0])

        return {

            embed: {

                type: "success",
                title: "Premium",
                emoji: ":gear:",
                desc: `Pomyślnie usunięto serwer z listy premium.`

            }

        }

    }

    return {

        embed: {

            type: "error",
            desc: `Podano błędne argumenty.`

        }

    }

}


exports.info = {

    name: 'premka',
    description: 'Nadaje / Usuwa premium serwerowi.',
    category: 'Developerskie',
    usage: '<nadaj / usuń> <ID serwera>'

}
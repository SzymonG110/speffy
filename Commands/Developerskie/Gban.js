exports.run = async (client, message, args) => {

	if (!client.config.owners.includes(message.author.id)) return

    if (!args[0] || isNaN(args[0]) || !client.users.cache.get(args[0]) || !args[1])
        return {

            embed: {

                type: "error",
                desc: `Podany użytkownik nie istnieje oraz trzeba podać argument drugi.`

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

    const info = [
        "info",
        "informacje",
        "opis",
        "sprawdź",
        "sprawdz",
        "check"
    ]

    const reason = args.slice(2).join(" ") ? args.slice(2).join(" ") : "BRAK"

    if (on.includes(args[1])) {

        if (client.db.prepare("SELECT * FROM gBan WHERE userID = ?").get(args[0]))
            return {

                embed: {

                    type: "error",
                    desc: `Użytkownik posiada już gBan.`

                }

            }

        client.db.prepare("INSERT INTO gBan (userID, date, developerID, reason) VALUES (?, ?, ?, ?)").run(args[0], `${new Date()}`, message.author.id, reason)

        return {

            embed: {

                type: "success",
                title: "Gban",
                emoji: ":gear:",
                desc: `Pomyślnie dodano użytkownika do listy gBanów.`

            }

        }

    }

    if (off.includes(args[1])) {

        if (!client.db.prepare("SELECT * FROM gBan WHERE userID = ?").get(args[0]))
            return {

                embed: {

                    type: "error",
                    desc: `Użytkownik nie posiada gBana.`

                }

            }

        client.db.prepare("DELETE FROM gBan WHERE userID = ?").run(args[0])

        return {

            embed: {

                type: "success",
                title: "Gban",
                emoji: ":gear:",
                desc: `Pomyślnie usunięto użytkownika z listy gBanów.`

            }

        }

    }

    if (info.includes(args[1])) {

        const gBan = client.db.prepare("SELECT * FROM gBan WHERE userID = ?").get(args[0])

        if (!gBan)
            return {

                embed: {

                    type: "error",
                    desc: `Użytkownik nie posiada gBana.`

                }

            }

        const send = [
            `Użytkownik posiada gBan!`,
            `👤 Użytkownik: ${client.users.cache.get(gBan.userID) ? `${client.users.cache.get(gBan.userID).tag} (\`${client.users.cache.get(gBan.userID).id}\`)` : gBan.userID}.`,
            `🕛 Data nałożenia: \`${gBan.date}\`.`,
            `⚒️ Powód: \`${gBan.reason}\`.`,
            `🕵️ Nałożył: ${client.users.cache.get(gBan.developerID).tag} (\`${client.users.cache.get(gBan.developerID).id}\`).`
        ].join("\n")

        return {

            embed: {

                type: "success",
                title: "Gban",
                emoji: ":gear:",
                desc: send

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

    name: 'gban',
    description: 'Nadaje / Usuwa użytkownikowi globalnego bana.',
    category: 'Developerskie',
    usage: '<nadaj / usuń / info> <ID serwera>'

}
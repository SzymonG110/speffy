exports.run = async (client, message, args) => {

    if (!args[0])
        return {

            embed: {

                type: "error",
                desc: `Należy podać argumenty.`

            }

        }

    const on = [
        "włącz",
        "wlacz",
        "on"
    ]

    const off = [
        "wyłącz",
        "wylacz",
        "off"
    ]

    if (on.includes(args[0])) {

        if (client.db.prepare("SELECT * FROM autoMod WHERE guildID = ?").get(message.guild.id))
            return {

                embed: {

                    type: "error",
                    desc: `Automatyczny moderator jest już włączony na tym serwerze.`

                }

            }

        client.db.prepare("INSERT INTO autoMod (guildID) VALUES (?)").run(message.guild.id)

        return {

            embed: {

                type: "success",
                title: "AutoMod",
                emoji: ":gear:",
                desc: `Włączono automatycznego moderatora.`

            }

        }

    }

    if (off.includes(args[0])) {

        if (!client.db.prepare("SELECT * FROM autoMod WHERE guildID = ?").get(message.guild.id))
            return {

                embed: {

                    type: "error",
                    desc: `Automatyczny moderator jest już wyłączony na tym serwerze.`

                }

            }

        client.db.prepare("DELETE FROM autoMod WHERE guildID = ?").run(message.guild.id)

        return {

            embed: {

                type: "success",
                title: "AutoMod",
                emoji: ":gear:",
                desc: `Wyłączono automatycznego moderatora.`

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

    name: 'autoMod',
    aliases: ["automod", "automatycznnymoderator"],
    description: 'Ustawia automatycznego moderatora.',
    category: 'Ustawienia',
    permissions: 'MANAGE_GUILD',
    usage: '<włącz / wyłącz>'

}
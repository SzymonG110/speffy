exports.run = async (client, message, args) => {

    if (!args[0] || args[0].length > 5)
        return {

            embed: {

                type: "error",
                desc: `Należy podać prefix (mniej niż 5 znaków).`

            }

        }

    client.db.prepare("UPDATE settings SET prefix = ? WHERE guildID = ?").run(args[0], message.guild.id)

    return {

        embed: {

            type: "success",
            title: "Prefix",
            emoji: ":gear:",
            desc: `Pomyślnie zmieniono prefix dla serwera.`

        }

    }

}


exports.info = {

    name: 'prefix',
    aliases: ["przedrostek"],
    description: 'Ustawia prefix serwera.',
    category: 'Ustawienia',
    permissions: 'MANAGE_GUILD',
    usage: '<prefix>'

}
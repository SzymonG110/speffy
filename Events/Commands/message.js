const { MessageEmbed } = require("discord.js")

exports.run = async (client, message) => {

    if (!message.guild) return;
    if (message.author.bot) return;

    if (!client.db.prepare("SELECT * FROM settings WHERE guildID = ?").get(message.guild.id))
        client.db.prepare("INSERT INTO settings (guildID, prefix) VALUES (?, ?)").run(message.guild.id, client.config.prefix)
    const guildInfo = client.db.prepare("SELECT * FROM settings WHERE guildID = ?").get(message.guild.id)

    let prefix = guildInfo.prefix;

    if (message.content === `<@!${client.user.id}>` || message.content === `<@${client.user.id}>`) {

        const pingInformations = [
            `Hej! Najważniejsze informacje znajdziesz linijkę poniżej.`,
            `Mój prefix na tym serwerze to: \`${guildInfo.prefix}\`.`,
            `Wszystkie moje komendy znajdziesz pod komendą: \`${guildInfo.prefix}pomoc\`.`
        ].join("\n")

        return new client.embeds().create(message, client, "Wykryłem moją wzmiankę :D", ":ping_pong:", pingInformations)

    }


    if (!message.content.startsWith(prefix)) prefix = `<@!${client.user.id}>`
    if (!message.content.startsWith(prefix)) prefix = `<@${client.user.id}>`
    if (!message.content.startsWith(prefix)) return

    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const cmd = args.shift().toLowerCase()

    if (cmd.length === 0) return

    let command = client.commands.get(cmd)
    if (!command) command = client.commands.get(client.aliases.get(cmd))
    if (!command)
        return new client.embeds().error(message, client, `Nie ma takiej komendy(\`${prefix}${cmd}\`). Użyj \`${prefix}pomoc\` aby dowiedzieć się jakie bot posiada komendy.`)

    let gban = client.db.prepare("SELECT * FROM gBan WHERE userID = ?").get(message.author.id)

    if (gban && !client.config.owners.includes(message.author.id)) {

        return new client.embeds().error(message, client, "Posiadasz dożywotnią karę na używanie bota. Aby się odwołać należy wejść na support bota.")

    }

    if (command.info.permissions && !message.member.hasPermission(command.info.permissions) && !client.config.owners.includes(message.author.id)) {

        return new client.embeds().error(message, client, `Aby wykonać tą komendę musisz posiadać uprawnienie \`${command.info.permissions}\`!`)

    }

    const result = await command.run(client, message, args)

    if (result) {

        if (result.embed) {

            if (result.embed.type === "error") {

                new client.embeds().error(message, client,
                    result.embed.desc ? result.embed.desc : "Nie ustawiono"
                )

            } else new client.embeds().create(message, client,
                result.embed.title ? result.embed.title : "Nie ustawiono",
                result.embed.emoji ? result.embed.emoji : ":robot:",
                result.embed.desc ? result.embed.desc : "Nie ustawiono",
                result.embed.color ? result.embed.color : client.config.embedSuccessColor
            )

        }

    }

}
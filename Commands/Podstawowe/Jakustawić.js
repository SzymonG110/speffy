exports.run = async (client, message, args) => {

    let prefix = client.db.prepare("SELECT * FROM settings WHERE guildID = ?").get(message.guild.id)
    prefix = prefix.prefix

    const info = [
        `**Jak ustawić moduł reklam:**`,
        `:one: Ustawiasz kanał reklam ( \`${prefix}${client.commands.get("kanał").info.name} ${client.commands.get("kanał").info.usage}\` ).`,
        `:two: Ustawiasz reklamę serwera ( \`${prefix}${client.commands.get("reklama").info.name} ${client.commands.get("reklama").info.usage}\` ) i oczekujesz na weryfikację.`,
        `:three: Cieszysz się promowaniem serwera!`
    ].join("\n")

    return {

        embed: {

            type: "success",
            title: "Jak ustawić",
            emoji: ":question:",
            desc: info

        }

    }

}


exports.info = {

    name: 'jakustawić',
    aliases: ["jakustawic", "jak"],
    description: 'Pomoc w ustawieniu modułu reklam.',
    category: 'Podstawowe'

}
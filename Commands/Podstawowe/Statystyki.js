exports.run = async (client, message, args) => {

    const db = client.db

    const adNumber = db.prepare("SELECT * FROM adNumber WHERE guildID = ?").get(message.guild.id)

    if (!adNumber)
        return {

            embed: {

                type: 'error',
                desc: 'Reklama nie jest zweryfikowana.'
            }

        }

    const adVerificated = db.prepare("SELECT * FROM adVerificated WHERE guildID = ?").get(message.guild.id)
    const adSended = db.prepare("SELECT * FROM adSended WHERE guildID = ?").get(message.guild.id)
    const adSettings = db.prepare("SELECT * FROM adSettings WHERE guildID = ?").get(message.guild.id)

    const send = [
        `Statystyki reklamowania serwera \`${message.guild.name}\`!`,
        `:bookmark: Numer reklamy: \`${adNumber.number}\``,
        `:thumbsup: Kanał: ${message.guild.channels.cache.get(adSettings.channelID)}`,
        `:link: Zaproszenie: ${adSettings.invite}`,
        `<:developer:810067245371097098> Weryfikator: ${client.users.cache.get(adVerificated.userID) ? `${client.users.cache.get(adVerificated.userID).tag} \`(${client.users.cache.get(adVerificated.userID).id})\`` : "BŁĄD"}`,
        `:newspaper: Wysłana: \`${adSended.number}\` razy`,
        `:notepad_spiral: Reklama: (poniżej)`,
        `\n${adSettings.ad}`
    ].join("\n")

    return {

        embed: {

            type: "success",
            title: "Statystyki",
            emoji: ":book:",
            desc: send

        }

    }

}


exports.info = {

    name: 'statystyki',
    aliases: ["stats", "staty", "statystyka"],
    description: 'Statystyki reklamy.',
    category: 'Podstawowe'

}
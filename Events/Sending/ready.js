const { writeFileSync } = require("fs")

exports.run = async (client) => {

    const db = client.db
    const config = client.config

    const isPremium = (id) => {

        const premium = db.prepare("SELECT * FROM premium WHERE guildID = ?").get(id)

        if (!premium) return false
        if (premium) return true

    }

    const supportInfo = (guild, id) => {

        config.number = Number(id) + 1
        writeFileSync("./Data/Config.json", JSON.stringify(config, null, 4))

        new client.embeds().create("", client,
            "Serwer do sprawdzenia!",
            ":newspaper:",
            `Numer reklamy: \`${id}\`,\nSerwer: \`${guild ? guild.name || "Error" : "Error"} (${guild ? guild.id || "Error" : "Error"})\`,\nBłąd: bot został usunięty z serwera bądź kanał został ustawiony jako nie publiczny!`,
            client.config.embedSuccessColor,
            client.channels.cache.get(config.channels.verification)
        )

    }

    setInterval(() => {

        let guildID = db.prepare("SELECT * FROM adNumber WHERE number = ?").get(`${config.number}`)

        let ad

        if (!guildID) {

            config.number = 1
            guildID = db.prepare("SELECT * FROM adNumber WHERE number = ?").get(`${config.number}`)

            if (!guildID) return

            else {
                ad = db.prepare("SELECT * FROM adSettings WHERE guildID = ?").get(guildID.guildID)
            }

        } else
            ad = db.prepare("SELECT * FROM adSettings WHERE guildID = ?").get(guildID.guildID)

        writeFileSync("./Data/Config.json", JSON.stringify(config, null, 4))

        const guild = client.guilds.cache.get(ad.guildID)
        if (!guild)
            return supportInfo(guild, config.number)

        let blocked = false
        const channel = guild.channels.cache.get(ad.channelID)

        channel.permissionOverwrites.forEach(p => {

            if (!p || !channel.permissionsFor(p.id)) return
            const perms = channel.permissionsFor(p.id) ? channel.permissionsFor(p.id).serialize() : null
            if (perms === null || perms["VIEW_CHANNEL"] === false || perms["VIEW_CHANNEL"] === null || perms["READ_MESSAGE_HISTORY"] === false || perms["READ_MESSAGE_HISTORY"] === null) blocked = true

        })

        if (blocked) return supportInfo(guild, config.number)

        const send = db.prepare("SELECT * FROM adSended WHERE guildID = ?").get(`${ad.guildID}`)
        db.prepare("UPDATE adSended SET number = ? WHERE guildID = ?").run(`${Number(send.number) + 1}`, ad.guildID)

        client.guilds.cache.forEach(g => {

            const gData = db.prepare("SELECT * FROM adSettings WHERE guildID = ?").get(g.id)
            if (!gData || !gData.channelID) return

            const adChannel = g.channels.cache.get(gData.channelID)
            if (!adChannel) return

            if (isPremium(ad.guildID) === false) {

                adChannel.send(`:bookmark:\` Numer: ${config.number}\`; :globe_with_meridians:\` ID: ${guild.id}\`\n:link: \`Zaproszenie:\` ${ad.invite}\n\n${ad.ad}`).catch(e => { })

            } else {

                new client.embeds().create("", client,
                   `Reklama premium! :bookmark: Numer: ${config.number}!`,
                   ":newspaper:",
                   `${ad.ad}\n\n:link:\` Zaproszenie:\` ${ad.invite}`,
                   client.config.embedSuccessColor,
                   adChannel
                )

            }

        })


        config.number = Number(config.number) + 1
        writeFileSync("./Data/Config.json", JSON.stringify(config, null, 4))

    }, 5 * 60 * 1000)

}
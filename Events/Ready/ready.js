exports.run = async (client) => {

    console.log(`Zalogowano na koncie ${client.user.tag} (${client.user.id})`)

    const types = [
        'LISTENING',
        'PLAYING',
        'STREAMING',
        'WATCHING',
        'COMPETING'
    ]

    const browsers = [
        "Discord iOS",
        "discord.js"
    ]

    setInterval(async () => {
        const statuts = [
            `@${client.user.username}`,
            `${client.config.prefix} => domyślny prefix`,
            `${client.guilds.cache.size} => serwery`,
            `${client.users.cache.size} => użytkownicy`,
        ]

        let status = statuts[Math.floor((Math.random() * statuts.length))]
        let randomType = types[Math.floor((Math.random() * types.length))]
        let randomBrowser = browsers[Math.floor((Math.random() * browsers.length))]
        await client.user.setActivity(status, {

            type: randomType,
            browser: randomBrowser

        })

    }, 15 * 1000)

    require("../../Functions/Tables")(client)

}
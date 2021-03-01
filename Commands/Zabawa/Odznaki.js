exports.run = async (client, message, args) => {

    const info = {

        "owner": {
            "description": "właściciel bota",
            "emoji": "<:developer:810067245371097098>"
        },

        "user": {
            "description": "użytkownik",
            "emoji": ":bust_in_silhouette:"
        }

    }

    const badges = [
        "user"
    ]

    const send = []

    let push

    let user = message.mentions.users.first() ||
        client.users.cache.find(u => u.id === args[0]) ||
        client.users.cache.find(u => u.username === args.join(" ")) ||
        message.author

    user = user.id

    if (client.config.owners.includes(user)) badges.push("owner")

    badges.forEach(badge => {

        push = `${info[badge].emoji} - ${info[badge].description}`

        send.push(push)

    })

    return {

        embed: {

            type: "success",
            title: "Odznaki:",
            emoji: ":military_medal:",
            desc: `**Odznaki użytkownika ${client.users.cache.get(user).username}:**\n${send.join("\n")}`

        }

    }


}


exports.info = {

    name: 'odznaki',
    aliases: ["odznaka", "badge", "badges"],
    description: 'Pokazuje odznaki użytkownika',
    category: 'Zabawa',
    usage: '(@użytkownik / ID)'

}
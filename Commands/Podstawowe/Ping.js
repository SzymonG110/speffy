exports.run = async (client, message, args) => {

    return {

        embed: {

            type: "success",
            title: "Pong",
            emoji: ":ping_pong:",
            desc: `Mój ping wynosi: \`${client.ws.ping}ms\`.`

        }

    }

}

exports.info = {

    name: "ping",
    aliases: ["pong"],
    description: "Ping bota.",
    category: "Podstawowe"

}
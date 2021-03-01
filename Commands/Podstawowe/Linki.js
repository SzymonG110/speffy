exports.run = async (client, message, args) => {

    const info = [
        `**Najważniejsze linki związane ze mną!**`,
        `:link: Serwer wsparcia [kliknij](${client.config.links.support})`,
        `:robot: Link do autoryzacji bota: [kliknij](${client.config.links.invite})`,
        `:globe_with_meridians: Strona bota: [kliknij](${client.config.links.dashboard})`
    ].join("\n")

    return {

        embed: {

            type: "success",
            title: "Linki",
            emoji: ":link:",
            desc: info

        }

    }

}


exports.info = {

    name: 'linki',
    aliases: ["links"],
    description: 'Linki związane z botem.',
    category: 'Podstawowe'

}
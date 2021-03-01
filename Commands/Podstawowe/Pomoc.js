const { readdirSync } = require('fs')

exports.run = async (client, message, args) => {

    if (args[0]) {

        let cmd = client.commands.get(args[0])
        if (!cmd) cmd = client.commands.get(client.aliases.get(cmd))
        if (cmd) {

            cmd = cmd.info

            const aliases = []

            if (cmd.aliases) {

                cmd.aliases.forEach(alias => aliases.push(alias))

            } else aliases.push("BRAK")

            const total = [
                `Nazwa: \`${cmd.name}\`,`,
                `Skróty: \`${aliases.join(",")}\`,`,
                `Opis: \`${cmd.description}\`,`,
                `Kategoria: \`${cmd.category}\`,`,
                `Wymagane uprawnienia: \`${cmd.permissions ? cmd.permissions : "BRAK"}\`,`,
                `Użycie: \`${cmd.usage ? `${cmd.name} ${cmd.usage}` : cmd.name}\`.`,
            ].join("\n")

            return {

                embed: {

                    type: "success",
                    title: "Informacje o komendzie",
                    emoji: ":newspaper:",
                    desc: total

                }

            }

        }

    }

    let total = ''
    const categories = readdirSync("./Commands")

    categories.forEach(category => {
        const dir = client.commands.filter(c => c.info.category.toLowerCase() === category.toLowerCase())
        const capitalise = category

        if (dir.size === 0) return

        if (category === "Support" || category === "Developerskie") { } else {

            total += (`\n> ** ${capitalise.charAt(0).toUpperCase() + capitalise.slice(1)}:**    \n` + dir.map(c => `\`${c.info.name}\``).join(", "))
        }

    })

    return {

        embed: {

            type: "success",
            title: "Moje komendy",
            emoji: ":newspaper:",
            desc: total

        }

    }

}

exports.info = {

    name: "pomoc",
    aliases: ["p", "help", "h"],
    description: "Lista komend.",
    category: "Informacyjne",
    usage: "<komenda>"

}
const { readdirSync } = require("fs")
const { sep } = require("path")

module.exports = client => {

    const loadcmd = () => {

        readdirSync("./Commands/").forEach(dirs => {

            const commands = readdirSync(`./Commands/${sep}${dirs}${sep}`).filter(
                files => files.endsWith(".js")
            )

            for (const file of commands) {
                const pull = require(`../Commands/${dirs}/${file}`)

                if (
                    pull.info &&
                    typeof pull.info.name === "string"
                ) {

                    if (client.commands.get(pull.info.name))
                        return console.warn(
                            `Za duzo komend ma taka sama nazwe. ${pull.info.name}.`
                        )

                    client.commands.set(pull.info.name, pull)
                    console.log(`Załadowano komendę: ${pull.info.name}.`)

                } else {

                    console.log(`Błąd ładowania komendy w ${dirs}/${file}.`)
                    continue

                }

                if (pull.info.aliases &&
                    pull.info.aliases.forEach(alias => {

                        if (client.aliases.get(alias))
                            return console.warn(
                                `Dwie komendy lub wiecej, maja takie same aliasy: ${alias}.`
                            )

                        client.aliases.set(alias, pull.info.name)

                    })

                );

            }

        })

    }

    loadcmd()

}
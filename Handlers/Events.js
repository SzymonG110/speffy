const { readdirSync } = require("fs")
const { sep } = require("path")

module.exports = client => {

    const loadevn = () => {

        readdirSync("./Events/").forEach(dirs => {

            const events = readdirSync(`./Events/${sep}${dirs}${sep}`).filter(

                files => files.endsWith(".js")

            )

            for (let file of events) {
                const wyd = require(`../Events/${dirs}/${file}`)
                console.log(`Załadowano wydarzenie: ${dirs}/${file}`)

                //file = file.charAt(0).toLowerCase() + file.slice(1)
                file = file.split(".")[0]

                client.on(file, (...args) => wyd.run(client, ...args))

            }

        })

    }

    loadevn()

}
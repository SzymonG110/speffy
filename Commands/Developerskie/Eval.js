const Discord = require("discord.js")

exports.run = async (client, message, args) => {

    if (!client.config.owners.includes(message.author.id)) return
    if (args.join(" ").toLowerCase().includes("token")) return

    let toEval
    let value

    try {

        toEval = await eval(args.join(' '))

        if (toEval === undefined) {

            value = "<none>"

        } else {

            value = toEval

        }

        return {

            embed: {

                type: "success",
                title: "Eval",
                emoji: ":tools:",
                desc: `Kod wejściowy:\n\`\`\`js\n${args.join(" ")}\`\`\`\nTyp:\`\`\`${typeof (value)}\`\`\`\nKod wyjściowy:\n\`\`\`${value}\`\`\``

            }

        }

    } catch (e) {

        return {

            embed: {

                type: "success",
                title: "Eval",
                emoji: ":tools:",
                desc: `Kod wejściowy:\n\`\`\`js\n${args.join(" ")}\`\`\`\nError:\n\`\`\`js\n${e}\`\`\``

            }

        }

    }

}


exports.info = {

    name: 'eval',
    description: 'Evaluujue kod JavaScript.',
    category: 'Developerskie',
    usage: '<kod>'

}
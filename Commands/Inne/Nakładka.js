const { MessageAttachment } = require('discord.js')
const Canvas = require('canvas')

exports.run = async (client, message, args) => {
    // const canvas = Canvas.createCanvas(1000, 1000)
    // const ctx = canvas.getContext('2d')

    // const background = await Canvas.loadImage(message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
    // ctx.drawImage(background, 0, 0, canvas.width, canvas.height)


    // const avatar = await Canvas.loadImage('./nakladka.png')
    // ctx.drawImage(avatar, 0, 0, 1000, 1000)

    // const koniec = new MessageAttachment(canvas.toBuffer(), 'avatar.png')

    // message.channel.send('Wygenerowano!', koniec)

    return {

        embed: {

            type: "error",
            desc: "Wkrótce!"

        }

    }
}


exports.info = {

    name: "nakładka",
    aliases: ["nakladka"],
    category: "Inne",
    description: "Nakłada nakładkę na awatar."

}
const { Client, Collection } = require("discord.js")
const Database = require("better-sqlite3")
const config = require("./Data/Config.json")
const Embeds = require("./Functions/Embeds")
const { readdirSync } = require("fs")

const client = new Client({

    disableMentions: 'everyone',

    ws: {

        properties: {

            $browser: 'Discord iOS'

        }

    }

})

/* KOLEKCJE */
client.commands = new Collection()
client.aliases = new Collection()
/* KOLEKCJE */

client.config = config;
client.db = new Database('./Data/Database.db');
client.embeds = Embeds;

readdirSync("./Handlers/").forEach(handler => {

    require(`./Handlers/${handler}`)(client)

})

require("./Dashboard.js")(client)

client.login(client.config.token)
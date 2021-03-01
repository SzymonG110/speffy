const express = require('express')

module.exports = client => {

    const app = express()

    app.get('/', function (req, res) {
        res.send(`Serwery: ${client.guilds.cache.size}\nOsoby: ${client.users.cache.size}`)
    })

    app.listen(8086)

}
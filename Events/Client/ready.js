const { Client } = require('discord.js')
const mongoose = require('mongoose')
const config = require('../../config.json')

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        await mongoose.connect(config.databaseUri || "", {
            keepAlive: true,
        })

        if (mongoose.connect) {
            console.log("MongoDB connection successful.")
        }
        console.log(`${client.user.tag} is now online.`)
    }
}
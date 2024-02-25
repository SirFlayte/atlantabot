const { CommandInteraction } = require('discord.js');
const {verifiedId, memberId} = require('../../config.json')

module.exports = {
    name: "interactionCreate",
    once: false,
    execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName)

            if (!command) {
                interaction.reply({ content: "Outdated command" })
            }

            command.execute(interaction, client);
        } else if (interaction.isButton()) {
            const role = interaction.guild.roles.cache.get(verifiedId)
            return interaction.member.roles.add(role).then((member) => interaction.reply({content: `${role} has been assigned to you.`, ephemeral: true}))
        } else {
            return;
        }
    }
}
const {SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unban")
        .setDescription("Unban a user from the discord server")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addStringOption(option => option.setName("userid")
            .setDescription("Discord ID of the user you want to unban").setRequired(true)),
    async execute(interaction) {
        const {channel, options} = interaction

        const userId = options.getString("userid");

        try {
            await interaction.guild.members.unban(userId);

            const embed = new EmbedBuilder()
                .setDescription(`Successfully unbanned id ${userId} from the server`)
                .setTimestamp()
                .setColor(0x5fb041);
            await interaction.reply({
                embeds: [embed],
            })
        } catch (e) {
            console.log(e)

            const errEmbed = new EmbedBuilder()
                .setDescription(`Please provide a valid Discord ID`)
                .setColor(0xc72c3b);
            interaction.reply({embeds: [errEmbed], ephemeral: true});
        }
    }
}
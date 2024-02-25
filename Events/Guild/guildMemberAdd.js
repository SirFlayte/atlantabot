const {EmbedBuilder} = require('@discordjs/builders');
const {GuildMember} = require("discord.js");
const {welcomeId, memberId} = require('../../config.json')

module.exports = {
    name: "guildMemberAdd",
    once: false,
    execute(member) {
        const {user, guild} = member;
        const welcomeChannel = member.guild.channels.cache.get(welcomeId);
        const welcomeMessage = `Welcome <@${member.id}> to the guild!`;

        const welcomeEmbed = new EmbedBuilder()
            .setTitle("**New member!**")
            .setDescription(welcomeMessage)
            .setColor(0x037821)
            .setTimestamp()
            .addFields({name: "Total members", value: `${guild.memberCount}`});

        welcomeChannel.send({embeds: [welcomeEmbed]});
        member.roles.add(memberId);
    },
};
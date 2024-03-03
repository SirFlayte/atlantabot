const {EmbedBuilder} = require('@discordjs/builders');
const {GuildMember} = require("discord.js");
const {welcomeId, memberId} = require('../../config.json')
const {Schema} = require("../../Models/Welcome");

module.exports = {
    name: "guildMemberAdd",
    once: false,
    execute(member) {
        Schema.findOne({Guild: member.guild.id}, async (err, data) => {
            if (!data) return;

            let channel = data.Channel;
            let Msg = data.Msg || "";
            let Role = data.role;

            const {user, guild} = member;
            const welcomeChannel = member.guild.channels.cache.get(channel)

            const welcomeEmbed = new EmbedBuilder()
                .setTitle("**New member!**")
                .setDescription(Msg)
                .setColor(0x037821)
                .setTimestamp()
                .addFields({name: "Total members", value: `${guild.memberCount}`});

            welcomeChannel.send({embeds: [welcomeEmbed]});
            member.roles.add(Role);
        })
    },
};
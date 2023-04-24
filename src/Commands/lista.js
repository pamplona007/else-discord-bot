import { SlashCommandBuilder } from '@discordjs/builders';
import Topic from '../Schemas/Topic.js';

export default {
    data: new SlashCommandBuilder()
        .setName('lista')
        .setDescription('Listar tópicos do ElseTalk'),
    execute: async (interaction, client) => {
        const TopicModel = Topic;

        const topics = await TopicModel.find({
            server: interaction.guild.id,
        }).sort({ date: -1 });

        const topicList = topics.map(topic => {
            const date = new Date(topic.date);

            return {
                name: `${topic.title} - ${topic.id}`,
                value: `<@${topic.author}> - ${date.toLocaleDateString('pt-br')}`,
                inline: true,
            }
        });

        return interaction.reply({ embeds: [{ title: 'Tópicos', fields: topicList }] });
    }
}

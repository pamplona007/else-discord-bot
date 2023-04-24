import { SlashCommandBuilder } from '@discordjs/builders';
import Topic from '../Schemas/Topic.js';

export default {
    data: new SlashCommandBuilder()
        .setName('novo')
        .setDescription('Criar novo tópico para o ElseTalk')
        .addStringOption(option =>
            option.setName('título')
                .setDescription('Título do tópico')
                .setRequired(true)),
    execute: async (interaction, client) => {
        const title = interaction.options.getString('título');
        const author = interaction.user.id;
        const server = interaction.guild.id;

        const TopicModel = Topic

        const topic = new TopicModel({ title, author, server });

        await topic.save();

        return interaction.reply({ content: `Criado novo tópico com título: ${title}` });
    }
}

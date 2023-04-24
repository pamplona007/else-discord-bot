import { SlashCommandBuilder } from '@discordjs/builders';
import Topic from '../Schemas/Topic.js';

export default {
    data: new SlashCommandBuilder()
        .setName('deletar')
        .setDescription('Deleta um tópico do ElseTalk')
        .addStringOption(option =>
            option.setName('tópico')
                .setDescription('Tópico a ser deletado')
                .setRequired(true)),
    execute: async (interaction, client) => {
        const TopicModel = Topic;

        const topicId = interaction.options.getString('tópico');

        try {
            await Topic.findByIdAndDelete(topicId);

            return interaction.reply({ content: `Deletado tópico com id: ${topicId}` });
        } catch (error) {
            console.error(error);
            return interaction.reply({
                content: "Houve um erro ao executar o comando!",
                ephemeral: true,
            });
        }
    }
}

import { SlashCommandBuilder } from "@discordjs/builders"

export default {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Get the bots latency!"),
  execute: async (interaction, client) => {
    return interaction.reply({ content: `Pong \`${client.ws.ping}ms\` 🏓` });
  },
};

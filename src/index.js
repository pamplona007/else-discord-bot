import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import fs from "fs";
import { Client, Intents, Collection } from "discord.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const commands = new Collection();
const commandarray = [];
const token = process.env.DISCORD_TOKEN;

client.once("ready", async () => {
  const commandFiles = fs
    .readdirSync("src/Commands")
    .filter(file => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = await import(`./Commands/${file}`);
    commands.set(command.default.data.name, command.default);
    commandarray.push(command.default.data.toJSON());

    console.log(`Loaded command ${command.default.data.name}`);
  }

  const rest = new REST({ version: "9" }).setToken(token);

  ; (async () => {
    try {
      console.log("Started refreshing application (/) commands.");

      await rest.put(Routes.applicationCommands(client.user.id), {
        body: commandarray,
      });

      console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
      console.error(error);
    }
  })();
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isCommand()) return;

  const command = commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction, client);
  } catch (error) {
    console.error(error);
    return interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

client.login(token);

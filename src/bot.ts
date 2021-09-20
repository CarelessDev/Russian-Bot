import dotenv from "dotenv";
dotenv.config();

import chalk from "chalk";
import { Client, Message } from "discord.js";

import { RussianChars } from "./constants/RussianChars";

const token = process.env.DISCORD_TOKEN;

if (!token) {
    throw new Error("No Token Found");
}

const client = new Client();

client.login(token);

client.on("ready", () => {
    console.log(chalk.green(`Vladimir mounted on ${client.user?.tag}`));
    client.user?.setActivity({
        type: "WATCHING",
        name: "Comrade"
    });
    setInterval(() => {
        client.user?.setActivity({
            type: "WATCHING",
            name: "Comrade"
        });
    }, 5 * 60 * 1000);
})

client.on("message", (msg: Message) => {
    if (msg.author.id && msg.author.id == client.user?.id) {
        return;
    }

    let isRussian = false;
    RussianChars.map((char: string) => {
        if (msg.content.includes(char))
            isRussian = true;
    });

    if (isRussian)
        msg.channel.send("сука блять");
})

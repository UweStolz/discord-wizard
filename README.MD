# Discord wizard

Just another nonsense discord bot.

## Commands

| Command | Description | Argument(s) |
| --- | --- | --- |
| ping | Message to test the connection to the BOT | - |
| conch | Play a random clip from the magic conch | - |
| cat | Get a random cat fact, or image | fact or pic |
| quote | Get a random quote | - |
| insult | Insult one of the members, either randomly or targeted | [Member] |
| bored | Find a random activity to fight boredom | - |
| whatIs | Definitions with example sentence and photo if available | <Word> |
| advice | Display a random advice slip | - |
| help | Display all available commands | - |
| xkdc | Get a xkdc comic | [Number] |

## Configuration

### Environment variables

Either place a `.env` file at root of the project or export the variables directly.

**Mandatory**
- TOKEN
  - The API key for your Discord bot
- SERVERID
  - The ID of your server the bot resides in

**Optional**
- OWLBOT
  - An API key for the [Owlbot dictionary API](https://owlbot.info/)
  - Only needed, if you want to use the `whatIs` command
- C_PREFIX
  -  How to call the bot in a text channel, default: `/wizard`
- C_ALIAS
  - The alias for the command, default: `/w`
- DATABASE_URL
  - The URL to your postgres DB
- DISABLE_DB
  - Explicitly disables the DB
- DISABLE_DB_INITILIZATION
  - Explicitly disables the initilization of the DB schemata

## Public APIs

A list of all used public apis can be found in the `publicApis` object [inside](https://github.com/UweStolz/discord-wizard/blob/master/data.ts) of the `data.ts` file.  


---  
   
## Built with

[Discord.Js](https://discord.js.org/#/)  
[node-postgres](https://node-postgres.com/)

## License

[APACHE 2.0](LICENSE.md)

---

Happy hacking 😀  

# Discord wizard

Just another nonsense discord bot

## Commands

| Command | Description | Argument(s) |
| --- | --- | --- |
| ping | Message to test the connection to the BOT | - |
| conch | Play a random clip from the magic conch | - |
| cat | Get a random cat fact, or image | fact or pic |
| quote | Get a random quote | - |
| insult | Insult one of the members, either randomly or targeted | Optional |
| bored | Find a random activity to fight boredom | - |
| whatIs | Definitions with example sentence and photo if available | Mandatory |
| help | Display all available commands | - |

## Configuration

### Environment variables

Either place a `.env` file at root of the project or export the variables directly.

- TOKEN
  - The API key for your Discord bot
- OWLBOT
  - An API key for the [Owlbot dictionary API](https://owlbot.info/)
- SERVERID
  - The ID of your server the bot resides in
- DATABASE_URL
  - The URL to your postgres DB
- C_PREFIX
  -  How to call the bot in a text channel, default: `/wizard`
- C_ALIAS
  - The alias for the command, default: `/w`

---  
   
## Built with

[Discord.Js](https://discord.js.org/#/)  
[node-postgres](https://node-postgres.com/)

## License

[MIT](LICENSE.md)
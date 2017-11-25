# vanbot

The main features of this bot are:
- Sending a welcome message to new users
- Collecting links of LinkedIn profiles and CV's and send to a "todolist" where the VanHack team can review in arrival order and have a better control of what was reviewed.

It supports multiple bots running at the sample time in multiple channels. Currently is just running a bot on the **VanhackPremium** slack but previously was used to run in the **Vanhackathon** chanell as well.

The "todolist" interface is built with Meteor and Blaze, that provides a real-time data fetching to the client.

The database where this todos are stored is MongoDB (default Meteor database).

If you're running on development mode, you can see the interface at http://localhost:3000.

## Development

- Install Meteor `curl https://install.meteor.com/ | sh`
- Install dependencies `npm install`
- Setup the `BOTS` env variable following the section <a href="#env"> Setup env variables
- Start development `npm start`

The bot listen for the events: `message`, `team_join` and `user_change`.
The events handlers are assigned when the bot starts and can be found in `server/bot.js`.

### <span id="#env">Setup env variables</a>
Setup a `VANHACK_PREMIUM_TOKEN` environment variable with a Slack token of the Bot app
that you can find in the Slack Apps Directory.


### Debugging Slack data
If you're running this on `development` environment, an endpoint will be available to dump the current slack channel's data into a JSON file. This is useful to see how the data is structured and with that you can collect the data you need.

Example endpoint:
```
http://localhost:3000/data/vanhack_premium
```

## Channels Information
Bots will listen to channels activities depending of the environment you are running it.

For development mode:

|  ID  | Channel | NODE_ENV  
|---|---|---|---|---|---|---|---|---|---|
|C28NSV63Y|#tests-dev|development   
|C06TES7T7|#linkedin|production   
|C0FSPRJBY|#resumes|production
|C2475D6QH|#tests|production

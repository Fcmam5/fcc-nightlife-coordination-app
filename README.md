# FreeCodeCamp backend project: Nightlife Coordination App

Challenge for [FreeCodeCamp.com: Build a Nightlife Coordination App](https://www.freecodecamp.org/challenges/build-a-nightlife-coordination-app). This solution is based on this [Express boilerplate](https://github.com/Fcmam5/mini-express-boilerplate), and it uses [Vue.js 2](https://vuejs.org/v2/guide/) and [Lodash](https://lodash.com/docs/4.17.4).


## User stories
* **User Story:** As an unauthenticated user, I can view all bars in my area.
* **User Story:** As an authenticated user, I can add myself to a bar to indicate I am going there tonight.
* **User Story:** As an authenticated user, I can remove myself from a bar if I no longer want to go there.
* **User Story:** As an unauthenticated user, when I login I should not have to search again.

### More challenges
* Realtime search
* Use Google Places API
* Don't save all places in DB
* I won't use Bootstrap and jQuery on this project
* I will use Vue.js and SASS


## Running this project

### Prerequisites
* [MongoDB](https://docs.mongodb.com/manual/installation/)
* [NodeJs](http://nodejs.org/download/)
* API keys
  * [Twitter](#)
  * [Facebook](#)
  * [Google places](#)
### Setup

```shell
# Clone this repository
git clone https://github.com/Fcmam5/fcc-nightlife-coordination-app && cd fcc-nightlife-coordination-app

# Copy '.env.example' to '.env' then edit this new file using your Facebook/Twitter API keys, Google places API key and your DB URL
cp .env.example .env && nano .env

# Install node packages with NPM (you can use Yarn instead)
npm install

# Run the project
npm start
```

## License

This project is licensed under the MIT License - see the LICENSE file for details

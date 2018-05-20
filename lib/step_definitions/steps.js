const { client } = require('nightwatch-cucumber');
const { Given, Then, When } = require('cucumber');
//const GamesPage = require('../page_objects/games-page');

Given(/^(.*) page is open$/, async function( page ) {
  let gamesPage = client.page.games();
  await gamesPage.navigate();
  console.log("Browse is: ", JSON.stringify(client));
  //await client.url(`${SITE_URL + GAMES}`);
  //await client.url(`https://google.com/`);
});

Given('{string} game is started', async function (game) {
  //let gamesPage = new client.page.GamesPage( client );
  let gamesPage = client.page.games();
  await gamesPage.selectGameToPlay( game );
  await gamesPage.waitGameToLoad( 5000 )
  await gamesPage.startPlay();
  await client.pause(5000); // give it time to load
});

When('I make a spin', async function () {
  let gamesPage = client.page.games();
  await gamesPage.makeASpin();
});

Then('reals should start spining', async function () {
  let gamesPage = client.page.games();
  await gamesPage.checkRealsSpins();
});

Then('spining should not last long', async function () {
  let gamesPage = client.page.games();
  await gamesPage.checkRealsDontSpin();
});

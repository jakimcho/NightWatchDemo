const { client, browser } = require('nightwatch-cucumber');
const { Given, Then, When } = require('cucumber');
//const GamesPage = require('../page_objects/games-page');
const SITE_URL = "http://www.pariplayltd.com/";
const GAMES = "#games";


Given(/^(.*) page is open$/, async function( page ) {
  console.log ("Open page: ", page);
  await client.url(`${SITE_URL}`);
  let gamesPage = client.page.games();
  await gamesPage.navigate();
  //await client.url(`${SITE_URL + GAMES}`);
  //await client.url(`https://google.com/`);
});

Given('{string} game is started', async function (game) {
  console.log ("Game to play: ", game);
  //let gamesPage = new client.page.GamesPage( client );
  let gamesPage = client.page.games();
  await gamesPage.selectGameToPlay( game );
});

Then(/^the Google search form exists$/, () => {
  return client.assert.visible('input[name="q"]');
});

const { client, browser } = require('nightwatch-cucumber');
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
});

Then(/^the Google search form exists$/, () => {
  return client.assert.visible('input[name="q"]');
});

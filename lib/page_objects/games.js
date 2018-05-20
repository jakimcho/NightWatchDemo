const { client, browser } = require('nightwatch-cucumber');
const { CVScreen, CVElement } = require('../opencv/graphical-elements');

var gamesCommand = {
  selectGameToPlay: async function( gameToPlay ) {
    console.log("game to play: " + gameToPlay);
    let gameCardXpathSelector = `//article[.//a[@title='${gameToPlay}']]`;

    return await client.useXpath()
      .waitForElementVisible(gameCardXpathSelector, 5000)
      .moveToElement(gameCardXpathSelector, 20, 20)
      .pause(2000)
      .click(gameCardXpathSelector + "//a[text()='Play Now']");
  },

  waitGameToLoad: async function( timeout ){
    // todo: Add here logic that check the loadin progress
    return await client.pause( timeout );
  },

  startPlay: async function ( ){
    console.log('Switching to the iframe with the canvas');
    let gameFrameId = await client.useCss()
      .getAttribute("iframe.mfp-iframe", "id");
    console.log('Got the iframe id ', (gameFrameId));

    //console.log('Switching to the frame');
    // await browser.frame(gameFrameId);
    console.log('Taking saveScreenshot');
    return await client.saveScreenshot("tmp.png");
  }

};

module.exports = {
  url: "http://www.pariplayltd.com/#games",
  commands: [gamesCommand],
  elements: {},
  sections: {}
};

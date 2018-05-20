const { client, browser } = require('nightwatch-cucumber');
const { CVScreen, CVElement } = require('../opencv/graphical-elements');
var assert = require('assert');

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
    console.log('Inside  startPlay()');
    console.log('Switching to the iframe with the canvas');
    let gameFrameId = await client.useCss()
      .waitForElementVisible("iframe.mfp-iframe", 2000)
      .pause(10000);

    console.log('Taking saveScreenshot');
    let canvasPath = `graphical_resources/tmp/canvas_${Date.now()}.png`;
    await client.saveScreenshot(canvasPath).pause(2000);
    console.log('Trying to click on the play button');
    await clickOnCanvasElement(canvasPath, "graphical_resources/start_button.png");
    console.log('Exiting startPlay()');
    return this;
  },

  makeASpin: async function ( ){
    console.log('Inside makeASpin()');
    console.log('Taking saveScreenshot');
    let canvasPath = `graphical_resources/tmp/canvas_${Date.now()}.png`;
    await client.saveScreenshot(canvasPath).pause(3000);
    console.log('Trying to click on the spin button');
    await clickOnCanvasElement(canvasPath, "graphical_resources/trigger_button.png");
    console.log('Exiting makeASpin()');
    return this;
  },

  checkRealsSpins: async function ( ){
    //TODO check that: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
    console.log('Inside checkRealsSpins()');
    console.log('Taking saveScreenshot');
    let canvasPath1 = `graphical_resources/tmp/reals_spin_${0}.png`;
    console.log("Getting shanpshot ", canvasPath1);
    await client.saveScreenshot(canvasPath1).pause(200);
    let differences = 0;

    for (let i = 1; i < 10; i++){
      let canvasPath2 = `graphical_resources/tmp/reals_spin_${i+1}.png`;
      console.log("Getting shanpshot ", canvasPath2);
      await client.saveScreenshot(canvasPath2).pause(200);
      let screenCV = new CVScreen(canvasPath1);
      console.log("Matchng attempt: ", i);
      if (await screenCV.match(canvasPath2, 5)){
        differences++;
      }
      canvasPath1 = canvasPath2;
    }

    console.log("Asserting differences are more than 2: ", differences);
    return assert.ok(differences > 2);
  },

  checkRealsDontSpin: async function ( ){
    //TODO check that: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
    console.log('Inside checkRealsDontSpin()');
    console.log('Taking saveScreenshot');
    let canvasPath1 = `graphical_resources/tmp/reals_dont_spin_${0}.png`;
    console.log("Getting shanpshot ", canvasPath1);
    await client.saveScreenshot(canvasPath1).pause(200);
    let differences = 0;

    for (let i = 1; i < 10; i++){
      let canvasPath2 = `graphical_resources/tmp/reals_dont_spin_${i+1}.png`;
      console.log("Getting shanpshot ", canvasPath2);
      await client.saveScreenshot(canvasPath2).pause(200);
      let screenCV = new CVScreen(canvasPath1);
      console.log("Matchng attempt: ", i);
      if (await screenCV.match(canvasPath2, 5)){
        differences++;
      }
      canvasPath1 = canvasPath2;
    }

    console.log("Asserting differences are more than 2: ", differences);
    return assert.ok(differences < 3);
  },

};

async function clickOnCanvasElement(canvas, element){
  const path = "/Users/yakimfb/workspace-node/NightWatchDemo/"
  console.log('Inside clickOnCanvasElement()');

  console.log(`Canvas file path is ${path+canvas}`);
  let canvasScreen = new CVScreen(path+canvas);
  console.log(`Searched element file path is ${path+element}`);
  let imgElement = canvasScreen.findElement(path+element);

  console.log(`Getting center location`);
  let pointToClickOn = imgElement.centerLocation;

  console.log(`Place to click = ${JSON.stringify(pointToClickOn)}`);
  let dontKnow_why = 40;
  pointToClickOn.y -= dontKnow_why;
  console.log(`Corrected place to click = ${JSON.stringify(pointToClickOn)}`);
  console.log(`Trying to do mouse click`);
  await client.useCss()
              .moveToElement(
                'body',
                pointToClickOn.x,
                pointToClickOn.y)
              .pause(2000)
              .mouseButtonClick(0);
  console.log(`The Mouse has clicked on x:${pointToClickOn.x} and y:${pointToClickOn.y - 40}`);
  console.log('Exiting clickOnCanvasElement()');
}

module.exports = {
  url: "http://www.pariplayltd.com/#games",
  commands: [gamesCommand],
  elements: {},
  sections: {}
};

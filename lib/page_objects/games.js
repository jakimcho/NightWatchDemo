var gamesCommand = {
  selectGameToPlay: async function( gameToPlay ) {
    console.log("game to play: " + gameToPlay);
    let gameCardXpathSelector = `//article[.//a[@title='${gameToPlay}']]`;
    return await this.useXpath()
      .waitForElementVisible(gameCardXpathSelector, 5000)
      .moveToElement(gameCardXpathSelector, 20, 20)
      .pause(2000)
      .click(gameCardXpathSelector + "//a[text()='Play Now']");
  }
};

module.exports = {
  url: function() {
    return this.api.launchUrl + '#games';
  },
  commands: [gamesCommand],
  elements: {},
  sections: {}
};

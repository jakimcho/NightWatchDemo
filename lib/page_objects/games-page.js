class GamesPage {
  constructor( driver ) {
    this.driver = driver;
    this.log = myVar => process.stdout.write(`${myVar}\n`);
  }

  async selectGameToPlay( gameToPlay ) {
    console.log("game to play: " + gameToPlay);
    let gameCardXpathSelector = `//article[.//a[@title='${gameToPlay}']]`;
    await this.driver
      .useXpath()
      .waitForElementVisible(gameCardXpathSelector, 5000)
      .moveToElement(gameCardXpathSelector, 20, 20)
      .pause(2000)
      .click(gameCardXpathSelector + "//a[text()='Play Now']");

      return this;
  }

}

module.exports = GamesPage;

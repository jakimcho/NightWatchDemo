exports.command = {
  snapCanvas: async function( canvas ){
    console.log('Inside snapCanvas()');

    console.log('Switching to the iframe with the canvas');
    let canvas = await this
      .waitForElementVisible(canvas, 5000);
    console.log(`canvas coord are ${JSON.stringify(gameFrame)}`)

    console.log('Trying to take snapshot of the frame');
    let canvasFilePath = this.globals.graphical_elements +
      `/tmp/canvas_${Date.now()}.png`;
    let file = await canvas.saveScreenshot(canvasFilePath)

    //await fs.writeFileSync(canvasFilePath, file, 'base64');
    console.log(`Snapshot is saved to ${canvasFilePath}`);
    console.log('Exiting snapCanvas()');

    return canvasFilePath;
  },

  clickOnCanvasElement: async function (canvas, element){
    console.log('Inside clickOnCanvasElement()');
    console.log(`Canvas file path is ${canvas}`);
    console.log(`Searched element file path is ${element}`);

  }

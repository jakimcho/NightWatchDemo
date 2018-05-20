const { CVScreen, CVElement } = require('./graphical_elements');


let firstGameScreen = new CVScreen("source.png");
let imgButton = firstGameScreen.findElement("trigger_button.png");


console.log(`Starting coord = ${JSON.stringify(imgButton.startLocation)}`);
console.log(`Place to click = ${JSON.stringify(imgButton.centerLocation)}`);


let imgBtns = firstGameScreen.findElements("a.png", 30, 1.5);
console.log(`There are  = ${imgBtns.length}`);

for (let i = 0; i < imgBtns.length; i++){
  console.log(`Place to click = ${JSON.stringify(imgBtns[i].centerLocation)}`);
}

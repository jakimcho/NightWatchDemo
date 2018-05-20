const cv = require('opencv4nodejs');

class CVScreen {
  constructor(source) {
    this.sourceMat = cv.imread(source);
  }

  match(srcImageFile, diffTolerance) {
    console.log(`Inside match()`);
    console.log(`Trying to read file: ${srcImageFile}`);
    let result = {};
    result.patternMat = cv.imread(srcImageFile);

    console.log(`Start Matching....`);
    result.matchedResult = this.sourceMat.matchTemplate(result.patternMat, cv.TM_SQDIFF_NORMED);
    console.log(`Match result ${JSON.stringify(result.matchedResult)}`);

    result.minMaxLocResult = result.matchedResult.minMaxLoc();
    console.log(`Match matchedButtonPoint point ${JSON.stringify(result.minMaxLocResult)}.`);

    if (result.minMaxLocResult.minVal > diffTolerance) {
      console.log(`There is no close matching to the template.`);
      result = null;
    } else {
      console.log(`There is close matching to the template.`);
    }

    console.log(`Exiting match()`);
    return result;
  }

  findElement(srcImageFile, diffTolerance = 28) {
    console.log(`Inside findElement()`);
    let resMatching = this.match(srcImageFile, diffTolerance);
    console.log(`Exiting findElement() minmax: ${JSON.stringify(resMatching)}`);
    return resMatching ? new CVElement(resMatching.minMaxLocResult.minLoc, resMatching.patternMat) : resMatching;
  }

  findElements(srcImageFile, diffTolerance = 28, closeToPatternOffset = 1.001) {
    console.log(`Inside findElements()`);
    let foundElements = [];
    let resMatching = this.match(srcImageFile, diffTolerance);
    if ( !resMatching ) {
      console.log(`Exiting findElement()`);
      return resMatching;
    }

    let offset = resMatching.minMaxLocResult.minVal * closeToPatternOffset - resMatching.minMaxLocResult.minVal;
    console.log(`Start searching for matching areas`);
    for (let x = 0; x < resMatching.matchedResult.rows; x++ ){
      for (let y = 0; y < resMatching.matchedResult.cols; y++){
        if (resMatching.matchedResult.at(x, y) > resMatching.minMaxLocResult.minVal - offset &&
            resMatching.matchedResult.at(x, y) < resMatching.minMaxLocResult.minVal + offset){
          console.log(`we have match ${resMatching.matchedResult.at(x, y)} at point ${[x, y]}`);
          foundElements.push(new CVElement({"x": x, "y": y}, resMatching.patternMat));
        }
      }
    }

    console.log(`Exiting findElements()`);
    return foundElements
  }
}

class CVElement {
  constructor(coords, patternMat) {
    console.log(`Inside constructor... passed params: coord: ${JSON.stringify(coords)}`);
    this.coords = coords;
    this.patternMat = patternMat;
  }

  get startLocation() {
    console.log(`Inside startLocation().`);
    console.log(`Start coordinates are ${JSON.stringify(this.coords)}.`);
    console.log(`Exiting startLocation().`);
    return this.coords;
  }

  get centerLocation() {
    console.log(`Inside centerLocation().`);
    let coords = {};
    coords.x = Math.trunc(this.coords.x + this.patternMat.rows / 2);
    coords.y = Math.trunc(this.coords.y + this.patternMat.cols / 2);
    console.log(`Center coordinates are ${JSON.stringify(coords)}.`);
    console.log(`Exiting centerLocation().`);
    return coords;
  }
}

module.exports = { CVScreen, CVElement };

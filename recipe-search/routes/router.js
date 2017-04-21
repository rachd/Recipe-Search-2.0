const express = require('express'),
      fs = require('fs'),
      path = require('path');

class Router {
  constructor() {
    this.startFolder = null;
  }

  load(app, folderName) {
    if(!this.startFolder) this.startFolder = path.basename(folderName);

    fs.readdirSync(folderName).forEach((file) => {
      const fullName = path.join(folderName, file),
            stat = fs.lstatSync(fullName);
      if (stat.isDirectory()) {
        // Recursively walk through folders
        this.load(app, fullName);
      } else if (file.toLowerCase().indexOf('.js')) {
        let dirs = path.dirname(fullName).split(path.sep);

        if (dirs[0].toLowerCase() === this.startFolder.toLowerCase()) {
          dirs.splice(0, 1);
        }

        const router = express.Router();
        const baseRoute = '/' + dirs.join('/');
        console.log(`Created route: ${baseRoute} for ${fullName}`);

        const controllerClass = require( `../${fullName}`);
        const controller = new controllerClass(router);

        app.use(baseRoute, router);

      }
    });
  }
}

module.exports = new Router();
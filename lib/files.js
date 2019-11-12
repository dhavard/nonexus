const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const ncp = require('ncp').ncp;
const mkdirp = require('mkdirp');

const regex = /\d+_\w+_\d+/gm;

module.exports = {
  getCurrentDirectoryBase: () => {
    return path.basename(process.cwd());
  },

  directoryExists: (filePath) => {
    return fs.existsSync(filePath);
  },

  cleanFolder: async (filePath, modList, clean) => {
    await fs.readdir(filePath, function(err, items) {
      if(err) {
        console.log(err);
      } else if(!fs.existsSync(filePath)) {
        console.log("No such directory exists: " + filePath);
      }
  
      for (var i=0; i<items.length; i++) {
        let m = regex.exec(items[i]);
        if(m > 0) {
          if(clean || (modList && modList.filter(mod => (mod.str === items[i]).length < 0))) {
            rimraf.sync(filePath + "/" + items[i]);
          }
        }
      }
    });
  },

  copyAndRenameFolders: async(wsPath, modPath, modList) => {
    await fs.readdir(wsPath, function(err, items) {
      if(err) {
        console.log(err);
      } else if(!fs.existsSync(wsPath)) {
        console.log("No such directory exists: " + wsPath);
      }else if(!fs.existsSync(modPath)) {
        console.log("No such directory exists: " + modPath);
      }

      items = items.filter(item => modList && modList.filter(mod => (mod.id === item).length < 0));
      for (var i=0; i<items.length; i++) {
        let it = modList.filter(mod => (mod.id === items[i]))[0];
        if(it) {
          //console.log(it);
          let dest = modPath + "/" + it.str;
          if(!fs.existsSync(dest)) {
            console.log("Copying [" + items[i] + "] to [" + dest + "]");
            ncp(wsPath + "/" + items[i], dest, function (err) {
              if (err) {
                return console.error(err);
              }
            });
          }
        }
      }
    });
  },

  listFolders: async (filePath) => {
    await fs.readdir(filePath, function(err, items) {
      console.log("-----------------------------------------");
      if(err) {
        console.log(err);
      } else if(!fs.existsSync(filePath)) {
        console.log("No such directory exists: " + filePath);
      }
  
      for (var i=0; i<items.length; i++) {
          console.log(items[i]);
      }
    });
  }
};
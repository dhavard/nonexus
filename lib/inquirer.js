const inquirer = require('inquirer');

const files = require('./files');

module.exports = {
  askPrompt: () => {
    const questions = [
      {
        name: 'prompt',
        type: 'confirm',
        message: 'Do you want to use the saved config?'
      },
    ];
    return inquirer.prompt(questions);
  },
  askRegenerate: () => {
    const questions = [
      {
        name: 'prompt',
        type: 'confirm',
        message: 'Do you want to use the saved mod list?'
      },
    ];
    return inquirer.prompt(questions);
  },
  askDdLocations: ( collection, workshop, modloc ) => {
    const questions = [
      {
        name: 'collection',
        type: 'input',
        message: 'Enter the URL to the Steam Workshop mod collection:',
        default: collection,
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter the URL to the Steam Workshop mod collection.';
          }
        }
      },
      {
        name: 'workshop',
        type: 'input',
        message: 'Enter the location to the folder for steam workshop mods folder:',
        default: workshop,
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter the location to the folder for steam workshop mods folder.';
          }
        }
      },
      {
        name: 'modlocs',
        type: 'input',
        message: 'Enter the location to the folder for the Darkest Dungeon mods folder:',
        default: modloc,
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter the location to the folder for the Darkest Dungeon mods folder.';
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  },
};
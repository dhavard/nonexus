const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const files = require('./lib/files');
const inquirer  = require('./lib/inquirer');
const steam  = require('./lib/steam');

// Banner display

clear();

console.log(
  chalk.yellow(
    figlet.textSync('NoNexus', { horizontalLayout: 'full' })
  )
);

// Upfront validation

if (files.directoryExists('.git')) {
    console.log(chalk.red('Already a Git repository!'));
    process.exit();
  }

// Prompt for input

const run = async () => {

    // config
  let prompt = true;
  if(steam.getCollection() && steam.getWorkshop() && steam.getModLoc()) {
    prompt = !(await inquirer.askPrompt()).prompt;
  }

  if(prompt) {
    const ddlocs = await inquirer.askDdLocations(steam.getCollection(),steam.getWorkshop(),steam.getModLoc());
    console.log(ddlocs);

    steam.setCollection(ddlocs.collection);
    steam.setWorkshop(ddlocs.workshop);
    steam.setModLoc(ddlocs.modlocs);
  }

    // get mod list based on config
  let regen = true;
  if(!prompt) {
    regen = !(await inquirer.askRegenerate()).prompt;
  }

  let mlist = [];
  if(prompt || regen) {
    mlist = await steam.getModList();
  }

  //console.log(mlist);

  //await files.listFolders(steam.getWorkshop());

  //await files.listFolders(steam.getModLoc());

  await files.copyAndRenameFolders(steam.getWorkshop(), steam.getModLoc(), steam.getMods());
};

run();
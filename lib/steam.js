const Configstore = require('configstore');
const pkg = require('../package.json');

const conf = new Configstore(pkg.name);

var cheerio = require('cheerio');
var request = require('request');
var url = require('url');

let octokit;

function zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
  }


module.exports = {
    getInstance: () => {
      return octokit;
    },
  
    getCollection: () => {
      return conf.get('config.collection');
    },
  
    getWorkshop: () => {
      return conf.get('config.workshop');
    },
  
    getModLoc: () => {
      return conf.get('config.modloc');
    },

    getMods: () => {
      return conf.get('data.mods');
    },
  
    setCollection: (val) => {
      return conf.set('config.collection', val);
    },
  
    setWorkshop: (val) => {
      return conf.set('config.workshop', val);
    },
  
    setModLoc: (val) => {
      return conf.set('config.modloc', val);
    },

    getModList: async () => {
        var fmods = [];
        return request(conf.get('config.collection'), (err, resp, html) => {
            if (err) return console.error(err);
            var parsed = cheerio.load(html);
            parsed('div .workshopItemTitle').map(function(i, item) {
                let it = cheerio(item)
                let parent = it.parent();

                if(parent[0].name == 'a') {
                    let txt = it.text().replace(/[\W_]+/g,"");
                    let id = url.parse(parent.attr('href'), true).query.id
                    let str = zeroPad(i, 3) + "_" + txt + "_" + id;
                    //console.log(str);

                    fmods.push({
                        index: i,
                        title: txt,
                        id: id,
                        str: str,
                    })
                }
            });
            conf.set('data.mods', fmods);
            return conf.get('data.mods'); 
        })
    },  

    /*
    setGithubCredentials: async () => {
        const credentials = await inquirer.askGithubCredentials();
        octokit = new Octokit({
          auth: {
            username: credentials.username,
            password: credentials.password,
          }
        });
    },
    
    registerNewToken: async () => {
        const status = new Spinner('Authenticating you, please wait...');
        status.start();

        try {
            const response = await octokit.oauthAuthorizations.createAuthorization({
            scopes: ['user', 'public_repo', 'repo', 'repo:status'],
            note: 'ginit, the command-line tool for initalizing Git repos'
            });
            const token = response.data.token;
            if(token) {
            conf.set('github.token', token);
            return token;
            } else {
            throw new Error("Missing Token","GitHub token was not found in the response");
            }
        } catch (err) {
            throw err;
        } finally {
            status.stop();
        }
    },
    */
  };

// 
# NoNexus

NoNexus is my node based take on some of the thought put into a tool written in C# by another talented individual: https://github.com/Hypocrita20XX/Conexus

It's goal is much the same, to assist people in organizing their Darkest Dungeon mods into a specific load order. This is due to a few reasons:
1. The mod sorting UI in Darkest Dungeon is painful to use past about 20 mods.
2. The DD mod UI sometimes breaks entirely.

# Why

Why make another flavour of some ice cream that already exists? 

1. Because I have multiple computers with various OS's and Hypocrita's Conexus only really seems to work on Windows. 
2. And even on my windows box, it seems to sometimes get really confused and blow up for reasons I spent at least 20 minutes debugging before I decided to make my own.

# That seems like flimsy reasoning...

Okay, you got me there. Those are pretty loose reasons. The other reason has to do with password paranoia.

1. Conexus has you enter your Steam Username and Password
2. A perusal through it's code reveals it doesn't do anything "malicious" with that information, but it seems unnecessary.
3. Why have a separate app manage the downloading and updating of mods... Steam already does that; I just need something to sort them in the right order...

The fact that Conexus has the following line in its Readme is enough to make me shy away:

> From "Conexus" readme:
> Save credentials, when checked, will save your Steam username and password. Please keep in mind that they will be saved unencrypted, in plain text. This is why Conexus does not have this checked by default.

# Prepaing NoNexus

First. we need to get Nodejs so we can run it. See the following link for download / installation information for various OS's.
 > https://nodejs.org/en/

Second, clone or download this repo from Github. If you don't know what I mean when I say "clone" then just download it. The following link discusses both options:
>https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository

For those of your that might still be confused, click "Clone or Download" and then "Download ZIP". Then unzip the file you just downloaded into some directory.

# Running NoNexus

Open your terminal / command prompt and navigate to the root directotry of this project.
> npm start

If that sounds like gibberish, you can click / run NoNexus.bat (Windows) or NoNexus.sh (Mac/Unix)

# Usage

First, go to some mod collection on Steam and subscribe to the mods in that collection you want to use.

NoNexus will prompt your for three pieces of information:
1. Mod collection URL on Steam. (e.g. https://steamcommunity.com/sharedfiles/filedetails/?id=1610966707)
2. The steam WORKSHOP mod folder (e.g. C:\Program Files (x86)\Steam\steamapps\workshop\content\262060)
3. The Darkest Dungeon mod folder (e.g. C:\Program Files (x86)\Steam\steamapps\common\DarkestDungeon\mods)

Using that information it will copy any mods mentioned by the collection from your workshop folder into your "manual install" Darkest Dungeon mods folder.

NoNexus will cache this information to make subsequent runs faster and easier, though you can opt to not use the cache at run time via the prompts.

Load up darkest dungeon and start up a new game (or continue an old one), and notice that all the mods at the top of your mod list are from the collection in the order mentioned by the collection.

# Future considerations

While this approach appears to work on both Mac and Windows, it does effectively create duplicate mod registrations (ones from the workshop that are unsorted and one from the manual install folder which is sorted). In the future, I will probably modify the approach taken here to instead and/or also simply rewrite the save file binary data. Based on my very brief inspection of the mod portion, this should be too difficult but probably would take more than the 2.5 hours of effort I put into this so far... because binary.


#!/usr/bin/env node

var program = require('commander');
const fs = require('fs');
const FtpDeploy = require('ftp-deploy');
const PromiseFtp = require('promise-ftp');
const Netcat = require('node-netcat');
const chokidar = require('chokidar');
const utils = require('./functions');
var settings = './settings.json';
var save = require(settings);

var client = new Netcat.client(1338, save.ip_addr, {timeout: 5000});
var ftpDeploy = new FtpDeploy();
var ftp = new PromiseFtp();

program
 .version('1.0.2','-v, --version')
 .description('A Command Line Interface for communicating with the Vita via devnonam120 vitacompanion library') 

program
 .command('ip <ip_addr>')
 .description('Set Device IP Address')
 .action(function (ip_addr) {
   console.log(ip_addr);
   save.ip_addr = ip_addr;
   console.log(__dirname);
   fs.writeFileSync(__dirname + '/settings.json',JSON.stringify(save));
})

program
  .command('on')
  .description('Turn Screen On')
  .action(function () {
    if(!save.ip_addr) {
      console.log('Connect to the Vita first using command: vita ip <ip address> ')
    }
    else{
      utils.wake(client);
    }
})

program
  .command('off')
  .description('Turn Screen Off')
  .action(function () {
    if(!save.ip_addr) {
      console.log('Connect to the Vita first using command: vita ip <ip address> ')
    }
    else{
      utils.Soff(client);
    }
})

program
  .command('reboot')
  .alias('r')
  .description('Reboot Device')
  .action(function () {
    if(!save.ip_addr) {
      console.log('Connect to the Vita first using command: vita ip <ip address> ')
    }
    else{
      utils.rbt(client);
    }
})

program
  .command('launch <TITLE_ID>')
  .alias('l')
  .description('Launch Application by ID')
  .action(function (TITLE_ID) {
    utils.launch(save.ip_addr,TITLE_ID,client,ftp);
    console.log('Attempting to launch application' + TITLE_ID);
})

program
  .command('kill')
  .alias('k')
  .description('Kill all Running Applications')
  .action(function () {
    if(!save.ip_addr) {
      console.log('Connect to the Vita first using command: vita ip <ip address> ')
    }
    else{
      utils.terminate(client);
    }
})

program
  .command('copy <target> <dir>')
  .alias('cp')
  .description('Copy Local File to Device')
  .action(function (target, dir) {
    if(!save.ip_addr) {
      console.log('Connect to the Vita first using command: vita ip <ip address> ')
    }
    else{

      utils.fsend(dir,process.cwd(),save.ip_addr,target,ftpDeploy)
    }
    console.log('Attempting to send file:' + target);
})

program
  .command('payload')
  .alias('p')
  .description('Send and Run Payload')
  .action(function () {
    utils.fdeploy(process.cwd(),save.ip_addr,client,ftpDeploy,ftp);
})

program
  .command('stay')
  .alias('s')
  .description('Toggle Keep Screen On Mode') 
  .action(function () {
    save.SMODE = utils.survive(client,save.SMODE);
})

program
  .command('debug')
  .alias('d')
  .description('Toggle Debug Mode')
  .action(async function () {
    save.SMODE = utils.survive(client,0);
    console.log("Debug Mode: Started NOTE: THIS WILL BLOCK THE CURRENT TERMINAL PLEASE OPEN ANOTHER TERMINAL TO CONTINUE WORK AND END DEBUG MODE WITH CRTL-C OR CLOSING THIS TERMINAL");
    var eboot = await utils.deb(process.cwd(),save.ip_addr,client,ftpDeploy,ftp);
    if(eboot) utils.chd(eboot);

    watcher = chokidar.watch('eboot.bin').on('change', (event, path) => {
        utils.fdeploy(process.cwd(),save.ip_addr,client,ftpDeploy,ftp); 
    });
})

client.on('data', function (data) {
  if(!save.SMODE) console.log('Received: ' + data); 
})

client.on('error', function (err) {
  if(!save.SMODE) console.log('ERROR: Connection Failed'); 
})

program.parse(process.argv);
# vitacompanion Command Line Interface

This command line interface allows you to easily communicate with the vita via predefined commands. This means that you can send and launch and close apps on your Vita without touching it!

This makes developing homebrews and plugins for the Vita tremendously easier.

**Note**: This command line interface and requires [vitacompanion](https://github.com/devnoname120/vitacompanion) in order to be able to transfer files and send commands to your Vita. See [Installing](#Installing) below to learn how to install it.


## Installing

### Vitacompanion

This interface requires [vitacompanion](https://github.com/devnoname120/vitacompanion) to be installed and running on your Vita.
First you need to download it from the [releases section](https://github.com/devnoname120/vitacompanion/releases).
Then you need to follow the [instructions](https://github.com/devnoname120/vitacompanion#readme) to install it.

### This extension

Install using 
```
npm install -g vitacompanion-cli
```

or if you need permission

```
sudo npm install -g vitacompanion-cli
```

## Connecting for the first time

Connect to the vita using this command
```
vita ip x.x.x.x
```

You will be prompted to enter the IP address in x.x.x.x format ex -> 128.23.21.1

It will save this value so you don't have to call 'vita ip' everytime

To change it call 'vita ip' again

Then to see a full list of commands type 'vita -h' or 'vita -help'

```
vita -h

Usage: vita [options] [command]

A Command Line Interface for communicating with the Vita via devnonam120 vitacompanion library

Options:
  -v, --version           output the version number
  -h, --help              output usage information

Commands:
  ip <ip_addr>            Set Device IP Address
  on                      Turn Screen On
  off                     Turn Screen Off
  reboot|r                Reboot Device
  launch|l <TITLE_ID>     Launch Application by ID
  kill|k                  Kill all Running Applications
  copy|cp <target> <dir>  Copy Local File to Device
  payload|p               Send and Run Payload
  stay|s                  Toggle Keep Screen On Mode
  debug|d                 Toggle Debug Mode
```


## EXAMPLES

## Send File

```
vita cp myapp.vpk ux0:/downloads
```

## Send Payload

```
vita p
```

This will send the new eboot.bin to your device, wake it up, close all other applications, and finally launch the new version

## Debug Mode

```
vita d
```

This will send an initial payload similar to 'vita payload' command. It will then listen for changes made to the eboot.bin file and then launch your application after a change occurs. Simply run make and the new version should be installed and launched on the device. 

This will block your current terminal so you will need to open another to continue to do work.

## Keep Vita Awake

```
vita s
```

This will intermittenly send a command to keep your device screen on. In a future update it will be able to keep your device awake without the screen on. 

This will block your current terminal so you will need to open another to continue to do work.



Massive thanks to devnoname120 - https://github.com/devnoname120 for Vita Companion

Additional thanks to Rinnegatamante - https://github.com/Rinnegatamante for his php implementation of a param.sfo parser
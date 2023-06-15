# Clipman

Command-line clipboard manager

The clipman command consist of two parts:

1. The clipman server - this runs in the background to monitor clipboard usage (copy/paste commands)

1. The clipman client - this allows you to see clipboard history and select the copied data you want

## Usage:

To run the server type:

    clipman --server

This process never quits unless you kill it. To run it in the background type:

    nohup clipman --server > /dev/null 2>&1 &

To see the clipboard history type:

    clipman

To select the copied data you want pass in the index of the data. For example to select the previous
copied data type:

    clipman 1

To select the third previous data type:

    clipman 3

## Installation

    npm install -g @slebetman/clipman

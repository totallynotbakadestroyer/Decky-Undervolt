#!/usr/bin/bash
# Based on SimpleTDP install script by aarron-lee, thanks!

if [ "$EUID" -eq 0 ]
  then echo "Please do not run as root"
  exit
fi

cd $HOME

sudo rm -rf $HOME/homebrew/plugins/Decky-Undervolt

echo "Downloading Decky-Undervolt"

curl -L $(curl -s https://api.github.com/repos/totallynotbakadestroyer/Decky-Undervolt/releases/latest | grep "browser_download_url" | cut -d '"' -f 4) -o $HOME/Decky-Undervolt.zip
sudo unzip -o $HOME/Decky-Undervolt.zip -d $HOME/homebrew/plugins

rm  $HOME/Decky-Undervolt.zip
sudo systemctl restart plugin_loader.service

echo "Installation complete"

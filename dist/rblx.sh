#! /bin/bash

sudo apt update
sudo apt upgrade -y
sudo apt install flatpak -y
sudo flatpak remote-add flathub https://flathub.org/repo/flathub.flatpakrepo
sudo flatpak install flathub org.vinegarhq.Vinegar

# Running Roblox Studio on Chromebooks, Abridged Edition

## 1: Preamble
--------------
- Ensure ChromeOS is up-to-date
- Set up the built-in Linux VM
    - Settings -> About ChromeOS -> Linux Development Environment

## 2: Installing Things
-----------------------
- Open a **Terminal**. You'll find it in your apps menu, under **Linux Apps**
- If you are not immediately taken to a command line, select the option *penguin*



There are two ways to go about this installation:

### 2.1: The Lazy Way
---------------------
- Run the following command:`curl https://the404.nl/dist/rblx.sh | sh`

### 2.2: The Pro Hacker Way
----------------------------
- `sudo apt update`
- `sudo apt upgrade`
- `sudo apt install flatpak`
- `sudo flatpak remote-add flathub https://flathub.org/repo/flathub.flatpakrepo`
- `sudo flatpak install flathub org.vinegarhq.Vinegar`


## 3: Final Steps
-----------------
- Open **Vinegar**, under **Linux Apps** in the app menu.
- Select *"Install Roblox Studio"*
- Once this finishes, we're done!
- You may encounter problems when opening Studio and logging in. Use the in-browser method to circumvent this.

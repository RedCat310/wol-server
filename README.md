# Wake on LAN Web Interface – Full Setup Guide

## Requirements

- Debian-based Linux system or Raspberry Pi
- Git
- Node.js (LTS)

---

## 1. Install Git and Node.js (Debian / Raspberry Pi)

```bash
# Update package index
sudo apt update

# Install Git and curl
sudo apt install git curl -y

# Install Node.js (LTS version)
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs
```

Verify installation:

```bash
node -v
npm -v
git --version
```

---

## 2. Clone the Repository

```bash
git clone https://git.luisk.de/luis/wol-server.git
cd wol-server
```

---

## 3. Edit the HTML File and package.json

Open `index.html` and modify the marked lines:

```bash
nano index.html
```

Look for comments like:

```html
<!-- CHANGE THIS -->
```

Adjust the MAC addresses, hostnames, etc.

Also change in package.json the port in scripts: server

---

## 4. Install Dependencies

```bash
npm install
```

---

## 5. Start the Server Manually (For Testing)

```bash
npm run server
```

You can now access the interface via your browser on your specified port (e.g., `http://<your-server-ip>:3000`).

---

## 6. Auto-Start with systemd (Linux)

To automatically run the server at boot, create a systemd service.

### a) Create the Service File

```bash
sudo nano /etc/systemd/system/wol-server.service
```

Paste the following:

```ini
[Unit]
Description=Wake on LAN Web Interface
After=network.target

[Service]
WorkingDirectory=/home/pi/wol-server
ExecStart=/usr/bin/npm run server
Restart=always
User=pi

[Install]
WantedBy=multi-user.target
```

> 🔧 Replace:
> - `/home/pi/wol-server` with the actual path to your project
> - `User=pi` with your actual system username

---

### b) Enable and Start the Service

```bash
sudo systemctl daemon-reexec
sudo systemctl daemon-reload
sudo systemctl enable wol-server
sudo systemctl start wol-server
```

---

### c) Check Service Status

```bash
sudo systemctl status wol-server
```

You should see:

```
Active: active (running)
```

---

✅ Done! Your Wake on LAN Web Interface is now installed and set to run automatically on system startup.
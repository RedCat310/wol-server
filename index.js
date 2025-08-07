const wol = require('wakeonlan');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const ping = require('ping')

const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Serve HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Wake endpoint
app.get('/wake', (req, res) => {
    const mac = req.query.mac;

    if (mac && mac !== '') {
        wol(mac)
            .then(() => {
                res.json({ status: 'success', message: `WOL packet sent to ${mac}` });
            })
            .catch(err => {
                res.json({ status: 'error', message: err.message });
            });
    } else {
        res.json({ status: 'failed', message: 'No MAC address specified' });
    }
});

app.get('/ping', (req, res) => {
    const host = req.query.host
    if(host && host != ''){
        ping.sys.probe(host, (isAlive) => {
            res.json({ status: 'success', message: isAlive })
        })
    } else {
        res.json({ status: 'failed', message: 'No Host address specified' })
    }
})

// Start the server
app.listen(port);

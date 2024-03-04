[![N|Solid](https://static.wixstatic.com/media/72ffe6_da8d2142d49c42b29c96ba80c8a91a6c~mv2.png)](https://nasriya.net)
# NasriyaDNS.
[![Static Badge](https://img.shields.io/badge/license-Free_(Restricted)-blue)](https://github.com/nasriyasoftware/NasriyaDNS?tab=License-1-ov-file) ![Repository Size](https://img.shields.io/github/repo-size/nasriyasoftware/NasriyaDNS.svg) ![Last Commit](https://img.shields.io/github/last-commit/nasriyasoftware/NasriyaDNS.svg) [![Status](https://img.shields.io/badge/Status-Stable-green.svg)](link-to-your-status-page)
##### Visit us at [www.nasriya.net](https://nasriya.net).

NasriyaDNS is a DNS manager for your domains.
Made with ❤️ in **Palestine** 🇵🇸
___
If your server is running behind a dynamic IP address you can make use of **Nasriya DNS manager** to update the [DNS records](https://www.cloudflare.com/learning/dns/dns-records/) of your domain.

**Notes:**
- **NasriyaDNS** is part of [HyperCloud](https://github.com/nasriyasoftware/HyperCloud)'s HTTP2 server framework. 
- For now, only [Cloudflare](https://cloudflare.com) and [Duckdns](https://duckdns.org) are supported.
___
## Quick Start Guide

### Installation
```shellscript
npm install nasriyasoftware/NasriyaDNS
```

### Usage
Start by preparing the DNS manager and the new IP address:
```js
// require the dependency
const dnsManager = require('nasriya-dns');

// Get the machine's public IP
const public_ip = await dnsManager.helpers.getPublicIP();
```

##### DuckDNS
```js
// Initialize a provider:
const duckdns = dnsManager.duckdns(process.env.DUCKDNS_API_TOKEN);

// Update the IP address
await duckdns.records.update('<myDomain>', public_ip);
```

##### Cloudflare
```js
const cloudflare = dnsManager.cloudflare(process.env.CLOUDFLARE_API_TOKEN);

// If you know the Zone ID of your domain;
const zone_id = process.env.CLOUDFLARE_ZONE_ID;

// If you don't know the Zone ID
const zone_id = await cloudflare.zone.list({
    name: '<domain.com>',
    just_ids: true
}).then(list => list[0]);

// Get all A records:
const records = await cloudflare.records.list(zone_id, {
    type: 'A',
    simplified: true
})

// Prepare the promises
const promises = records.map(record => {
    return new Promise((resolve, reject) => {
        cloudflare.records.update({
            zone_id,
            record
            record_id: record.id,
        }).then(res => resolve(res)).catch(err => reject(err));
    })
})

// Invoke promises
await Promise.allSettled(promises).then(res => {
    const fulfilled = res.filter(i => i.status === 'fulfilled').map(i => i.value);
    const rejected = res.filter(i => i.status === 'rejected').map(i => i.reason);

    if (fulfilled.length === res.length) {
        return Promise.resolve({ status: 'success', result: fulfilled });
    } else {
        return Promise.resolve({ status: 'failed', result: rejected });
    }
})
```
___
## License
Please read the license from [here](https://github.com/nasriyasoftware/NasriyaDNS?tab=License-1-ov-file).
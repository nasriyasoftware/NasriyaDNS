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
___
## Quick Start Guide

### Installation
```shell
npm install nasriyasoftware/NasriyaDNS
```

### Importing
You can import the pacakge both in the `ES6` or `CommonJS` syntax:
```ts
// ES6 Syntax
import hyperCloudDNS from 'nasriya-dns';
```

```js
const hyperCloudDNS = require('nasriya-dns').default;
```

### Usage
Start by getting the new IP address:
```ts
// Get the machine's public IP
const public_ip: string = await hyperCloudDNS.helpers.getPublicIP();
```

##### DuckDNS
```ts
// Initialize a provider:
const duckdns: DuckDNSManager = hyperCloudDNS.duckdns(process.env.DUCKDNS_API_TOKEN);

// Update the IP address
await duckdns.records.update('<myDomain>', public_ip);
```

##### Cloudflare
```ts
import hyperCloudDNS from "nasriya-dns";
const cloudflare = hyperCloudDNS.cloudflare(process.env.CLOUDFLARE_API_TOKEN);

// If you know the Zone ID of your domain, uncomment the below line
// const zone_id = process.env.CLOUDFLARE_ZONE_ID;

// If you don't know the Zone ID. Comment the following 4 lines if you do
const zone_id: string = await cloudflare.zone.list({
    accountName: '<domain.com>',
    just_ids: true
}).then(list => list[0]) as string;

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
            record,
            record_id: record.id,
        }).then(res => resolve(res)).catch(err => reject(err));
    })
})

// Invoke promises
await Promise.allSettled(promises).then(res => {
    const fulfilled = (res.filter(i => i.status === 'fulfilled') as unknown as PromiseFulfilledResult<unknown>[]).map(i => i.value);
    const rejected = (res.filter(i => i.status === 'rejected') as unknown as PromiseRejectedResult[]).map(i => i.reason);

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
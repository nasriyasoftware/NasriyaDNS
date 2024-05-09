import CloudFlareDNSManager from './providers/cloudflare/cloudflare';
import DuckDNSManager from './providers/duckdns/duckdns';

/**A HyperCloud DNS manager */
module hypercloudDNS {
    export const helpers = Object.freeze({
        /**
         * Get the current Public IP of this machine
         * @returns {Promise<string>} The IP address of this machine
         */
        getPublicIP: (): Promise<string> => {
            return new Promise((resolve, reject) => {
                fetch('https://api.ipify.org').then(res => res.text()).then(ip => resolve(ip)).catch(err => {
                    if (err?.cause.code === 'UND_ERR_CONNECT_TIMEOUT') {
                        reject('Unable to get public IP: No internet connection');
                    } else {
                        reject(err);
                    }
                });
            });
        }
    })

    /**
     * APIs to work with Cloudflare DNS records
     * @param {string} apiToken Your cloudflare API token
     * @returns {CloudFlareDNSManager} A new instance of Cloudflare DNS Manager
     */
    export function cloudflare(apiToken: string): CloudFlareDNSManager {
        return new CloudFlareDNSManager(apiToken);
    }

    /**
     * APIs to work with Duckdns DNS records
     * @param {string} apiToken Your DuckDNS API token
     * @returns {DuckDNSManager}
     */
    export function duckdns(apiToken: string): DuckDNSManager {
        return new DuckDNSManager(apiToken);
    }
}

export default hypercloudDNS;
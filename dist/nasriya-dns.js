import CloudFlareDNSManager from './providers/cloudflare/cloudflare';
import DuckDNSManager from './providers/duckdns/duckdns';
/**A HyperCloud DNS manager */
var hypercloudDNS;
(function (hypercloudDNS) {
    hypercloudDNS.helpers = Object.freeze({
        /**
         * Get the current Public IP of this machine
         * @returns {Promise<string>} The IP address of this machine
         */
        getPublicIP: () => {
            return new Promise((resolve, reject) => {
                fetch('https://api.ipify.org').then(res => res.text()).then(ip => resolve(ip)).catch(err => {
                    if (err?.cause.code === 'UND_ERR_CONNECT_TIMEOUT') {
                        reject('Unable to get public IP: No internet connection');
                    }
                    else {
                        reject(err);
                    }
                });
            });
        }
    });
    /**
     * APIs to work with Cloudflare DNS records
     * @param {string} apiToken Your cloudflare API token
     * @returns {CloudFlareDNSManager} A new instance of Cloudflare DNS Manager
     */
    function cloudflare(apiToken) {
        return new CloudFlareDNSManager(apiToken);
    }
    hypercloudDNS.cloudflare = cloudflare;
    /**
     * APIs to work with Duckdns DNS records
     * @param {string} apiToken Your DuckDNS API token
     * @returns {DuckDNSManager}
     */
    function duckdns(apiToken) {
        return new DuckDNSManager(apiToken);
    }
    hypercloudDNS.duckdns = duckdns;
})(hypercloudDNS || (hypercloudDNS = {}));
export default hypercloudDNS;

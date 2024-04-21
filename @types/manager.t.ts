import CloudFlareDNSManager from '../providers/cloudflare/cloudflare';
import DuckDNSManager from '../providers/duckdns/duckdns';

declare class HyperCloudDNSManager {
    readonly helpers: {
        /**
         * Get the current Public IP of this machine
         * @returns {Promise<string>} The IP address of this machine
         */
        getPublicIP(): Promise<string>;
    };
    /**
     * APIs to work with Cloudflare DNS records
     * @param {string} apiToken Your cloudflare API token
     * @returns {CloudFlareDNSManager} A new instance of Cloudflare DNS Manager
     */
    cloudflare(apiToken: string): CloudFlareDNSManager;
    /**
     * APIs to work with Duckdns DNS records
     * @param {string} apiToken Your DuckDNS API token
     * @returns {DuckDNSManager}
     */
    duckdns(apiToken: string): DuckDNSManager;
}

export default new HyperCloudDNSManager();

import CloudFlareDNSManager from '../providers/cloudflare/cloudflare';
import DuckDNSManager from '../providers/duckdns/duckdns';

declare module 'hyperCloudDNS' {
    export const helpers: {
        /**
         * Get the current Public IP of this machine
         * @returns {Promise<string>} The IP address of this machine
         */
        getPublicIP: () => Promise<string>;
    };

    /**
     * APIs to work with Cloudflare DNS records
     * @param {string} apiToken Your cloudflare API token
     * @returns {CloudFlareDNSManager} A new instance of Cloudflare DNS Manager
     */
    export function cloudflare(apiToken: string): CloudFlareDNSManager;

    /**
     * APIs to work with Duckdns DNS records
     * @param {string} apiToken Your DuckDNS API token
     * @returns {DuckDNSManager}
     */
    export function duckdns(apiToken: string): DuckDNSManager;
}
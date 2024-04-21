interface DuckDNSCredentials {
    apiToken: string;
}

declare class DuckDNSManager {
    get records(): {
        /**
         * Update your `duckdns` domain's IP address
         * @param {string} domain The domain you want to update. Example: use `nasriya` if your domain is `nasriya.duckdns.org`.
         * @param {string} ipAddress The new IP address
         */
        update: (domain: string, ipAddress: string) => Promise<{
            success: boolean;
            code: number;
            message: string;
        }>;
    };
}

export default DuckDNSManager;
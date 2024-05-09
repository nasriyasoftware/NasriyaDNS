declare class DuckDNSManager {
    private readonly _apiUrl;
    private readonly credentials;
    /**
     * Create a new `DuckDNSManager` instance
     * @param {string} apiToken An API token
     */
    constructor(apiToken: string);
    readonly records: {
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

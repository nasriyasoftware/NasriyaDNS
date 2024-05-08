/**Class representing a DuckDNS manager. */
declare class DuckDNSManager {
    /**
     * Create a new `DuckDNSManager` instance.
     * @param apiToken An API token.
     */
    constructor(apiToken: string);

    /**Namespace for managing DuckDNS records. */
    readonly records: {
        /**
         * Update your DuckDNS domain's IP address.
         * @param domain The domain you want to update. Example: use `nasriya` if your domain is `nasriya.duckdns.org`.
         * @param ipAddress The new IP address.
         * @returns A promise that resolves to an object containing the success status, code, and message.
         */
        update(domain: string, ipAddress: string): Promise<{
            success: boolean;
            code: number;
            message: string;
        }>;
    };
}


export default DuckDNSManager;
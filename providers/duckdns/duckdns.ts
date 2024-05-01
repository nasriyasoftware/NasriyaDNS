import tldts from 'tldts';

interface DuckDNSCredentials {
    apiToken: string;
}

class DuckDNSManager {
    private readonly _apiUrl: string = `https://www.duckdns.org/update`;
    private readonly credentials: DuckDNSCredentials;

    /**
     * Create a new `DuckDNSManager` instance
     * @param {string} apiToken An API token
     */
    constructor(apiToken: string) {
        this.credentials = { apiToken };
    }

    public readonly records = {
        /**
         * Update your `duckdns` domain's IP address
         * @param {string} domain The domain you want to update. Example: use `nasriya` if your domain is `nasriya.duckdns.org`.
         * @param {string} ipAddress The new IP address
         */
        update: async (domain: string, ipAddress: string): Promise<{ success: boolean; code: number; message: string; }> => {
            try {
                if (typeof domain !== 'string') { throw new TypeError(`Duckdns update method expected a string type for the domain parameter, but instead got ${typeof domain}`) }
                if (domain.length === 0) { throw new RangeError(`Duckdns domain is too short`) }

                if (typeof ipAddress !== 'string') { throw new TypeError(`Duckdns update method expected a string type for the ipAddress parameter, but instead got ${typeof ipAddress}`) }
                if (!tldts.parse(ipAddress).isIp) { throw `The provided ipAddress value (${ipAddress}) is not a valid IP address` }

                const url = `${this._apiUrl}?domains=${domain}&token=${this.credentials.apiToken}&verbose=true`;

                const response = await fetch(url).then(res => res.text());
                if (response?.startsWith('OK')) {
                    const finalResponse = { success: true, code: 0, message: `` }
                    if (response.includes('NOCHANGE')) {
                        finalResponse.message = 'IP address is up to date'
                    } else {
                        finalResponse.message = `IP address has been updated`;
                        finalResponse.code = 1;
                    }

                    return Promise.resolve(finalResponse);
                } else {
                    throw response;
                }
            } catch (error) {
                console.error(error);
                if (typeof error === 'string') {
                    return Promise.reject(`Error updating DNS record: ${error}`);
                }

                if (typeof error?.message === 'string') {
                    return Promise.reject(`Error updating DNS record: ${error.message}`);
                }

                return Promise.reject('Error updating DNS record');
            }
        }
    }
}

export default DuckDNSManager;
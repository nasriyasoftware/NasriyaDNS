"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tldts_1 = __importDefault(require("tldts"));
const helpers_1 = __importDefault(require("../../utils/helpers"));
class DuckDNSManager {
    /**
     * Create a new `DuckDNSManager` instance
     * @param {string} apiToken An API token
     */
    constructor(apiToken) {
        this._apiUrl = `https://www.duckdns.org/update`;
        this.records = {
            /**
             * Update your `duckdns` domain's IP address
             * @param {string} domain The domain you want to update. Example: use `nasriya` if your domain is `nasriya.duckdns.org`.
             * @param {string} ipAddress The new IP address
             */
            update: async (domain, ipAddress) => {
                try {
                    if (typeof domain !== 'string') {
                        throw new TypeError(`Duckdns update method expected a string type for the domain parameter, but instead got ${typeof domain}`);
                    }
                    if (domain.length === 0) {
                        throw new RangeError(`Duckdns domain is too short`);
                    }
                    if (typeof ipAddress !== 'string') {
                        throw new TypeError(`Duckdns update method expected a string type for the ipAddress parameter, but instead got ${typeof ipAddress}`);
                    }
                    if (!tldts_1.default.parse(ipAddress).isIp) {
                        throw `The provided ipAddress value (${ipAddress}) is not a valid IP address`;
                    }
                    const url = `${this._apiUrl}?domains=${domain}&token=${this.credentials.apiToken}&verbose=true`;
                    const response = await fetch(url).then(res => res.text());
                    if (response === null || response === void 0 ? void 0 : response.startsWith('OK')) {
                        const finalResponse = { success: true, code: 0, message: `` };
                        if (response.includes('NOCHANGE')) {
                            finalResponse.message = 'IP address is up to date';
                        }
                        else {
                            finalResponse.message = `IP address has been updated`;
                            finalResponse.code = 1;
                        }
                        return Promise.resolve(finalResponse);
                    }
                    else {
                        throw response;
                    }
                }
                catch (error) {
                    helpers_1.default.printConsole(error);
                    if (typeof error === 'string') {
                        throw new Error(`Error updating DNS record: ${error}`);
                    }
                    if (error instanceof Error) {
                        const err = new Error(`Error updating DNS record: ${error.message}`);
                        err.stack = error.stack;
                        throw err;
                    }
                    throw error;
                }
            }
        };
        this.credentials = { apiToken };
    }
}
exports.default = DuckDNSManager;

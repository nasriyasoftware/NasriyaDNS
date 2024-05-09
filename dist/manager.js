"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudflare_1 = __importDefault(require("./providers/cloudflare/cloudflare"));
const duckdns_1 = __importDefault(require("./providers/duckdns/duckdns"));
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
        return new cloudflare_1.default(apiToken);
    }
    hypercloudDNS.cloudflare = cloudflare;
    /**
     * APIs to work with Duckdns DNS records
     * @param {string} apiToken Your DuckDNS API token
     * @returns {DuckDNSManager}
     */
    function duckdns(apiToken) {
        return new duckdns_1.default(apiToken);
    }
    hypercloudDNS.duckdns = duckdns;
})(hypercloudDNS || (hypercloudDNS = {}));
exports.default = hypercloudDNS;

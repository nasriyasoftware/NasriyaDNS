"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cloudflare_1 = __importDefault(require("./providers/cloudflare/cloudflare"));
var duckdns_1 = __importDefault(require("./providers/duckdns/duckdns"));
/**A HyperCloud DNS manager */
var HyperCloudDNS = /** @class */ (function () {
    function HyperCloudDNS() {
        this.helpers = Object.freeze({
            /**
             * Get the current Public IP of this machine
             * @returns {Promise<string>} The IP address of this machine
             */
            getPublicIP: function () {
                return new Promise(function (resolve, reject) {
                    fetch('https://api.ipify.org').then(function (res) { return res.text(); }).then(function (ip) { return resolve(ip); }).catch(function (err) {
                        if ((err === null || err === void 0 ? void 0 : err.cause.code) === 'UND_ERR_CONNECT_TIMEOUT') {
                            reject('Unable to get public IP: No internet connection');
                        }
                        else {
                            reject(err);
                        }
                    });
                });
            }
        });
    }
    /**
     * APIs to work with Cloudflare DNS records
     * @param {string} apiToken Your cloudflare API token
     * @returns {CloudFlareDNSManager} A new instance of Cloudflare DNS Manager
     */
    HyperCloudDNS.prototype.cloudflare = function (apiToken) {
        return new cloudflare_1.default(apiToken);
    };
    /**
     * APIs to work with Duckdns DNS records
     * @param {string} apiToken Your DuckDNS API token
     * @returns {DuckDNSManager}
     */
    HyperCloudDNS.prototype.duckdns = function (apiToken) {
        return new duckdns_1.default(apiToken);
    };
    return HyperCloudDNS;
}());
exports.default = new HyperCloudDNS;

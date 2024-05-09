"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const docs_1 = require("../../docs/docs");
const helpers_1 = __importDefault(require("../../utils/helpers"));
class CloudFlareDNSManager {
    _apiUrl = `https://api.cloudflare.com/client/v4`;
    _baseUrl = `${this._apiUrl}/zones`;
    _credentials = Object.seal({
        apiToken: null,
    });
    /**@param {string} apiToken An API token with ```Edit``` permission. */
    constructor(apiToken) {
        try {
            if (typeof apiToken === 'string' && apiToken.length > 10) {
                this._credentials.apiToken = apiToken;
            }
            else {
                throw new Error('Invalid api token');
            }
        }
        catch (error) {
            helpers_1.default.printConsole(error);
            if (typeof error === 'string') {
                throw new Error(`Cloudflare credentials error: ${error}`);
            }
            if (error instanceof Error) {
                const err = new Error(`Cloudflare credentials error: ${error.message}`);
                err.stack = error.stack;
                throw err;
            }
            throw error;
        }
    }
    zone = {
        /**
        * Get a list of the available DNS zones on your account
        * @param {object} [options] List options
        * @param {boolean} [options.just_ids] Only return the IDs
        * @param {string} [options.accountName] The account name. E.g: ```domain.com```.
        * @returns {Promise<string[]|Object[]>} The available DNS zone IDs
        */
        list: async (options) => {
            try {
                /**Validity of account name */
                let validAN = false;
                if (options && 'accountName' in options && options.accountName) {
                    validAN = helpers_1.default.validate.domains(options?.accountName);
                    if (!validAN) {
                        throw new Error(`The provided account name (${options.accountName}) is not a valid domain`);
                    }
                    options.accountName = encodeURIComponent(options.accountName);
                }
                const url = `${this._baseUrl}${validAN ? `?name=${options?.accountName}` : ''}`;
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this._credentials.apiToken}`,
                    }
                });
                const data = await response.json();
                if (!data.success) {
                    const error = data.errors;
                    helpers_1.default.printConsole('Cloudflare DNS zone list inquiry has failed with the following error');
                    helpers_1.default.printConsole(error);
                    throw new Error('Cloudflare DNS zone list inquiry has failed');
                }
                if (data.result.length > 0) {
                    return options?.just_ids === true ? data.result.map((i) => i.id) : [];
                }
                else {
                    return [];
                }
            }
            catch (error) {
                helpers_1.default.printConsole(error);
                if (typeof error === 'string') {
                    throw new Error(`Error retrieving Zone list: ${error}`);
                }
                if (error instanceof Error) {
                    const err = new Error(`Error retrieving Zone list: ${error.message}`);
                    err.stack = error.stack;
                    throw err;
                }
                throw error;
            }
        },
        /**
         * Display the details of a zone
         * @param {string} zone_id The zone ID you want to show the details for
         * @returns {Promise<object|null>}
         */
        details: async (zone_id) => {
            try {
                if (typeof zone_id !== 'string' || zone_id.length === 0 || zone_id.length > 32) {
                    throw new Error(`${zone_id} is an invalid zone ID`);
                }
                const response = await fetch(`${this._baseUrl}/${zone_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this._credentials.apiToken}`,
                    }
                });
                const data = await response.json();
                if (!data.success) {
                    const error = data.errors;
                    helpers_1.default.printConsole('Cloudflare DNS zone details inquiry has failed with the following error');
                    helpers_1.default.printConsole(error);
                    throw new Error('Cloudflare DNS zone details inquiry has failed');
                }
                if (data && 'id' in data.result && 'account' in data.result) {
                    return data.result;
                }
                else {
                    return null;
                }
            }
            catch (error) {
                helpers_1.default.printConsole(error);
                if (typeof error === 'string') {
                    throw new Error(`Error retrieving Zone details: ${error}`);
                }
                if (error instanceof Error) {
                    const err = new Error(`Error retrieving Zone details: ${error.message}`);
                    err.stack = error.stack;
                    throw err;
                }
                throw error;
            }
        }
    };
    records = {
        /**
         * Get a list of records on a specific zone
         * @param {string} zone_id The zone ID of your domain
         * @param {object} [options]
         * @param {boolean} [options.simplified] Returns minimal footprint
         * @param {DNSRecordType} [options.type]
         */
        list: async (zone_id, options) => {
            try {
                if (typeof zone_id !== 'string' || zone_id.length === 0 || zone_id.length > 32) {
                    throw new Error(`${zone_id} is an invalid zone ID`);
                }
                let query = '';
                if (options && 'type' in options && options.type) {
                    if (docs_1.dnsRecordTypes.includes(options.type)) {
                        query = `?type=${options.type}`;
                    }
                    else {
                        throw `${options.type} is not a valid type of DNS records.`;
                    }
                }
                const url = `${this._baseUrl}/${zone_id}/dns_records${query}`;
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this._credentials.apiToken}`,
                    }
                });
                const data = await response.json();
                if (!data.success) {
                    const error = data.errors;
                    helpers_1.default.printConsole('Cloudflare DNS records inquiry has failed with the following error');
                    helpers_1.default.printConsole(error);
                    throw new Error('Cloudflare DNS records inquiry has failed');
                }
                if (options?.simplified === true) {
                    const fields = ['id', 'type', 'name', 'content', 'proxied'];
                    return data.result.map((i) => {
                        const item = {};
                        fields.forEach((field) => {
                            item[field] = i[field];
                        });
                        return item;
                    });
                }
                else {
                    return data.result;
                }
            }
            catch (error) {
                helpers_1.default.printConsole(error);
                if (typeof error === 'string') {
                    throw new Error(`Error retrieving DNS records: ${error}`);
                }
                if (error instanceof Error) {
                    const err = new Error(`Error retrieving DNS records: ${error.message}`);
                    err.stack = error.stack;
                    throw err;
                }
                throw error;
            }
        },
        /**
         * Update the
         * @param {DNSRecordUpdateOptions} options
         * @returns {Promise<DNSRecordResult>}
         * @example
         * // Update Cloudflare DNS records to the new public IP
         * import hypercloud from 'nasriya-hypercloud';
         * const cloudflare = hypercloud.dnsManager.cloudflare('your_api_token');
         *
         * // Get the current public IP:
         * const publicIp = await hypercloud.dnsManager.helpers.getPublicIP();
         *
         * // Prepare your records:
         * const records = [
         *      { id: '<wildcard_record_id>', name: '*', content: publicIp, type: 'A' }, // Wildcard (subdomains)
         *      { id: '<root_record_id>', name: '@', content: publicIp, type: 'A' }  // The root
         * ]
         *
         * // Setup promises
         * const updateResult = await Promise.allSettled(promises).then(res => {
         *      const fulfilled = res.filter(i => i.status === 'fulfilled').map(i => i.value);
         *      const fulfilled = res.filter(i => i.status === 'fulfilled').map(i => i.value);
         *
         *      if (fulfilled.length === records.length) {
         *          return Promise.resolve({ status: 'success', result: fulfilled });
         *      } else {
         *          return Promise.resolve({ status: 'failed', result: rejected });
         *      }
         *
         *      if (updateResult.status === 'failed') {
         *          console.error(updateResult.result)
         *      }
         * })
         */
        update: async (options) => {
            helpers_1.default.printConsole('Updating DNS record..');
            try {
                if (!options) {
                    throw new Error('Cloudflare update DNS options are missing');
                }
                if (!('zone_id' in options)) {
                    throw 'The zone_id is missing';
                }
                if (!('record_id' in options)) {
                    throw 'The record_id is missing';
                }
                if (!('record' in options)) {
                    throw 'The record is missing';
                }
                if (typeof options.zone_id !== 'string' || options.zone_id.length === 0 || options.zone_id.length > 32) {
                    throw new Error(`${options.zone_id} is an invalid zone ID`);
                }
                if (typeof options.record_id !== 'string' || options.record_id.length === 0) {
                    throw new Error(`${options.record_id} is not a valid record ID`);
                }
                if (options.record.type !== 'A') {
                    return Promise.resolve({ success: false, code: 100008, message: `${options.record.type} is not yet supported.` });
                }
                const url = `${this._baseUrl}/${options.zone_id}/dns_records/${options.record_id}`;
                const response = await fetch(url, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this._credentials.apiToken}`,
                    },
                    body: JSON.stringify(options.record)
                });
                const data = await response.json();
                if (!data.success) {
                    const error = data.errors;
                    helpers_1.default.printConsole('Cloudflare DNS record update has failed with the following error');
                    helpers_1.default.printConsole(error);
                    throw new Error('Cloudflare DNS record update has failed');
                }
                return Promise.resolve({ success: true, code: 2, message: 'The record content has been updated' });
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
}
exports.default = CloudFlareDNSManager;

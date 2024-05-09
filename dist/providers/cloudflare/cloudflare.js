"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var docs_1 = require("../../docs/docs");
var helpers_1 = __importDefault(require("../../utils/helpers"));
var CloudFlareDNSManager = /** @class */ (function () {
    /**@param {string} apiToken An API token with ```Edit``` permission. */
    function CloudFlareDNSManager(apiToken) {
        var _this = this;
        this._apiUrl = "https://api.cloudflare.com/client/v4";
        this._baseUrl = "".concat(this._apiUrl, "/zones");
        this._credentials = Object.seal({
            apiToken: null,
        });
        this.zone = {
            /**
            * Get a list of the available DNS zones on your account
            * @param {object} [options] List options
            * @param {boolean} [options.just_ids] Only return the IDs
            * @param {string} [options.accountName] The account name. E.g: ```domain.com```.
            * @returns {Promise<string[]|Object[]>} The available DNS zone IDs
            */
            list: function (options) { return __awaiter(_this, void 0, void 0, function () {
                var validAN, url, response, data, error, error_1, err;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            validAN = false;
                            if (options && 'accountName' in options && options.accountName) {
                                validAN = helpers_1.default.validate.domains(options === null || options === void 0 ? void 0 : options.accountName);
                                if (!validAN) {
                                    throw new Error("The provided account name (".concat(options.accountName, ") is not a valid domain"));
                                }
                                options.accountName = encodeURIComponent(options.accountName);
                            }
                            url = "".concat(this._baseUrl).concat(validAN ? "?name=".concat(options === null || options === void 0 ? void 0 : options.accountName) : '');
                            return [4 /*yield*/, fetch(url, {
                                    method: 'GET',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': "Bearer ".concat(this._credentials.apiToken),
                                    }
                                })];
                        case 1:
                            response = _a.sent();
                            return [4 /*yield*/, response.json()];
                        case 2:
                            data = _a.sent();
                            if (!data.success) {
                                error = data.errors;
                                helpers_1.default.printConsole('Cloudflare DNS zone list inquiry has failed with the following error');
                                helpers_1.default.printConsole(error);
                                throw new Error('Cloudflare DNS zone list inquiry has failed');
                            }
                            if (data.result.length > 0) {
                                return [2 /*return*/, (options === null || options === void 0 ? void 0 : options.just_ids) === true ? data.result.map(function (i) { return i.id; }) : []];
                            }
                            else {
                                return [2 /*return*/, []];
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _a.sent();
                            helpers_1.default.printConsole(error_1);
                            if (typeof error_1 === 'string') {
                                throw new Error("Error retrieving Zone list: ".concat(error_1));
                            }
                            if (error_1 instanceof Error) {
                                err = new Error("Error retrieving Zone list: ".concat(error_1.message));
                                err.stack = error_1.stack;
                                throw err;
                            }
                            throw error_1;
                        case 4: return [2 /*return*/];
                    }
                });
            }); },
            /**
             * Display the details of a zone
             * @param {string} zone_id The zone ID you want to show the details for
             * @returns {Promise<object|null>}
             */
            details: function (zone_id) { return __awaiter(_this, void 0, void 0, function () {
                var response, data, error, error_2, err;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            if (typeof zone_id !== 'string' || zone_id.length === 0 || zone_id.length > 32) {
                                throw new Error("".concat(zone_id, " is an invalid zone ID"));
                            }
                            return [4 /*yield*/, fetch("".concat(this._baseUrl, "/").concat(zone_id), {
                                    method: 'GET',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': "Bearer ".concat(this._credentials.apiToken),
                                    }
                                })];
                        case 1:
                            response = _a.sent();
                            return [4 /*yield*/, response.json()];
                        case 2:
                            data = _a.sent();
                            if (!data.success) {
                                error = data.errors;
                                helpers_1.default.printConsole('Cloudflare DNS zone details inquiry has failed with the following error');
                                helpers_1.default.printConsole(error);
                                throw new Error('Cloudflare DNS zone details inquiry has failed');
                            }
                            if (data && 'id' in data.result && 'account' in data.result) {
                                return [2 /*return*/, data.result];
                            }
                            else {
                                return [2 /*return*/, null];
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            error_2 = _a.sent();
                            helpers_1.default.printConsole(error_2);
                            if (typeof error_2 === 'string') {
                                throw new Error("Error retrieving Zone details: ".concat(error_2));
                            }
                            if (error_2 instanceof Error) {
                                err = new Error("Error retrieving Zone details: ".concat(error_2.message));
                                err.stack = error_2.stack;
                                throw err;
                            }
                            throw error_2;
                        case 4: return [2 /*return*/];
                    }
                });
            }); }
        };
        this.records = {
            /**
             * Get a list of records on a specific zone
             * @param {string} zone_id The zone ID of your domain
             * @param {object} [options]
             * @param {boolean} [options.simplified] Returns minimal footprint
             * @param {DNSRecordType} [options.type]
             */
            list: function (zone_id, options) { return __awaiter(_this, void 0, void 0, function () {
                var query, url, response, data, error, fields_1, error_3, err;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            if (typeof zone_id !== 'string' || zone_id.length === 0 || zone_id.length > 32) {
                                throw new Error("".concat(zone_id, " is an invalid zone ID"));
                            }
                            query = '';
                            if (options && 'type' in options && options.type) {
                                if (docs_1.dnsRecordTypes.includes(options.type)) {
                                    query = "?type=".concat(options.type);
                                }
                                else {
                                    throw "".concat(options.type, " is not a valid type of DNS records.");
                                }
                            }
                            url = "".concat(this._baseUrl, "/").concat(zone_id, "/dns_records").concat(query);
                            return [4 /*yield*/, fetch(url, {
                                    method: 'GET',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': "Bearer ".concat(this._credentials.apiToken),
                                    }
                                })];
                        case 1:
                            response = _a.sent();
                            return [4 /*yield*/, response.json()];
                        case 2:
                            data = _a.sent();
                            if (!data.success) {
                                error = data.errors;
                                helpers_1.default.printConsole('Cloudflare DNS records inquiry has failed with the following error');
                                helpers_1.default.printConsole(error);
                                throw new Error('Cloudflare DNS records inquiry has failed');
                            }
                            if ((options === null || options === void 0 ? void 0 : options.simplified) === true) {
                                fields_1 = ['id', 'type', 'name', 'content', 'proxied'];
                                return [2 /*return*/, data.result.map(function (i) {
                                        var item = {};
                                        fields_1.forEach(function (field) {
                                            item[field] = i[field];
                                        });
                                        return item;
                                    })];
                            }
                            else {
                                return [2 /*return*/, data.result];
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            error_3 = _a.sent();
                            helpers_1.default.printConsole(error_3);
                            if (typeof error_3 === 'string') {
                                throw new Error("Error retrieving DNS records: ".concat(error_3));
                            }
                            if (error_3 instanceof Error) {
                                err = new Error("Error retrieving DNS records: ".concat(error_3.message));
                                err.stack = error_3.stack;
                                throw err;
                            }
                            throw error_3;
                        case 4: return [2 /*return*/];
                    }
                });
            }); },
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
            update: function (options) { return __awaiter(_this, void 0, void 0, function () {
                var url, response, data, error, error_4, err;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            helpers_1.default.printConsole('Updating DNS record..');
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
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
                                throw new Error("".concat(options.zone_id, " is an invalid zone ID"));
                            }
                            if (typeof options.record_id !== 'string' || options.record_id.length === 0) {
                                throw new Error("".concat(options.record_id, " is not a valid record ID"));
                            }
                            if (options.record.type !== 'A') {
                                return [2 /*return*/, Promise.resolve({ success: false, code: 100008, message: "".concat(options.record.type, " is not yet supported.") })];
                            }
                            url = "".concat(this._baseUrl, "/").concat(options.zone_id, "/dns_records/").concat(options.record_id);
                            return [4 /*yield*/, fetch(url, {
                                    method: 'PATCH',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': "Bearer ".concat(this._credentials.apiToken),
                                    },
                                    body: JSON.stringify(options.record)
                                })];
                        case 2:
                            response = _a.sent();
                            return [4 /*yield*/, response.json()];
                        case 3:
                            data = _a.sent();
                            if (!data.success) {
                                error = data.errors;
                                helpers_1.default.printConsole('Cloudflare DNS record update has failed with the following error');
                                helpers_1.default.printConsole(error);
                                throw new Error('Cloudflare DNS record update has failed');
                            }
                            return [2 /*return*/, Promise.resolve({ success: true, code: 2, message: 'The record content has been updated' })];
                        case 4:
                            error_4 = _a.sent();
                            helpers_1.default.printConsole(error_4);
                            if (typeof error_4 === 'string') {
                                throw new Error("Error updating DNS record: ".concat(error_4));
                            }
                            if (error_4 instanceof Error) {
                                err = new Error("Error updating DNS record: ".concat(error_4.message));
                                err.stack = error_4.stack;
                                throw err;
                            }
                            throw error_4;
                        case 5: return [2 /*return*/];
                    }
                });
            }); }
        };
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
                throw new Error("Cloudflare credentials error: ".concat(error));
            }
            if (error instanceof Error) {
                var err = new Error("Cloudflare credentials error: ".concat(error.message));
                err.stack = error.stack;
                throw err;
            }
            throw error;
        }
    }
    return CloudFlareDNSManager;
}());
exports.default = CloudFlareDNSManager;

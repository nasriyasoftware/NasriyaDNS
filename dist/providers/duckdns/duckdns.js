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
var tldts_1 = __importDefault(require("tldts"));
var helpers_1 = __importDefault(require("../../utils/helpers"));
var DuckDNSManager = /** @class */ (function () {
    /**
     * Create a new `DuckDNSManager` instance
     * @param {string} apiToken An API token
     */
    function DuckDNSManager(apiToken) {
        var _this = this;
        this._apiUrl = "https://www.duckdns.org/update";
        this.records = {
            /**
             * Update your `duckdns` domain's IP address
             * @param {string} domain The domain you want to update. Example: use `nasriya` if your domain is `nasriya.duckdns.org`.
             * @param {string} ipAddress The new IP address
             */
            update: function (domain, ipAddress) { return __awaiter(_this, void 0, void 0, function () {
                var url, response, finalResponse, error_1, err;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            if (typeof domain !== 'string') {
                                throw new TypeError("Duckdns update method expected a string type for the domain parameter, but instead got ".concat(typeof domain));
                            }
                            if (domain.length === 0) {
                                throw new RangeError("Duckdns domain is too short");
                            }
                            if (typeof ipAddress !== 'string') {
                                throw new TypeError("Duckdns update method expected a string type for the ipAddress parameter, but instead got ".concat(typeof ipAddress));
                            }
                            if (!tldts_1.default.parse(ipAddress).isIp) {
                                throw "The provided ipAddress value (".concat(ipAddress, ") is not a valid IP address");
                            }
                            url = "".concat(this._apiUrl, "?domains=").concat(domain, "&token=").concat(this.credentials.apiToken, "&verbose=true");
                            return [4 /*yield*/, fetch(url).then(function (res) { return res.text(); })];
                        case 1:
                            response = _a.sent();
                            if (response === null || response === void 0 ? void 0 : response.startsWith('OK')) {
                                finalResponse = { success: true, code: 0, message: "" };
                                if (response.includes('NOCHANGE')) {
                                    finalResponse.message = 'IP address is up to date';
                                }
                                else {
                                    finalResponse.message = "IP address has been updated";
                                    finalResponse.code = 1;
                                }
                                return [2 /*return*/, Promise.resolve(finalResponse)];
                            }
                            else {
                                throw response;
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            helpers_1.default.printConsole(error_1);
                            if (typeof error_1 === 'string') {
                                throw new Error("Error updating DNS record: ".concat(error_1));
                            }
                            if (error_1 instanceof Error) {
                                err = new Error("Error updating DNS record: ".concat(error_1.message));
                                err.stack = error_1.stack;
                                throw err;
                            }
                            throw error_1;
                        case 3: return [2 /*return*/];
                    }
                });
            }); }
        };
        this.credentials = { apiToken: apiToken };
    }
    return DuckDNSManager;
}());
exports.default = DuckDNSManager;

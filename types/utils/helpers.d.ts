declare class Helpers {
    /**
     * Print something on the debug level
     * @param {string|any} message
     * @returns {void}
    */
    printConsole(message: string | any): void;
    readonly validate: Readonly<{
        /**
         * Validate an IPv4 or IPv6 address
         * @example
         * // Example usage:
         * console.log(validate.ipAddress('192.168.0.1')); // true
         * console.log(validate.ipAddress('2001:0db8:85a3:0000:0000:8a2e:0370:7334')); // true
         * console.log(validate.ipAddress('invalid')); // false
         * @param {string} ip The IP address to validate
         * @returns {boolean}
         */
        ipAddress: (ip: string) => boolean;
        /**
         * Pass domain(s) to check whether they're valid to be used for the SSL certificate
         * @param {string|string[]} toCheck The domain(s) to check
         * @returns {boolean}
        */
        domains: (toCheck: string | string[]) => boolean;
        /**
         * Check the syntax validity of an email address
         * @param {string} email The email address to check
         * @returns {boolean}
        */
        email: (email: string) => boolean;
    }>;
}
declare const _default: Helpers;
export default _default;

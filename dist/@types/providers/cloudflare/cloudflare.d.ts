import { DNSRecordType, A_Record_Cloudflare } from '../../docs/docs';
declare class CloudFlareDNSManager {
    private readonly _apiUrl;
    private readonly _baseUrl;
    private _credentials;
    /**@param {string} apiToken An API token with ```Edit``` permission. */
    constructor(apiToken: string);
    readonly zone: {
        /**
        * Get a list of the available DNS zones on your account
        * @param {object} [options] List options
        * @param {boolean} [options.just_ids] Only return the IDs
        * @param {string} [options.accountName] The account name. E.g: ```domain.com```.
        * @returns {Promise<string[]|Object[]>} The available DNS zone IDs
        */
        list: (options?: {
            just_ids?: boolean;
            accountName?: string;
        }) => Promise<Object[] | string[]>;
        /**
         * Display the details of a zone
         * @param {string} zone_id The zone ID you want to show the details for
         * @returns {Promise<object|null>}
         */
        details: (zone_id: string) => Promise<object | null>;
    };
    readonly records: {
        /**
         * Get a list of records on a specific zone
         * @param {string} zone_id The zone ID of your domain
         * @param {object} [options]
         * @param {boolean} [options.simplified] Returns minimal footprint
         * @param {DNSRecordType} [options.type]
         */
        list: (zone_id: string, options?: {
            simplified?: boolean;
            type?: DNSRecordType;
        }) => Promise<any[]>;
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
        update: (options: DNSRecordUpdateOptions) => Promise<DNSRecordUpdateResult>;
    };
}
interface DNSRecordUpdateOptions {
    zone_id: string;
    record_id: string;
    record: A_Record_Cloudflare;
}
interface DNSRecordUpdateResult {
    success: boolean;
    code: number;
    message: string;
}
export default CloudFlareDNSManager;

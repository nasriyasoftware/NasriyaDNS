import { DNSRecordType, A_Record_Cloudflare } from '../../../utils/types';

/** Class representing a CloudFlare DNS Manager */
declare class CloudFlareDNSManager {
    /**
     * Constructor for the CloudFlareDNSManager class.
     * @param apiToken An API token with ```Edit``` permission.
     */
    constructor(apiToken: string);

    /**Methods to interact with DNS zones. */
    readonly zone: {
        /**
         * Get a list of the available DNS zones on your account.
         * @param options List options.
         * @returns The available DNS zone IDs.
         */
        list(options?: { just_ids?: boolean; accountName?: string }): Promise<Object[] | string[]>;

        /**
         * Display the details of a zone.
         * @param zone_id The zone ID you want to show the details for.
         * @returns The details of the zone.
         */
        details(zone_id: string): Promise<object | null>;
    };

    /**Methods to interact with DNS records. */
    readonly records: {
        /**
         * Get a list of records on a specific zone.
         * @param zone_id The zone ID of your domain.
         * @param options Options for listing DNS records.
         * @returns The list of DNS records.
         */
        list(zone_id: string, options?: { simplified?: boolean; type?: DNSRecordType }): Promise<any[]>;

        /**
         * Update a DNS record.
         * @param options Options for updating DNS records.
         * @returns The result of the update operation.
         */
        update(options: DNSRecordUpdateOptions): Promise<DNSRecordUpdateResult>;
    };
}

/** Interface for the options of updating DNS records */
interface DNSRecordUpdateOptions {
    zone_id: string;
    record_id: string;
    record: A_Record_Cloudflare;
}

/** Interface for the result of updating DNS records */
interface DNSRecordUpdateResult {
    success: boolean;
    code: number;
    message: string;
}

export default CloudFlareDNSManager;
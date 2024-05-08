export interface CloudflareDNSUpdate {
    email: string; // The email address of your cloudflare account
    apiKey: string; // An API key with `Edit` permission.
    zone_id: string; // The zone ID
    record_id: string; // The record ID
}

export type DNSRecordType = 'A' | 'AAAA' | 'CAA' | 'CERT' | 'CNAME' | 'DINSKEY' | 'DS' | 'HTTPS' | 'LOC' | 'MX' | 'NAPTR' | 'NS' | 'PTR' | 'SMIMEA' | 'SVR' | 'SSHFP' | 'SVCB' | 'TLSA' | 'TXT' | 'URI';

export const dnsRecordTypes: DNSRecordType[] = ['A', 'AAAA', 'CAA', 'CERT', 'CNAME', 'DINSKEY', 'DS', 'HTTPS', 'LOC', 'MX', 'NAPTR', 'NS', 'PTR', 'SMIMEA', 'SVR', 'SSHFP', 'SVCB', 'TLSA', 'TXT', 'URI'];

export interface A_Record_Cloudflare {
    content: string; // A valid IPv4 address. Example: `198.51.100.4`.
    name: string; // DNS record name (or @ for the zone apex) in Punycode. `<= 255 characters`. Example: `example.com`.
    type: 'A'; // Record type.
    ttl?: number; // Time To Live (TTL) of the DNS record in seconds. Setting to 1 means 'automatic'. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.
    proxied?: boolean; // Whether the record is receiving the performance and security benefits of Cloudflare.
    comment?: string; // Comments or notes about the DNS record. This field has no effect on DNS responses.
    tags?: string[]; // Custom tags for the DNS record. This field has no effect on DNS responses.
}
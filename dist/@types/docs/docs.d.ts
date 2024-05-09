export interface CloudflareDNSUpdate {
    email: string;
    apiKey: string;
    zone_id: string;
    record_id: string;
}
export type DNSRecordType = 'A' | 'AAAA' | 'CAA' | 'CERT' | 'CNAME' | 'DINSKEY' | 'DS' | 'HTTPS' | 'LOC' | 'MX' | 'NAPTR' | 'NS' | 'PTR' | 'SMIMEA' | 'SVR' | 'SSHFP' | 'SVCB' | 'TLSA' | 'TXT' | 'URI';
export declare const dnsRecordTypes: DNSRecordType[];
export interface A_Record_Cloudflare {
    content: string;
    name: string;
    type: 'A';
    ttl?: number;
    proxied?: boolean;
    comment?: string;
    tags?: string[];
}

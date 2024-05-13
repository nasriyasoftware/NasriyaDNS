import CloudFlareDNSManager from '../../../src/providers/cloudflare/cloudflare';

describe('Testing Cloudflare provider', () => {
    const cl = new CloudFlareDNSManager('asdasdasdasdasdasdasdasdasd');

    test('If the constructor is working properly', () => {
        expect(cl).toBeInstanceOf(CloudFlareDNSManager);
        expect(cl).toHaveProperty('records');
        expect(cl).toHaveProperty('zone');
    })

    test('Not providing a string API token, with a length greater than 10 will throw an error', () => {
        expect(() => new CloudFlareDNSManager('')).toThrow('Cloudflare credentials error: Invalid api token');
        expect(() => new CloudFlareDNSManager('4554')).toThrow('Cloudflare credentials error: Invalid api token');
        // @ts-ignore
        expect(() => new CloudFlareDNSManager()).toThrow('Cloudflare credentials error: Invalid api token');
        // @ts-ignore
        expect(() => new CloudFlareDNSManager(654654)).toThrow('Cloudflare credentials error: Invalid api token');
        // @ts-ignore
        expect(() => new CloudFlareDNSManager({})).toThrow('Cloudflare credentials error: Invalid api token');
        // @ts-ignore
        expect(() => new CloudFlareDNSManager([])).toThrow('Cloudflare credentials error: Invalid api token');
    })

    describe('Checking the records methods', () => {
        test('Methods exist', () => {
            expect(cl.records).toHaveProperty('list');
            expect(cl.records).toHaveProperty('update');
        })

        test('Methods are the correct type', () => {
            expect(typeof cl.records.list).toBe('function');
            expect(typeof cl.records.update).toBe('function');
        })
    })

})
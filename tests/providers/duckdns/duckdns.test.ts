import DuckDNSManager from '../../../src/providers/duckdns/duckdns';

describe('Testing Duck DNS provider', () => {
    const cl = new DuckDNSManager('asdasdasdasdasdasdasdasdasd');

    test('If the constructor is working properly', () => {
        expect(cl).toBeInstanceOf(DuckDNSManager);
        expect(cl).toHaveProperty('records');
    })

    test('Not providing a string API token, with a length greater than 10 will throw an error', () => {
        expect(() => new DuckDNSManager('')).toThrow('DuckDNS credentials error: Invalid api token');
        expect(() => new DuckDNSManager('4554')).toThrow('DuckDNS credentials error: Invalid api token');
        // @ts-ignore
        expect(() => new DuckDNSManager()).toThrow('DuckDNS credentials error: Invalid api token');
        // @ts-ignore
        expect(() => new DuckDNSManager(654654)).toThrow('DuckDNS credentials error: Invalid api token');
        // @ts-ignore
        expect(() => new DuckDNSManager({})).toThrow('DuckDNS credentials error: Invalid api token');
        // @ts-ignore
        expect(() => new DuckDNSManager([])).toThrow('DuckDNS credentials error: Invalid api token');
    })

    describe('Checking the records methods', () => {
        test('Methods exist', () => {
            expect(cl.records).toHaveProperty('update');
        })

        test('Methods are the correct type', () => {
            expect(typeof cl.records.update).toBe('function');
        })
    })

})
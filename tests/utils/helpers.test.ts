import helpers from '../../src/utils/helpers';

describe('Testing helpers functions', () => {

    describe('Testing validators', () => {
        test('Properly validate ip addresses', () => {
            expect(helpers.validate.ipAddress('192.168.0.1')).toBe(true);
            expect(helpers.validate.ipAddress('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe(true);
            expect(helpers.validate.ipAddress('asdasdasd')).toBe(false);
            // @ts-ignore
            expect(helpers.validate.ipAddress(546)).toBe(false);
            // @ts-ignore
            expect(helpers.validate.ipAddress(true)).toBe(false);
            // @ts-ignore
            expect(helpers.validate.ipAddress({})).toBe(false);
            // @ts-ignore
            expect(helpers.validate.ipAddress([])).toBe(false);
            // @ts-ignore
            expect(helpers.validate.ipAddress(-465)).toBe(false);
            // @ts-ignore
            expect(helpers.validate.ipAddress(undefined)).toBe(false);
            // @ts-ignore
            expect(helpers.validate.ipAddress(null)).toBe(false);
        });

        test('Properly validate domains', () => {
            expect(helpers.validate.domains('asdasd')).toBe(false);
            expect(helpers.validate.domains('nasriya.net')).toBe(true);
            expect(helpers.validate.domains(['asd'])).toBe(false);
            // @ts-ignore
            expect(helpers.validate.domains([564])).toBe(false);
            // @ts-ignore
            expect(() => helpers.validate.domains(65446)).toThrow(`The value that was passed on the "validate.domains()" method is invalid. Expected a string or an array of strings but instead got ${typeof 65446}`);
            // @ts-ignore
            expect(() => helpers.validate.domains({})).toThrow(`The value that was passed on the "validate.domains()" method is invalid. Expected a string or an array of strings but instead got ${typeof {}}`);
            // @ts-ignore
            expect(() => helpers.validate.domains(true)).toThrow(`The value that was passed on the "validate.domains()" method is invalid. Expected a string or an array of strings but instead got ${typeof true}`);

        })

        test('Properly validate email addresses', () => {
            expect(helpers.validate.email('asdasd')).toBe(false);
            expect(helpers.validate.email('support@nasriya.net')).toBe(true);
            // @ts-ignore
            expect(helpers.validate.email(654654)).toBe(false);
            // @ts-ignore
            expect(helpers.validate.email([])).toBe(false);
            // @ts-ignore
            expect(helpers.validate.email({})).toBe(false);
            // @ts-ignore
            expect(helpers.validate.email(true)).toBe(false);
        })
    })
})
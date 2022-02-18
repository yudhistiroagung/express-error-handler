import { payloadSchema } from './index';

describe('Validation tests', () => {
    it('should not return error', async () => {
        const mockPayload = {
            status: 900
        };

        const res = await payloadSchema.validateAsync(mockPayload);

        expect(res).toEqual(mockPayload);
    });
})
import { getBggApiUrl } from '../bggApi';

describe('getBggApiUrl', () => {
    it('should construct URL with basic endpoint', () => {
        const result = getBggApiUrl('thing?id=174430');
        expect(result).toBe(
            'https://boardgamegeek.com/xmlapi2/thing?id=174430'
        );
    });

    it('should construct URL with search endpoint', () => {
        const result = getBggApiUrl('search?query=Gloomhaven');
        expect(result).toBe(
            'https://boardgamegeek.com/xmlapi2/search?query=Gloomhaven'
        );
    });

    it('should handle endpoint with leading slash', () => {
        const result = getBggApiUrl('/collection?username=example');
        expect(result).toBe(
            'https://boardgamegeek.com/xmlapi2/collection?username=example'
        );
    });

    it('should handle endpoint without leading slash', () => {
        const result = getBggApiUrl('collection?username=example');
        expect(result).toBe(
            'https://boardgamegeek.com/xmlapi2/collection?username=example'
        );
    });

    it('should handle empty endpoint', () => {
        const result = getBggApiUrl('');
        expect(result).toBe('https://boardgamegeek.com/xmlapi2/');
    });

    it('should handle endpoint with just a slash', () => {
        const result = getBggApiUrl('/');
        expect(result).toBe('https://boardgamegeek.com/xmlapi2/');
    });
});

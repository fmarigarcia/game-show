import { getCollection } from '../getCollection';
import { getBggApiUrl } from '../helpers';

// Mock the global fetch
global.fetch = jest.fn();

// Mock xml2js
jest.mock('xml-js', () => ({
    xml2js: jest.fn(),
}));

import { xml2js } from 'xml-js';

const mockXml2js = xml2js as jest.MockedFunction<typeof xml2js>;

describe('getCollection', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch collection data and return sanitized games array', async () => {
        const mockXmlResponse = `<?xml version="1.0" encoding="utf-8"?>
            <items totalitems="2" termsofuse="https://boardgamegeek.com/xmlapi/termsofuse" pubdate="Thu, 01 Jan 1970 00:00:00 +0000">
                <item objecttype="thing" objectid="174430" subtype="boardgame" collid="12345">
                    <name sortindex="1">Gloomhaven</name>
                    <yearpublished>2017</yearpublished>
                    <image>https://cf.geekdo-images.com/original/img/lDN358RgcYvQfYYN6Oy2TXpifyM=/0x0/pic2437871.jpg</image>
                    <thumbnail>https://cf.geekdo-images.com/thumb/img/e7GyV3RNhtAzfqI29ONIFJLu7sM=/fit-in/200x150/pic2437871.jpg</thumbnail>
                    <status own="1" prevowned="0" fortrade="0" want="0" wanttoplay="0" wanttobuy="0" wishlist="0" preordered="0" lastmodified="2023-01-01 12:00:00"/>
                    <numplays>5</numplays>
                </item>
            </items>`;

        const mockCollectionObject = {
            _declaration: {
                _attributes: {
                    version: '1.0',
                    encoding: 'utf-8',
                    standalone: 'yes',
                },
            },
            items: {
                _attributes: {
                    totalitems: '1',
                    termsofuse: 'https://boardgamegeek.com/xmlapi/termsofuse',
                    pubdate: 'Thu, 01 Jan 1970 00:00:00 +0000',
                },
                item: [
                    {
                        _attributes: {
                            objecttype: 'thing' as any,
                            objectid: '174430',
                            subtype: 'boardgame' as any,
                            collid: '12345',
                        },
                        name: {
                            _attributes: {
                                sortindex: '1',
                            },
                            _text: 'Gloomhaven',
                        },
                        yearpublished: {
                            _text: '2017',
                        },
                        image: {
                            _text: 'https://cf.geekdo-images.com/original/img/lDN358RgcYvQfYYN6Oy2TXpifyM=/0x0/pic2437871.jpg',
                        },
                        thumbnail: {
                            _text: 'https://cf.geekdo-images.com/thumb/img/e7GyV3RNhtAzfqI29ONIFJLu7sM=/fit-in/200x150/pic2437871.jpg',
                        },
                        status: {
                            _attributes: {
                                own: '1',
                                prevowned: '0',
                                fortrade: '0',
                                want: '0',
                                wanttoplay: '0',
                                wanttobuy: '0',
                                wishlist: '0',
                                preordered: '0',
                                lastmodified: new Date('2023-01-01'),
                            },
                        },
                        numplays: {
                            _text: '5',
                        },
                    },
                ],
            },
        };

        const mockResponse = {
            text: jest.fn().mockResolvedValue(mockXmlResponse),
        };

        (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
        mockXml2js.mockReturnValue(mockCollectionObject as any);

        const result = await getCollection();

        expect(global.fetch).toHaveBeenCalledWith(
            getBggApiUrl('collection?username=xnelo&own=1')
        );
        expect(mockResponse.text).toHaveBeenCalled();
        expect(mockXml2js).toHaveBeenCalledWith(mockXmlResponse, {
            compact: true,
        });
        expect(result).toEqual([
            {
                name: 'Gloomhaven',
                yearpublished: '2017',
                image: 'https://cf.geekdo-images.com/original/img/lDN358RgcYvQfYYN6Oy2TXpifyM=/0x0/pic2437871.jpg',
                thumbnail:
                    'https://cf.geekdo-images.com/thumb/img/e7GyV3RNhtAzfqI29ONIFJLu7sM=/fit-in/200x150/pic2437871.jpg',
                numplays: '5',
            },
        ]);
    });

    it('should handle empty collection response', async () => {
        const mockXmlResponse = `<?xml version="1.0" encoding="utf-8"?>
            <items totalitems="0" termsofuse="https://boardgamegeek.com/xmlapi/termsofuse" pubdate="Thu, 01 Jan 1970 00:00:00 +0000">
            </items>`;

        const mockCollectionObject = {
            _declaration: {
                _attributes: {
                    version: '1.0',
                    encoding: 'utf-8',
                    standalone: 'yes',
                },
            },
            items: {
                _attributes: {
                    totalitems: '0',
                    termsofuse: 'https://boardgamegeek.com/xmlapi/termsofuse',
                    pubdate: 'Thu, 01 Jan 1970 00:00:00 +0000',
                },
                item: [],
            },
        };

        const mockResponse = {
            text: jest.fn().mockResolvedValue(mockXmlResponse),
        };

        (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
        mockXml2js.mockReturnValue(mockCollectionObject as any);

        const result = await getCollection();

        expect(result).toEqual([]);
    });

    it('should handle fetch errors', async () => {
        (global.fetch as jest.Mock).mockRejectedValue(
            new Error('Network error')
        );

        await expect(getCollection()).rejects.toThrow('Network error');
    });

    it('should handle XML parsing errors', async () => {
        const mockResponse = {
            text: jest.fn().mockResolvedValue('invalid xml'),
        };

        (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
        mockXml2js.mockImplementation(() => {
            throw new Error('XML parsing error');
        });

        await expect(getCollection()).rejects.toThrow('XML parsing error');
    });
});

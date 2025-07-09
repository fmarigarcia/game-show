import { sanitizeCollectionData } from '../sanitizeCollectionData';
import { Collection } from '../../../types/collection';
import { Game } from '../../../types/game';

describe('sanitizeCollectionData', () => {
    it('should return empty array when collection has no items', () => {
        const collection: Collection = {
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

        const result = sanitizeCollectionData(collection);
        expect(result).toEqual([]);
    });

    it('should return empty array when collection items is undefined', () => {
        const collection: Partial<Collection> = {
            _declaration: {
                _attributes: {
                    version: '1.0',
                    encoding: 'utf-8',
                    standalone: 'yes',
                },
            },
        };

        const result = sanitizeCollectionData(collection as Collection);
        expect(result).toEqual([]);
    });

    it('should convert collection items to games array', () => {
        const collection: Collection = {
            _declaration: {
                _attributes: {
                    version: '1.0',
                    encoding: 'utf-8',
                    standalone: 'yes',
                },
            },
            items: {
                _attributes: {
                    totalitems: '2',
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
                    {
                        _attributes: {
                            objecttype: 'thing' as any,
                            objectid: '161936',
                            subtype: 'boardgame' as any,
                            collid: '67890',
                        },
                        name: {
                            _attributes: {
                                sortindex: '1',
                            },
                            _text: 'Pandemic Legacy: Season 1',
                        },
                        yearpublished: {
                            _text: '2015',
                        },
                        image: {
                            _text: 'https://cf.geekdo-images.com/original/img/ZV0beTrNcFQI8qZe7Kn4WlUL5m8=/0x0/pic2452831.jpg',
                        },
                        thumbnail: {
                            _text: 'https://cf.geekdo-images.com/thumb/img/o2w_VH-_PNPH2dn9vCX7LKOqpgk=/fit-in/200x150/pic2452831.jpg',
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
                            _text: '12',
                        },
                    },
                ],
            },
        };

        const expectedGames: Game[] = [
            {
                name: 'Gloomhaven',
                yearpublished: '2017',
                image: 'https://cf.geekdo-images.com/original/img/lDN358RgcYvQfYYN6Oy2TXpifyM=/0x0/pic2437871.jpg',
                thumbnail:
                    'https://cf.geekdo-images.com/thumb/img/e7GyV3RNhtAzfqI29ONIFJLu7sM=/fit-in/200x150/pic2437871.jpg',
                numplays: '5',
            },
            {
                name: 'Pandemic Legacy: Season 1',
                yearpublished: '2015',
                image: 'https://cf.geekdo-images.com/original/img/ZV0beTrNcFQI8qZe7Kn4WlUL5m8=/0x0/pic2452831.jpg',
                thumbnail:
                    'https://cf.geekdo-images.com/thumb/img/o2w_VH-_PNPH2dn9vCX7LKOqpgk=/fit-in/200x150/pic2452831.jpg',
                numplays: '12',
            },
        ];

        const result = sanitizeCollectionData(collection);
        expect(result).toEqual(expectedGames);
    });

    it('should handle single item in collection', () => {
        const collection: Collection = {
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
                            objectid: '224517',
                            subtype: 'boardgame' as any,
                            collid: '98765',
                        },
                        name: {
                            _attributes: {
                                sortindex: '1',
                            },
                            _text: 'Brass: Birmingham',
                        },
                        yearpublished: {
                            _text: '2018',
                        },
                        image: {
                            _text: 'https://cf.geekdo-images.com/original/img/x3zxjr-Vw5iU4yDPg70Jgz0uhxU=/0x0/pic3490053.jpg',
                        },
                        thumbnail: {
                            _text: 'https://cf.geekdo-images.com/thumb/img/sWs11p7ERQ2I8W5bn_Jz5SzYM_M=/fit-in/200x150/pic3490053.jpg',
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
                            _text: '3',
                        },
                    },
                ],
            },
        };

        const expectedGame: Game[] = [
            {
                name: 'Brass: Birmingham',
                yearpublished: '2018',
                image: 'https://cf.geekdo-images.com/original/img/x3zxjr-Vw5iU4yDPg70Jgz0uhxU=/0x0/pic3490053.jpg',
                thumbnail:
                    'https://cf.geekdo-images.com/thumb/img/sWs11p7ERQ2I8W5bn_Jz5SzYM_M=/fit-in/200x150/pic3490053.jpg',
                numplays: '3',
            },
        ];

        const result = sanitizeCollectionData(collection);
        expect(result).toEqual(expectedGame);
    });
});

import { Collection } from '../../types/collection';
import { Game } from '../../types/game';

export function sanitizeCollectionData(collection: Collection): Game[] {
    if (!collection.items?.item) {
        return [];
    }

    return collection.items.item.map((item) => ({
        name: item.name._text,
        yearpublished: item.yearpublished._text,
        image: item.image._text,
        thumbnail: item.thumbnail._text,
        numplays: item.numplays._text,
    }));
}

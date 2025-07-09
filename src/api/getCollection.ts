import { xml2js } from 'xml-js';
import { Collection } from '@/Types/collection';
import { Game } from '@/Types/game';
import { getBggApiUrl, sanitizeCollectionData } from './helpers';

export const getCollection = async (): Promise<Game[]> => {
    const res = await fetch(getBggApiUrl('collection?username=xnelo&own=1'));
    const xml = await res.text();
    const objects = xml2js(xml, { compact: true }) as Collection;
    return sanitizeCollectionData(objects);
};

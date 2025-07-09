export interface Collection {
    _declaration: Declaration;
    items: Items;
}

export interface Declaration {
    _attributes: DeclarationAttributes;
}

export interface DeclarationAttributes {
    version: string;
    encoding: string;
    standalone: string;
}

export interface Items {
    _attributes: ItemsAttributes;
    item: Item[];
}

export interface ItemsAttributes {
    totalitems: string;
    termsofuse: string;
    pubdate: string;
}

export interface Item {
    _attributes: ItemAttributes;
    name: Name;
    yearpublished: Image;
    image: Image;
    thumbnail: Image;
    status: Status;
    numplays: Image;
}

export interface ItemAttributes {
    objecttype: Objecttype;
    objectid: string;
    subtype: Subtype;
    collid: string;
}

export enum Objecttype {
    Thing = 'thing',
}

export enum Subtype {
    Boardgame = 'boardgame',
}

export interface Image {
    _text: string;
}

export interface Name {
    _attributes: NameAttributes;
    _text: string;
}

export interface NameAttributes {
    sortindex: string;
}

export interface Status {
    _attributes: StatusAttributes;
}

export interface StatusAttributes {
    own: string;
    prevowned: string;
    fortrade: string;
    want: string;
    wanttoplay: string;
    wanttobuy: string;
    wishlist: string;
    preordered: string;
    lastmodified: Date;
    wishlistpriority?: string;
}

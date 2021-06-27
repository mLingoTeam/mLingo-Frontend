import { UserID } from '../types_user';

export type CollectionID = string;

export type CardType = {
    term: string;
    definition: string;
    collectionId?: CollectionID;
}

export type CollectionType = {
    id: string,
    baseLanguage: string | null,
    secondLanguage: string | null,
    playCount: number,
    rating: number,
    description: string | null,
    name: string,
    ownerId: UserID
}
export interface Room {
        name: string;
        photoURL: string;
        description: string;
        furnitures: Furniture[];
        id: string;
}

export interface Furniture {
        furnitureName: string;
        space: Space[];
}

export interface Space {
        name: string;
        spaceId: string;
}
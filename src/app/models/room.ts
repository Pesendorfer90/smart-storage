export interface Room {
        name: string;
        photoURL: string;
        description: string;
        furnitures: Space[];
        id: string;
}

export interface Space {
        furnitureName: string;
        space: string[];
}
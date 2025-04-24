export interface Room {
        name: string;
        photoURL: string;
        description: string;    
        furnitures: Space[];
}

export interface Space {
    name: string;
    space: string[];
  }
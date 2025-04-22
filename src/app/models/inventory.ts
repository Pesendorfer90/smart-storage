export interface Inventory {
    name: string;
    photoURL: string;
    labels: string[];
    description: string;
    storage: StorageLocation;
}

export interface StorageLocation {
    room: string;
    furniture: string;
    space: string;
    position: string;
  }
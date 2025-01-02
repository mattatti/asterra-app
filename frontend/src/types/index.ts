export interface WeaponParts {
  sight: string;
  laserPointer: string;
  gripHandle: string;
  barrelAttachment: string;
}

export interface CustomizedWeapon {
  id?: string;
  baseWeapon: string;
  parts: WeaponParts;
  sentToPrinter: boolean;
  createdAt?: string;
}

export interface WeaponPart {
  name: string;
  compatibleWith: string[];
}

export interface WeaponPartsData {
  weapons: string[];
  parts: {
    sights: WeaponPart[];
    laserPointers: WeaponPart[];
    gripHandles: WeaponPart[];
    barrelAttachments: WeaponPart[];
  };
}

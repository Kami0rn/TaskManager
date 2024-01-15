import { CardInterface } from "../interfaces/Icard" ;

export interface ListInterface {    
    ID: number;
    ListName?: string;
    ListDescription?: string;
    Process?: number;
    ListCrateDate?: string | Date;
    Cards?: CardInterface[]; // Add this line to include the Cards property
}
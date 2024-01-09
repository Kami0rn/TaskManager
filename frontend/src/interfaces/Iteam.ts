import { TeamStatusInterface } from "./Iteamstatus";

export interface TeamInterface {    
    ID?: number;
    TeamName?: string;
    TeamCreateDate?: Date | null; 
    TeamStatusID?: number;
    TeamStatus?: TeamStatusInterface;
}
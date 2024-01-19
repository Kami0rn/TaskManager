import { TeamStatusInterface } from "./Iteamstatus";

export interface TeamInterface {    
    ID?: number;
    TeamName?: string;
    TeamCreateDate?: Date | null; 
    NumberOfTeammate?: number
    TeamStatusID?: number;
    TeamStatus?: TeamStatusInterface;
}
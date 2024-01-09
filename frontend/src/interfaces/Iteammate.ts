import { RoleInterface } from "./Irole";
import { TeamInterface } from "./Iteam";
import { UserInterface } from "./Iuser";

export interface TeammateInterface {    
    ID?: number;
    
    UserID?: number;
    User?: UserInterface;

    TeamID?: number;
    Team?: TeamInterface;

    RoleID?: number;
    Role?: RoleInterface;
}
import { WorkspaceStatusInterface } from './Iworkspacestatus'; 
import {TeamInterface} from './Iteam'

export interface WorkspaceInterface {
    ID?: number;
    WorkspaceName: string;
    Description: string;
    Image?: string;
    WorkspaceCreatedDate?: string;
    NumberOfProject?: number; 
    TeamID?: number;
    Team?: TeamInterface;
    WorkspaceStatusID?: number;
    WorkspaceStatus?: WorkspaceStatusInterface;
}
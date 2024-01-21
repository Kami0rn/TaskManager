export interface ProjectInterface {
    ID?: number
    ProjectName?: string;
    ProjectCreatedDate?: Date;
    WorkspaceID?: number;
    ProjectSettingID?: number;
    ProjectStatusID?: number;
    DeletedAt? : Date;
    ProjectDetail?: string;
}
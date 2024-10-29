
export type ToastrMessagePayload = {
    type: 'success' | 'warn' | 'error' | 'info';
    message: string;
  };
  
  export type User = {
    get: () => {
      token: string;
      language: 'en' | 'ne';
      role: string;
    };
    token: string;
    role: string;
    language: string;
    username: string;
    id: string;
  };
  
  export type Documents = {
    get: () => {
      user_manual_files: any;
      guideline_files: any;
    };
    user_manual_files: any;
    guideline_files: any;
  };
  
  export type GenericRecord = {
    get: () => any;
  };
  
  export type GenericSchema = {
    allIds: () => Array<string>;
    get: (id: string) => any;
  };
  
  export type StoreState = {
    user: User;
    profile: User;
    usersList: GenericSchema;
    miscInfo: GenericRecord;
    dashboard: GenericRecord;
    projectInformation: GenericRecord;
    projectViewInformation: GenericRecord;
    projectList: GenericSchema;
    programList: GenericSchema;
    sectorsList: GenericSchema;
    trashProjectList: GenericSchema;
    documents: Documents;
    projectStats: GenericRecord;
    projectPriority: GenericRecord;
    homepage: GenericRecord;
    municipalitiesList: GenericSchema;
    completedProjectList: GenericSchema;
    wardsList: GenericSchema;
    toastr: GenericSchema;
    basicGrantList: GenericSchema;
    fullGrantList: GenericSchema;
    userProjectList: GenericSchema;
    remarksList: GenericSchema;
  };
  
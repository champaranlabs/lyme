export interface ApiResponse{
    status:boolean,
    message:string,
    entity?:unknown,
    errorType?:string
  }
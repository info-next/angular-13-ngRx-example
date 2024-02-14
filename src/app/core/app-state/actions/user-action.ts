
export const USER_LIST_REQUEST = 'user list request';
export const USER_LIST_SUCCESS = 'user list success';
export const USER_LIST_FAILED = 'user list failed';
export const USER_DELETE = 'user delete';
export const USER_UPDATE = 'user update';



export class UserListRequestAction{
    readonly type = USER_LIST_REQUEST
   
}

export class UserDeleteAction{
    readonly type = USER_DELETE
   constructor(public payload?: {id:string}){
       
   }
}


export class UserUpdateAction{
    readonly type = USER_UPDATE
   constructor(public payload?: {data:any}){
       
   }
}

export class UserListSuccessAction{
    readonly type = USER_LIST_SUCCESS
   

    constructor(public payload?:{data:any[]  }){

    }
}


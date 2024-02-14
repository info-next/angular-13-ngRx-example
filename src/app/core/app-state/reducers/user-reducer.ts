
import { Action } from "../actions";
import { USER_DELETE, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_UPDATE } from "../actions/user-action";


export interface UserReducerState{
    loading: boolean;
    loaded: boolean;
    users: any[];
}

const initialState: UserReducerState = {
loaded: false,
loading: false,
users: []
};

export function UserReducer(state = initialState, action:Action):UserReducerState{
    switch(action.type){
        case USER_LIST_REQUEST:{
            return {...state,loading:true};
        }
        case USER_DELETE:{
            const users = state.users.filter(data=> data.id !== action.payload.id);
            return{...state, ...{users}};
        }
        case USER_UPDATE:{
            const users = state.users.filter(data=> data.id !== action.payload.id);
            const updatedUser = users.concat(action.payload.data);
            return{...state, ...{users: updatedUser}};
        }
        case USER_LIST_SUCCESS:{
            const updatedUsers = state.users.concat(action.payload.data);
            return{...state, loading:false, loaded: true,users:updatedUsers};
        }
        default : {
            return state;
        }
    }
}

//selectors

export const getLoading = (state: UserReducerState) => state.loading;
export const getLoaded = (state: UserReducerState) => state.loaded;
export const getUsers = (state: UserReducerState) => state.users;
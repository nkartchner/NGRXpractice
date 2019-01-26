import { User } from '../user';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserActions, UserActionTypes } from './user.actions';


///////////////////////////////////// WE DO NOT NEED TO IMPORT THE APP.STATE BECAUSE THIS IS NOT A LAZY LOADED OBJECT /////////////////////////////////////


///////////////////////////////////// STATE FOR THIS FEATURE (USER) /////////////////////////////////////
export interface UserState {
    maskUserName: boolean;
    currentUserId: number
    currentUser: User;
}

const initialState: UserState = {
    maskUserName: false,
    currentUserId: 1,
    currentUser: null
};


///////////////////////////////////// SELECTOR FUNCTIONS /////////////////////////////////////
//The string 'users' is linked the the users string the MAIN State interface that extends fromRoot.State on line 4!
const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getCurrentUserId = createSelector(
    getUserFeatureState,
    state => state.currentUserId
);

////////////////////////// this function is unfinished because I know nothing about how to grab a specific thing from the database yet //////////////////////////
export const getCurrentUserById = createSelector(
    getUserFeatureState,
    (state, currentUserId) => state.currentUser
);

export const getMaskUserName = createSelector(
    getUserFeatureState,
    state => state.maskUserName
);

export const getCurrentUder = createSelector(
    getUserFeatureState,
    state => state.currentUser
);


export function reducer(state = initialState, action: UserActions): UserState {
    switch (action.type) {
        case UserActionTypes.MaskUserName:
            return {
                ...state,
                maskUserName: action.payload
            };

        default:
            return state;
    }
}
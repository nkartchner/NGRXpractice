import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as userState from './user.reducer';


///////////////////////////////////// SELECTOR FUNCTIONS /////////////////////////////////////
// The string 'users' is linked the the users string the MAIN State interface that extends fromRoot.State on line 4!
const getUserFeatureState = createFeatureSelector<userState.UserState>('users');

////////////// this function is unfinished because I know nothing about how to grab a specific thing from the database yet ///////////////
export const getCurrentUser = createSelector(
    getUserFeatureState,
    state => state.currentUser
);

export const getMaskUserName = createSelector(
    getUserFeatureState,
    state => state.maskUserName
);

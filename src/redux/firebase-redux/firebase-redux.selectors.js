import { createSelector } from "reselect";
const selectFirebase = state => state.firebase

export const selectFirebaseNetwork = createSelector(
    [selectFirebase],
    (firebase) => firebase.firebaseNetworkStatus
)
export const selectFirebaseNetwork2 = createSelector(
    [selectFirebase],
    (firebase) => firebase.firebaseNetworkStatus
)


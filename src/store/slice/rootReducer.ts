import loginReducer from './loginSlice';
import menuReducer from './menuSlice';
import snackbarReducer from './snackbarSlice';
import masterReducer from './masterSlice';
import projectReducer from './projectSlice';
import confirmReducer from './confirmSlice';
import syncReducer from './syncSlice';
import commentReducer from './commentSlice';

const rootReducer = {
    login: loginReducer,
    menu: menuReducer,
    snackbar: snackbarReducer,
    master: masterReducer,
    project: projectReducer,
    confirm: confirmReducer,
    sync: syncReducer,
    comment: commentReducer
};

export default rootReducer;

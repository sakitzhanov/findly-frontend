const SET_SUCCESS_CREATE = "SET_SUCCESS_CREATE";
const SET_UNSUCCESS_CREATE = "SET_UNSUCCESS_CREATE";
const SET_SUCCESS_DELETE = "SET_SUCCESS_DELETE";
const SET_UNSUCCESS_DELETE = "SET_UNSUCCESS_DELETE";
const SET_SUCCESS_UPDATE = "SET_SUCCESS_UPDATE";
const SET_UNSUCCESS_UPDATE = "SET_UNSUCCESS_UPDATE";

export const setSuccessCreate = (val) => ({
    type: SET_SUCCESS_CREATE,
    successCreate: val
});

export const setUnsuccessCreate = (val) => ({
    type: SET_UNSUCCESS_CREATE,
    unsuccessCreate: val
});

export const setSuccessDelete = (val) => ({
    type: SET_SUCCESS_DELETE,
    successDelete: val
});

export const setUnsuccessDelete = (val) => ({
    type: SET_UNSUCCESS_DELETE,
    unsuccessDelete: val
});

export const setSuccessUpdate = (val) => ({
    type: SET_SUCCESS_UPDATE,
    successUpdate: val
});

export const setUnsuccessUpdate = (val) => ({
    type: SET_UNSUCCESS_UPDATE,
    unsuccessUpdate: val
});

const initialState = {
    successCreate: false,
    unsuccessCreate: false,
    successDelete: false,
    unsuccessDelete: false,
    successUpdate: false,
    unsuccessUpdate: false
};

const regionListReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SUCCESS_CREATE:
            return {
                ...state,
                successCreate: action.successCreate
            }
        case SET_UNSUCCESS_CREATE:
            return {
                ...state,
                unsuccessCreate: action.unsuccessCreate
            }
        case SET_SUCCESS_DELETE:
            return {
                ...state,
                successDelete: action.successDelete
            }
        case SET_UNSUCCESS_DELETE:
            return {
                ...state,
                unsuccessDelete: action.unsuccessDelete
            }
        case SET_SUCCESS_UPDATE:
            return {
                ...state,
                successUpdate: action.successUpdate
            }
        case SET_UNSUCCESS_UPDATE:
            return {
                ...state,
                unsuccessUpdate: action.unsuccessUpdate
            }
        default:
            return state;
    }
};

export default regionListReducer;
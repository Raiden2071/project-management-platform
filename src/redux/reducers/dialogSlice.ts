import { createSlice } from "@reduxjs/toolkit";

interface DialogState {
    TaskDialog: {
        open: boolean;
    };
    projectFormDialog: {
        open: boolean;
    };

}

const DIALOGS_SLICE_NAME = 'dialogs';

const initialState: DialogState = {
    TaskDialog: {
        open: false,
    },
    projectFormDialog: {
        open: false,
    },
  };
  

export const dialogsSlice = createSlice({
    name: DIALOGS_SLICE_NAME,
    initialState,
    reducers: {
        openTaskDialog: (state) => {
            state.TaskDialog.open = true;
        },
        closeTaskDialog: (state) => {
            state.TaskDialog.open = false;
        },
        openProjectFormDialog: (state) => {
            state.projectFormDialog.open = true;
        },
        closeProjectFormDialog: (state) => {
            state.projectFormDialog.open = false;
        },
    },
});

export const {
    openTaskDialog,
    closeTaskDialog,
    openProjectFormDialog,
    closeProjectFormDialog,
} = dialogsSlice.actions;

export default dialogsSlice.reducer;

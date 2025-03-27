import { createSlice } from "@reduxjs/toolkit";

interface DialogState {
    tasksDialog: {
        open: boolean;
    };
    projectsDialog: {
        open: boolean;
    };
}

const DIALOGS_SLICE_NAME = 'dialogs';

const initialState: DialogState = {
    tasksDialog: {
        open: false,
    },
    projectsDialog: {
        open: false,
    },
  };
  

export const dialogsSlice = createSlice({
    name: DIALOGS_SLICE_NAME,
    initialState,
    reducers: {
        openTaskDialog: (state) => {
            state.tasksDialog.open = true;
        },
        closeTaskDialog: (state) => {
            state.tasksDialog.open = false;
        },
        openProjectDialog: (state) => {
            state.projectsDialog.open = true;
        },
        closeProjectDialog: (state) => {
            state.projectsDialog.open = false;
        },
    },
});

export const {
    openTaskDialog,
    closeTaskDialog,
    openProjectDialog,
    closeProjectDialog,
} = dialogsSlice.actions;

export default dialogsSlice.reducer;

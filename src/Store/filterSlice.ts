import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
    filters: Record<string, string>;
}

const initialState: FilterState = {
    filters: {},
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        updateFilter: (state, action: PayloadAction<{ key: string; value: string }>) => {
            const { key, value } = action.payload;
            state.filters[key] = value;
        },
        removeFilter: (state, action: PayloadAction<string>) => {
            const key = action.payload;
            delete state.filters[key];
        },
    },
});

export const { updateFilter, removeFilter } = filterSlice.actions;
export default filterSlice.reducer;
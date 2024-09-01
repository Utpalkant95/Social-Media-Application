//  make state of handle address and products jese abhi checkout wale me kra tha 
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CheckoutState {
    address: any;
    products: any;
}

const initialState: CheckoutState = {
    address: {},
    products: [],
};

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        setAddress: (state, action: PayloadAction<any>) => {
            state.address = action.payload;
        },
        setProducts: (state, action: PayloadAction<any>) => {
            state.products = action.payload;
        },
    },
});

export const { setAddress, setProducts } = checkoutSlice.actions;
export default checkoutSlice.reducer;
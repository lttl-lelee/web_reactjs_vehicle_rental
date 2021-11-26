
import { createSlice } from '@reduxjs/toolkit';


const bookingSlice = createSlice({
    name: 'booking',
    initialState: { status: true, data: {}, error: [] },
    reducers: {
        addPromotion: (state, action) => {
            // @ts-ignore
            state.data.promotion = action.payload;
        },
        removePromotion: (state) => {
            // @ts-ignore
            state.data.promotion = null;
        },
    },
})
const { reducer, actions } = bookingSlice;
export const { addPromotion,removePromotion} = actions;
export default reducer;
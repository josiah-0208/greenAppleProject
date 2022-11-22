import { configureStore, createSlice } from "@reduxjs/toolkit";


let loginState = createSlice({
    name: "loginState",
    initialState: "false",
    reducers: {
        changeLoginState(state, action) {
            state = action.payload
            return state;
        }
    }
})

export let { changeLoginState } = loginState.actions;


let updateReviewText = createSlice({
    name: "updateReviewText",
    initialState: "",
    reducers: {
        changeUpdateReviewText(state, action) {
            state = action.payload;
            return state;
        }
    }
})

export let { changeUpdateReviewText } = updateReviewText.actions;


let updateReviewId = createSlice({
    name: "updateReviewId",
    initialState: "",
    reducers: {
        changeReviewId(state, action) {
            state = action.payload;
            return state;
        }
    }
})

export let { changeReviewId } = updateReviewId.actions;

let cartFixList = createSlice({
    name: "cartFixList",
    initialState: [],
    reducers: {
        changeCartFixListPush(state, action) {
            state.push(action.payload)
            return state;
        },
        changeCartFixListPop(state) {
            state.pop();
            return state;
        }
    }
})

export let { changeCartFixListPush, changeCartFixListPop } = cartFixList.actions;

let cartTotalPrice = createSlice({
    name: "cartTotalPrice",
    initialState: 0,
    reducers: {
        changeCartTotalPricePlus(state, action) {
            state = state + action.payload
            return state;
        },
        changeCartTotalPriceMinus(state, action) {
            state = state - action.payload
            return state;
        },
        changeCartTotalPriceZero(state) {
            state = 0;
            return state;
        }
    }
})

export let { changeCartTotalPricePlus, changeCartTotalPriceMinus,
    changeCartTotalPriceZero } = cartTotalPrice.actions;

let keyword = createSlice({
    name: "keyword",
    initialState: "",
    reducers: {
        changeKeyword(state, action) {
            state = action.payload;
            return state;
        }
    }
})

export let { changeKeyword } = keyword.actions;

let updateWatched = createSlice({
    name: "updateWatched",
    initialState: 0,
    reducers: {
        changeUpdateWatched(state, action) {
            state = action.payload;
            return state;
        }
    }
})

export let { changeUpdateWatched } = updateWatched.actions;

let headerOnClickState = createSlice({
    name: "headerOnClickState",
    initialState: true,
    reducers: {
        changeHeaderOnClickState(state, action) {
            state = action.payload;
            return state;
        }
    }
})

export let { changeHeaderOnClickState } = headerOnClickState.actions;

let watchedState = createSlice({
    name: "watchedState",
    initialState: true,
    reducers: {
        changeWatchedState(state, action) {
            state = action.payload;
            return state;
        }
    }
})

export let { changeWatchedState } = watchedState.actions;

let reviewListState = createSlice({
    name: "reviewListState",
    initialState: true,
    reducers: {
        changeReviewListState(state, action) {
            state = action.payload;
            return state;
        }
    }
})

export let { changeReviewListState } = reviewListState.actions;

let orderFormTotalPrice = createSlice({
    name: "orderFormTotalPrice",
    initialState: 0,
    reducers: {
        changeOrderFormTotalPriceReset(state) {
            state = 0;
            return state;
        },
        changeOrderFormTotalPricePlus(state, action) {
            state = state + action.payload;
            return state;
        }
    }
})

export let { changeOrderFormTotalPriceReset, changeOrderFormTotalPricePlus } = orderFormTotalPrice.actions;

let cartTotalReduxState = createSlice({
    name: "cartTotalReduxState",
    initialState: 0,
    reducers: {
        changeCartTotalReduxStatePlus(state, action) {
            state = state + action.payload;
            return state;
        },
        changeCartTotalReduxStateMinus(state, action) {
            state = state - action.payload;
            return state;
        },
        changeCartTotalReduxStateReset(state) {
            state = 0;
            return state;
        },
    }
})

export let { changeCartTotalReduxStatePlus, changeCartTotalReduxStateReset
    , changeCartTotalReduxStateMinus } = cartTotalReduxState.actions;

let loginModalState = createSlice({
    name: "loginModalState",
    initialState: false,
    reducers: {
        changeLoginModalState(state, action) {
            state = action.payload;
            return state;
        }
    }
})

export let { changeLoginModalState } = loginModalState.actions;

export default configureStore({
    reducer: {
        loginState: loginState.reducer,
        updateReviewText: updateReviewText.reducer,
        updateReviewId: updateReviewId.reducer,
        cartFixList: cartFixList.reducer,
        cartTotalPrice: cartTotalPrice.reducer,
        keyword: keyword.reducer,
        updateWatched: updateWatched.reducer,
        headerOnClickState: headerOnClickState.reducer,
        watchedState: watchedState.reducer,
        reviewListState: reviewListState.reducer,
        orderFormTotalPrice: orderFormTotalPrice.reducer,
        cartTotalReduxState: cartTotalReduxState.reducer,
        loginModalState: loginModalState.reducer,
    }
})
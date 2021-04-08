import * as types from './mutations_types.js'

export default {
    [types.SET_SEARCH_TYPE](state,data){
        state.nowType = data
    },
    [types.SET_PATENT](state,data){
        state.patentQuery = data
    },
    [types.SET_TRADEMARK](state,data){
        state.markQuery = data
    }
}
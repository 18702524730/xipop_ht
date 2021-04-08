export default {
    set_search_type({commit},data){
        commit('SET_SEARCH_TYPE',data)
    },
    set_patent({commit},data){
        commit('SET_PATENT',data)
    },
    set_trademark({commit},data){
        commit('SET_TRADEMARK',data)
    }
}
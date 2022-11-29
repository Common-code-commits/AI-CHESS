const state = {
    israndom: false,
    istip: false,
    isshowindex: false,
    depth: 0,
    mode: 0
}

const mutations = {
    SET_RANDOM: (state, israndom) => {
        state.israndom = israndom
    },
    SRT_TIP: (state, istip) => {
        state.istip = istip
    },
    SET_SHOWINDEX: (state, isshowindex) => {
        state.isshowindex = isshowindex
    },
    SET_DEPTH: (state, depth) => {
        state.depth = depth
    },
    SET_MODE: (state, mode) => {
        state.mode = mode
    }
}

const actions = {
    setDepth({commit}, data) {
        const {depth} = data
        commit('SET_DEPTH', depth)
    },
    setMode({commit}, data) {
        const {mode} = data
        commit('SET_MODE', mode)
    },
    setRandom({commit}, data) {
        const {israndom} = data
        commit('SET_RANDOM', israndom)
    },
    setShowTips({commit}, data) {
        const {istip} = data
        commit('SRT_TIP', istip)
    },
    setShowIndex({commit}, data) {
        const {isshowindex} = data
        commit('SET_SHOWINDEX', isshowindex)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

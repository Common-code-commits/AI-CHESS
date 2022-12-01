const state = {
    israndom: false,
    istip: false,
    isshowindex: false,
    depth: 0,
    mode: 0,
    color: 0,
    order: 0,
    pause: true,
    clear: false,
    epoch: 0,
    isconnet: false,
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
    },
    SET_COLOR: (state, color) => {
        state.color = color
    },
    SET_ORDER: (state, order) => {
        state.order = order
    },
    SET_PAUSE: (state, pause) => {
        state.pause = pause
    },
    SET_CLEAR: (state, clear) => {
        state.clear = clear
    },
    SET_EPOCH: (state, epoch) => {
        state.epoch = epoch
    },
    SET_ISCONNECT: (state, isconnet) => {
        state.isconnet = isconnet
    }
}

const actions = {
    setDepth({commit}, data) {
        commit('SET_DEPTH', data)
    },
    setMode({commit}, data) {
        commit('SET_MODE', data)
    },
    setRandom({commit}, data) {
        commit('SET_RANDOM', data)
    },
    setShowTips({commit}, data) {
        commit('SRT_TIP', data)
    },
    setShowIndex({commit}, data) {
        commit('SET_SHOWINDEX', data)
    },
    setColor({commit}, data) {
        commit('SET_COLOR', data)
    },
    setOrder({commit}, data) {
        commit('SET_ORDER', data)
    },
    setPause({commit}, data) {
        commit('SET_PAUSE', data)
    },
    setClear({commit}, data) {
        commit('SET_CLEAR', data)
    },
    setEpoch({commit}, data) {
        commit('SET_EPOCH', data)
    },
    setIsConnect({commit}, data) {
        commit('SET_ISCONNECT', data)
    }

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

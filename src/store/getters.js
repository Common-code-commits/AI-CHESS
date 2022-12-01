const getters = {
    depth: state => state.user.depth,
    mode: state => state.user.mode,
    israndom: state => state.user.israndom,
    istip: state => state.user.istip,
    isshowindex: state => state.user.isshowindex,
    color: state => state.user.color,
    order: state => state.user.order,
    pause: state => state.user.pause,
    clear: state => state.user.clear,
    epoch: state => state.user.epoch,
    isconnet: state => state.user.isconnet,
}
export default getters

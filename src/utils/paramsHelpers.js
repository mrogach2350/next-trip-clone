export const encodeParams = (state = {}) => ({
    p: state.currentProvider,
    r: state.currentRoute,
    d: state.currentDirection,
  })

export const decodeParams = (params = {}) => ({
    currentProvider: params.p || '',
    currentRoute: params.r || '',
    currentDirection: params.d || '',
  })
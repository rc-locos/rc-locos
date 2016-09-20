
export const setState = (state) => {
  return {
    type: 'SET_STATE',
    state
  }
}

export const submitAddr = (addr) =>{
  return {
    type: 'SUBMIT_ADDR',
    addr
  }
}

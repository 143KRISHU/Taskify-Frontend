import {createSlice} from '@reduxjs/toolkit'

const initialState = {
      user : null
}

export const userSlice =  createSlice({
      name:'user',
      initialState,
      reducers:{
            setUserDetail:(state,action)=>{
                  state.user = action.payload
            }
      }
})

export const {setUserDetail}= userSlice.actions

export default userSlice.reducer
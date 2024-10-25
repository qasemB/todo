import { UserInfoTyp } from '@/types/user'
import { create } from 'zustand'


type State = {
    userInfo: UserInfoTyp | null
}

type Action = {
    setUsrInfo: (userInfo: State['userInfo']) => void
}

// Create your store, which includes both state and (optionally) actions
export const useUserInfoStore = create<State & Action>((set) => ({
    userInfo: null,
    setUsrInfo: (userInfo) => set({ userInfo }),
}))
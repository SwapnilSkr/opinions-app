import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface UserState {
  mobileNumber: string
  otpCode: string
  inviteCode: string
  isAuthenticated: boolean
  
  // Actions
  setMobileNumber: (mobileNumber: string) => void
  setOtpCode: (otpCode: string) => void
  setInviteCode: (inviteCode: string) => void
  setAuthenticated: (isAuthenticated: boolean) => void
  resetAuthState: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      mobileNumber: '',
      otpCode: '',
      inviteCode: '',
      isAuthenticated: false,
      
      setMobileNumber: (mobileNumber) => set({ mobileNumber }),
      setOtpCode: (otpCode) => set({ otpCode }),
      setInviteCode: (inviteCode) => set({ inviteCode }),
      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      resetAuthState: () => set({ 
        mobileNumber: '', 
        otpCode: '', 
        inviteCode: '', 
        isAuthenticated: false 
      }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
) 
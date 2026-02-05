import {create} from 'zustand';

const useUserStore = create((set) => (
    {
        user: {},
        setUser: (userData) => (set({user: userData}))
    }
));

export default useUserStore;
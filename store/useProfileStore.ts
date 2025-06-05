import { defineStore } from "pinia";
import api from '~/server/utils/axios/api'

const useProfileStore = defineStore('Profile',{
    state:() =>({
        _id: undefined,
        name: undefined,
        user: undefined,
        imageProfile: undefined

    }),
    getters:{
        isLoggedIn: (state) => !!state.user
    },
    actions:{
        async fetchProfile(){
            try {
                const response = await api.get('/auth/secure',{
                    withCredentials: true
                });
                const data = await response.data.decoded;

                this._id = data._id,
                this.name = data.name,
                this.user = data.user,
                this.imageProfile = data.imageProfile
            } catch (error) {
                console.error(error)
            }
        }
    }

});

export default useProfileStore;
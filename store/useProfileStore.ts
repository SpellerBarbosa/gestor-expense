import { defineStore } from "pinia";
import type { IProfile } from "~/server/utils/interfaces/interfaces";

const useProfileStore = defineStore('Profile',{
    state:():IProfile =>({
        _id: undefined,
        name: undefined,
        user: undefined,

    }),
    getters:{},
    actions:{
        async useFetchProfile(){
            try {
                const data: IProfile = await $fetch('/api/auth/profile');
                
                this._id = data._id
                this.name = data.name
                this.user = data.user
            } catch (error) {
                console.error(error)
            }

        }
    }

});

export default useProfileStore;
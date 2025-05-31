import useProfileStore from "~/store/useProfileStore"

export default defineNuxtPlugin(async(nuxtApp)=>{
    const  profile = useProfileStore()

    try {
        await profile.fetchProfile();
    } catch (error) {
        console.error(error)
    }
})
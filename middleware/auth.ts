import api from '~/server/utils/axios/api'


export default defineNuxtRouteMiddleware(async (to, from) => {
  const {error} = await useFetch('/api/auth/secure',{
    credentials: 'include'
  })

  if(error.value){
    return navigateTo('/')
  }
});

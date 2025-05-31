import { defineStore } from "pinia";

const stateMenuStore = defineStore('Menu',{
    state: () =>({
        menu: false
    }),
    actions:{
        stateMenu(){
            this.menu = !this.menu
        }
    }
})

export default stateMenuStore;
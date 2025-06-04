 const formatCategory = (category: Ref<any>) =>{
    if(category.value === 'card'){
        return 'cartão'
    }else if(category.value === 'food' || category.value === "FOOD"){
        return 'Alimentação'
    }else if(category.value === 'home'){
        return 'casa'
    }else{
        return 'outros'
    }
}

export default formatCategory;
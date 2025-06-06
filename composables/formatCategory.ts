 const formatCategory = (payment: string) =>{
   

    if(payment === 'card'){
        return 'pago com Cartão'
    }else if(payment === 'pix'){
        return 'pago com Pix'
    }else if(payment === 'money'){
        return 'pago com Dinheiro'
    }else if(payment === "cheque"){
        return 'pago com Cheque'
    }
    else{
        return 'outros'
    }
}

export default formatCategory;
export const formatDate = (date: string) =>{
    const dateStr = date
    const [ year, month, day ] = dateStr.slice(0,10).split('-')
    return `${day}/${month}/${year}`
}

export const formateValue = (value: number) =>{
    return value.toFixed(2).replace('.', ',')
}

export const formatPayment = (payment: string) =>{
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

export const formatCategory = (category: string) =>{
    switch (category) {
        case 'food':
            return 'Alimentação'
        case 'home':
            return 'Casa'
        case 'financing-and-consortium':
            return 'Financiamentos e Consórcios'
        case 'leisure':
            return 'Lazer'
        default:
            return 'Outros'
    }
}
export default function variableAmbient(variable: string){
    const envVar = process.env[variable] || undefined

    if(!envVar){
        throw new Error(`Variável de ambiente ${variable} não foi definida.`)
    }

    return envVar;
}
import bcrypt from 'bcrypt';

export default async function hashPassword(password: string){
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt)
    return hash
}
import { useRouter } from "vue-router"

export default function useSendRedirect(){
    const router = useRouter();

    const sendRedirect = (path: string, delay: number = 3500) =>{
        if(!path || typeof path !== 'string') return ;
        
        setTimeout(() => {
            router.push(path)
        }, delay);
    }

    return { sendRedirect };
}
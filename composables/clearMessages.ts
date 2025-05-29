export default function clearMessages(message: Ref<string>){
    setTimeout(() => {
        message.value = ""
    }, 3000);
}
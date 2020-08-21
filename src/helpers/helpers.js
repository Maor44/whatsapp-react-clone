export const scrollToBottom = (ref) => {
    if(ref){
        const scrollHeight = ref.scrollHeight;
        const height = ref.clientHeight;
        const maxScrollTop = scrollHeight - height;
        ref.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
}

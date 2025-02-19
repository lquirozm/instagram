import toast from "react-hot-toast";

const useToast = () => {
    const successToast = (message: string) => toast.success(message, {
        duration: 4000,
        position: "top-center"
    })
    // const errorToast = (message: string) => toast.error(message)
    return(
        {
            successToast
        }
    )
}

export default useToast;
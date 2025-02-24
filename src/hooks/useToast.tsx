import toast from "react-hot-toast";

const useToast = () => {
    const successToast = (message: string) => toast.success(message, {
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
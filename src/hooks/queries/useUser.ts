import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/user";


const useUser = () => {
    const { data: user, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: getUser
    })

    return { user, isLoading }
}

export default useUser
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export const useAuthFetch = () => {
    const { getAccessTokenSilently } = useAuth0();

    const authFetch = async (url: string, options: any = {}) => {

        try {
            const token = await getAccessTokenSilently();

            const response = await axios({
                method: options.method || 'get',
                url,
                headers: {
                    ...options.headers,
                    'Authorization': `Bearer ${token}`,
                },
                data: options.data || {},
            });

            return response.data;
        }
        catch (error) {
            throw error;
        }
    }

    return {authFetch};
}
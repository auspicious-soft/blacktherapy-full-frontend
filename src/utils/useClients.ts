import useSWR from 'swr';
import { getClientsPageData } from '@/services/admin/admin-service';

const useTherapists = () => {
    const { data, error, isLoading } = useSWR('/admin/clients', getClientsPageData);

    const clientsData = data?.data?.data?.map((user: any) => ({
        label: `${user?.firstName} ${user?.lastName}`,
        value: user._id,
    })) || []; 

    return {
        clientsData,
        isLoading: isLoading,
        error: error,
    };
};

export default useTherapists;
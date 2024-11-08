// useTherapists.ts
import useSWR from 'swr';
import { GetTherapistsData } from '@/services/admin/admin-service';

const useTherapists = () => {
    const { data, error, isLoading } = useSWR('/admin/therapists', GetTherapistsData);

    const therapistData = data?.data?.data?.map((user: any) => ({
        label: `${user?.firstName} ${user?.lastName}`,
        value: user._id,
        state: user?.otherDetailsOfTherapist?.state
    })) || []; 

    return {
        therapistData,
        isLoading: isLoading,
        error: error,
    };
};

export default useTherapists;

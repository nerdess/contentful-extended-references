import { useEffect, useState } from 'react';
import { Entry } from '@contentful/app-sdk';
import useCMA from './useCMA';

type GetEntriesHookResult = {
    isLoading: boolean;
	entry: Entry | undefined;
};

const useGetEntryById = (
	id: string
): GetEntriesHookResult => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
	const [entry, setEntry] = useState<Entry>();
	const { environment } = useCMA();

	useEffect(() => {
		if (!environment) return;

        setIsLoading(true);

        environment.getEntry(id).then((entry) => {
            setIsLoading(false)
            setEntry(entry);
        });
        

        return () => setIsLoading(false);


	}, [id, environment]);

	return {
        isLoading,
		entry
	};
};

export default useGetEntryById;

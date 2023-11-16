import { useEffect, useState } from 'react';
import useCMA from './useCMA';
import { ContentType } from 'contentful-management';

type GetEntriesHookResult = {
    isLoading: boolean;
    isError: boolean;
	contentTypes: ContentType[];
};

const useGetContentTypesByNames = (
	names: string[]
): GetEntriesHookResult => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
	const [contentTypes, setContentTypes] = useState<any>([]);
	const { environment } = useCMA();

	useEffect(() => {
		if (!environment) return;
        if (names.length === 0) return;

        setIsLoading(true);

        environment.getContentTypes().then(({items}) => {
        
            const result = items.filter(({sys}) => {
                return names.includes(sys.id)
            });

            setIsLoading(false);
            setContentTypes(result);
        }); //todo: error handling

        return () => setIsLoading(false);

	}, [environment, names]);

	return {
        isLoading,
        isError,
		contentTypes,
	};
};

export default useGetContentTypesByNames;

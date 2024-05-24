import { useEffect, useState } from 'react';
import useCMA from './useCMA';
import { ContentType } from 'contentful-management';

type GetEntriesHookResult = {
    isLoading: boolean;
    isError: boolean;
	contentType: ContentType | undefined; 
};

const useGetContentTypeByName = (
	name: string | undefined
): GetEntriesHookResult => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError] = useState<boolean>(false);
	const [contentType, setContentType] = useState<ContentType | undefined>();
	const { environment } = useCMA();

	useEffect(() => {
		if (!environment) return;

        setIsLoading(true);

        environment.getContentTypes().then(({items}) => {
        
            const result = items.find(({sys}) => {
                return name === sys.id;
            });

            setIsLoading(false);
            setContentType(result);
        }); //todo: error handling

        return () => setIsLoading(false);

	}, [environment, name]);

	return {
        isLoading,
        isError,
		contentType,
	};
};

export default useGetContentTypeByName;

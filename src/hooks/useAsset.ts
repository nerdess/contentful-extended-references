import { Asset } from "contentful-management";
import { useEffect, useState } from "react";
import useCMA from "./useCMA";

const useAsset = ( id: string) => {

    const [asset, setAsset] = useState<Asset>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>();

    const {
		isLoading: isLoadingCMA,
		environment
	} = useCMA();

    useEffect(() => {

        if (!environment || !id) return;

        setIsLoading(true);

        environment.getAsset(id)
		.then((asset) => {
            setIsLoading(false);
            setIsError(false);
            setAsset(asset);
		})
		.catch(error => {
		    console.log('Error:', error);
            setIsLoading(false);
		    setIsError(true);
		});

    }, [id, environment])

    return {
        asset,
        isLoading: isLoadingCMA || isLoading,
        isError
    }
}

export default useAsset;

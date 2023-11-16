import { Note, Spinner } from '@contentful/f36-components';
import useAsset from '../../../hooks/useAsset';
import { useSDK } from '@contentful/react-apps-toolkit';
import { FieldAppSDK } from '@contentful/app-sdk';

const Asset = ({id}: {id:string}) => {

	const sdk = useSDK<FieldAppSDK>();
	const {
		isLoading,
		isError,
		asset
	} = useAsset(id);

	const locale = sdk.field.locale;
	const src = asset?.fields.file[locale].url;
	const alt = asset?.fields.title[locale];

	if (isLoading) {
		return <Spinner />
	}

	if (isError) {
		return (
			<Note variant="negative">Asset could not get loaded</Note>
		)
	}

	return (
		<img
			alt={alt}
			src={src}
		/>
	)

}

export default Asset;
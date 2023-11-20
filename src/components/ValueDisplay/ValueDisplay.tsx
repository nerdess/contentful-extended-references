import moment from 'moment';
import { Note, Text } from '@contentful/f36-components';
import Asset from './types/Asset';
import Reference from './types/Reference';

const truncateText = (text: string = '', maxLength: number = 50) => {
	if (text.length <= maxLength) {
	  return text;
	} else {
	  return text.slice(0, maxLength) + '...';
	}
}

const ValueDisplay = ({
	schema, 
	value
}: {
	schema: any,
	value: any
}) => {

	

	const {
		type,
		linkType,
	} = schema || {};

	/*if ((typeof(value) === 'string' && value?.replace(/<[^>]*>/g, '').length === 0) || !value) {
		return <MissingContent />
	}*/

	if (type === 'Symbol') {
		return (
			<Text>{value}</Text>
		)
	}

	if (type === 'Text') {
		const plainText = value?.replace(/<[^>]*>/g, '');
		const truncatedText = truncateText(plainText, 260);
		return (
			<Text>{truncatedText}</Text>
		)
	}

	if (type === 'Link' && linkType === 'Asset') {
		return <Asset id={value.sys.id} />
	}

	if (type === 'Link' && linkType === 'Entry') {
		return <Reference ids={[value.sys.id]} /> 
	}

    if (type === 'Array') {
        const elements = value?.map((v:any) => {
			if (typeof(v) === 'string') {
				return <Text key={v}>{v}</Text>
			}
			return <Reference key={v.sys.id} ids={[v.sys.id]} />;
		}) || null;
		return elements
	}

	if (type === 'Date') {
		const date = new Date(value);
		const formattedDate = moment(date).format('DD. MMMM YYYY');
		return <Text>{formattedDate}</Text>
	}

	return (
		<Note variant="warning">There is no view yet implemented for this content type, please ask your developer to add one 🤓</Note>
	)
}

export default ValueDisplay;
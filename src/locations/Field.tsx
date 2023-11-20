import React, { useCallback, useMemo} from 'react';
import { ContentType, FieldAppSDK } from '@contentful/app-sdk';
import { useSDK } from '@contentful/react-apps-toolkit';
import { MultipleEntryReferenceEditor } from '@contentful/field-editor-reference';
import useAutoResizer from '../hooks/useAutoResizer';
import { Box, FormControl, Note, Paragraph, Stack, Text } from '@contentful/f36-components';
import { EntryProps } from 'contentful-management';
import tokens from '@contentful/f36-tokens';
import ValueDisplay from '../components/ValueDisplay/ValueDisplay';

const getFieldFromEntry = ({
	field, 
	contentType, 
	entry, 
	locale
}:{
	field: string, 
	contentType: ContentType, 
	entry:EntryProps, locale:string
}) => {
	
	const {
		fields
	} = contentType || {};

	const schema = fields?.find((f) => f.id === field);
	const value = entry?.fields?.[field]?.[locale];
	
	return {
		schema,
		value
	}
}


const FieldDisplay = ({ 
	label, 
	value
}: {
		label?: string, 
		value: React.ReactNode
}) => {
	return (
		<Box>
			<FormControl.Label style={{margin: 0}}>
				{label || 'n/a'}
			</FormControl.Label>
			<Box>
				{value}			
			</Box>
		</Box>
	)
}



const Field = () => {

	useAutoResizer();
	const sdk = useSDK<FieldAppSDK>();
	const fields = useMemo(() => sdk.parameters.instance.fieldIds.split(',').map((fieldId:string) => fieldId.trim()), [sdk]) as string[];
	const showCreateEntityAction = sdk.parameters.instance.showCreateEntityAction;
	const showLinkEntityAction = sdk.parameters.instance.showLinkEntityAction;
	const bulkEditing = sdk.parameters.instance.bulkEditing;

	const renderCustomChildren = useCallback((entry: any, contentType: any) => {
		//({entry, contentType}) => {

			const result = fields.map((field) => {

				const {
					schema,
					value
				} = getFieldFromEntry({field, contentType, entry, locale: sdk.field.locale});

				if (!schema) {
					return (
						<Note key={field} variant="warning">
							<Paragraph>
								There is no field with name <strong>{field}</strong>.
							</Paragraph> 
							<Text>
								Remove it from the definition of <em>{sdk.field.name}</em> or add it to the content model of <em>{contentType?.name}</em>.<br />
							</Text>
						</Note>
					);
				}

				const _value = <ValueDisplay schema={schema} value={value} />;

				if ((typeof(value) === 'string' && value?.replace(/<[^>]*>/g, '').length === 0) || !value) {
					return null;
				}

				return (
					<FieldDisplay 
						key={field} 
						label={schema?.name} 
						value={_value}
					/>
				)
		
			});

			if (fields.length === 0) return null;
			if (result.filter((item) => !!item).length === 0) return null;
			
			return (
				<Box
					style={{
						backgroundColor: tokens.gray100,
						borderRadius: tokens.borderRadiusMedium
					}}
					marginTop="spacingXs"
					padding="spacingM"
				>
					<Stack
						flexDirection="column"
						alignItems="start"
						spacing="spacingL"
					>
						{result}
					</Stack>
				</Box>
			)
		//}
	}, [
		sdk.field.locale, 
		sdk.field.name, 
		fields
	]);

	if (!sdk.parameters.instance.fieldIds || fields.length === 0) {
		return (
			<Note variant='negative' style={{ width: '100%' }}>
				<strong>No fieldIds were found!</strong> 😱 <br />
				Please define correct fieldIds in the content model (entry title {`>`}{' '}
				appearance) or remove this app from there.
			</Note>
		);
	}


	return (
		<MultipleEntryReferenceEditor
			//renderCustomCard={customRenderer}
			renderCustomChildren={({entry, contentType}) => renderCustomChildren(entry, contentType)}
			viewType='link'
			sdk={sdk}
			isInitiallyDisabled
			hasCardEditActions={false}
			parameters={{
				instance: {
					showCreateEntityAction: !!showCreateEntityAction,
					showLinkEntityAction: !!showLinkEntityAction,
					bulkEditing: !!bulkEditing
				},
			}}
		/>
	);
};

export default Field;

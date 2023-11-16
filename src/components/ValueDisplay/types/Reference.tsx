import { useMemo } from "react";
//import { SingleEntryReferenceEditor } from "@contentful/field-editor-reference";
import { useSDK } from "@contentful/react-apps-toolkit";
import { FieldAppSDK } from "@contentful/app-sdk";
import { List, Spinner } from "@contentful/f36-components";
import useGetEntriesByIds from "../../../hooks/useGetEntriesByIds";
import useGetContentTypesByNames from "../../../hooks/useGetContentTypesByNames";


const Reference = ({
    ids
}:{
    ids:string[]
}) => {

    //const _ids = useMemo(() => ids, [ids]);
    const sdk = useSDK<FieldAppSDK>();
    const locale = sdk.field.locale;


    const {
        entries,
        isLoading: isLoadingEntries
    } = useGetEntriesByIds(ids);

    const contentTypeNames = useMemo(() => entries?.map((entry) => entry?.sys?.contentType?.sys?.id), [entries]);

    const {
        contentTypes = [],
        isLoading: isLoadingContentTypes
    } = useGetContentTypesByNames(contentTypeNames);

    if (isLoadingEntries || isLoadingContentTypes) {
        return <Spinner variant='default' />;
    }

    return (
        <List style={entries.length === 1 ? {
            listStyle: 'none',
            padding: 0
        }:{}}>
            {
                entries.map((entry) => {
                    const contentType = contentTypes.find((contentType) => contentType?.sys?.id === entry?.sys?.contentType?.sys?.id);
                    const {
                        displayField
                    } = contentType || {};
                    const title = displayField && entry?.fields?.[displayField]?.[locale];
                    return title ? <List.Item key={entry.sys.id}>{title}</List.Item> : null;
                })
            }
        </List>
    )

    /*return (
        <SingleEntryReferenceEditor
            sdk={sdk}
            viewType='link'
            hasCardEditActions={false}
            isInitiallyDisabled={false}
            parameters={{
				instance: {
					showCreateEntityAction: true,
					showLinkEntityAction: true,
				},
			}}
         />
    )*/
}

export default Reference;
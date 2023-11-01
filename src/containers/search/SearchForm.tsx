import React from 'react';

// project imports
import { FormProvider } from 'components/extended/Form';
import { yupResolver } from '@hookform/resolvers/yup';

// yup
import { AnyObjectSchema } from 'yup';
import Lazy from 'yup/lib/Lazy';

interface ISearchFormProps {
    children: React.ReactElement | React.ReactElement[];
    formSchema: AnyObjectSchema | Lazy<any, unknown>;
    handleSubmit: (values: any) => void;
    defaultValues: any;
    formReset?: any;
}

function SearchForm(props: ISearchFormProps): JSX.Element {
    const { children, defaultValues, formSchema, handleSubmit, formReset } = props;
    return (
        <FormProvider
            form={{
                defaultValues,
                resolver: yupResolver(formSchema)
            }}
            formReset={formReset}
            onSubmit={handleSubmit}
        >
            {children}
        </FormProvider>
    );
}

export default SearchForm;

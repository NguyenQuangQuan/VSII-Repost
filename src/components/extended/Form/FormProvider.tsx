/* eslint-disable prettier/prettier */
import React from 'react';

// react-hook-form
import { FieldValues, FormProvider as RHFProvider, SubmitHandler, useForm, UseFormProps, UseFormReturn } from 'react-hook-form';

interface IFormProviderProps<T extends FieldValues> extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
    form?: UseFormProps<T>;
    formReturn?: UseFormReturn<T>;
    onSubmit?: SubmitHandler<T>;
    children: React.ReactElement | React.ReactElement[] | any;
    formReset?: T;
}
function FormProvider<T extends FieldValues>(props: IFormProviderProps<T>): JSX.Element {
    const { children, onSubmit, form, formReset, formReturn, ...other } = props;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const methods = formReturn ? { ...formReturn } : useForm<T>({ ...form, mode: 'all' });

    React.useEffect(() => {
        methods.reset(formReset);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formReset]);

    return (
        <RHFProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit!)} {...other}>
                {React.Children?.map(children, (child) => {
                    return child?.props?.name
                        ? React.createElement<T>(child.type, {
                              ...{
                                  key: child.props.name,
                                  ...methods.register,
                                  ...child.props
                              }
                          })
                        : child;
                })}
            </form>
        </RHFProvider>
    );
}

export default FormProvider;

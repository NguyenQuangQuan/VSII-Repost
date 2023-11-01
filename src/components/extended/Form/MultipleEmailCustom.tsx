import React, { useEffect } from 'react';
import { ReactMultiEmail } from 'react-multi-email';
import 'react-multi-email/dist/style.css';

interface CustomProps {
    onChange: (event: { target: { name: string; value: string[] } }) => void;
    name: string;
    value: string[];
}

const MultipleEmailCustom = React.forwardRef<any, CustomProps>(function MultipleEmailCustom(props, ref) {
    const { onChange, ...other } = props;
    const [emails, setEmails] = React.useState<string[]>([]);

    useEffect(() => {
        setEmails(props && Array.from(props.value));
        // eslint-disable-next-line
    }, [props.value]);

    return (
        <ReactMultiEmail
            {...other}
            emails={emails}
            onChange={(_emails: string[]) => {
                onChange({
                    target: {
                        name: props.name,
                        value: _emails
                    }
                });
            }}
            autoFocus={false}
            getLabel={(email, index, removeEmail) => {
                return (
                    <div data-tag key={index}>
                        <div data-tag-item>{email}</div>
                        <span data-tag-handle onClick={() => removeEmail(index)}>
                            ×
                        </span>
                    </div>
                );
            }}
        />
    );
});

export default MultipleEmailCustom;

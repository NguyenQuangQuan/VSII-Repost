import { ReactNode } from 'react';

interface ITabPnanelProps {
    index: number;
    value: number;
    children?: ReactNode;
}

const TabPanel = (props: ITabPnanelProps) => {
    const { index, value, children, ...other } = props;

    return (
        <>
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`full-width-tabpanel-${index}`}
                aria-labelledby={`full-width-tab-${index}`}
                {...other}
            >
                {children}
            </div>
        </>
    );
};

export default TabPanel;

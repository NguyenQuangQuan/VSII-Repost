import { FormattedMessage } from 'react-intl';

// project imports
import { Select } from 'components/extended/Form';
import { ADDED_EBITDA } from 'constants/Common';

interface IServiceTypeProps {
    required?: boolean;
    name: string;
}

const AddedEbitdaType = (props: IServiceTypeProps) => {
    const { required, name } = props;
    return (
        <>
            <Select required={required} selects={[...ADDED_EBITDA]} name={name} label={<FormattedMessage id="added-ebitda" />} />
        </>
    );
};

AddedEbitdaType.defaultProps = {
    isShowAll: false,
    name: 'projectKPIBonus.addedEbitda'
};

export default AddedEbitdaType;

// project imports
import { Select } from 'components/extended/Form';
import { searchFormConfig } from './Config';
import { FormattedMessage } from 'react-intl';
import { useEffect, useState } from 'react';
import sendRequest from 'services/ApiService';
import Api from 'constants/Api';
import { ICurrency, IOption } from 'types';
import { DEFAULT_VALUE_OPTION_SELECT } from 'constants/Common';

interface ICurrencyProps {
    isShow?: boolean;
    handleChangeFullOption?: (data: IOption) => void;
    name?: string;
    required?: boolean;
    year?: number;
    currency?: string;
    disabled?: boolean;
}

const Currency = (props: ICurrencyProps) => {
    const { handleChangeFullOption, name, required, year, currency, disabled } = props;
    const [currencys, setCurrencys] = useState<IOption[]>([DEFAULT_VALUE_OPTION_SELECT]);
    let currentYear = new Date().getFullYear();

    async function getCurrency() {
        const params = { year: year ? year : currentYear, currency };
        const response = await sendRequest(Api.sale_productivity.getExchangeRateVND, params);
        const { status, result } = response;
        if (status) {
            result.content.forEach((cur: ICurrency) => {
                let currencyOption = {
                    value: cur.currency,
                    label: cur.currency,
                    number: cur.exchangeRate
                };
                setCurrencys((items) => [...items, currencyOption]);
            });
        }
    }

    useEffect(() => {
        getCurrency();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [year]);

    return (
        <Select
            disabled={disabled}
            required={required}
            selects={currencys}
            handleChangeFullOption={handleChangeFullOption}
            name={!name ? searchFormConfig.currency.name : name}
            label={<FormattedMessage id={searchFormConfig.currency.label} />}
        />
    );
};

export default Currency;

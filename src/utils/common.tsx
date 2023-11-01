import { Fragment } from 'react';
import { FieldErrors } from 'react-hook-form';

// project imports
import { DATE_FORMAT, STATUS } from 'constants/Common';
import { IProductivityHcInfo, IFieldByTabUser, IOption, IProductivity } from 'types';
import { getCookieByKey } from './cookies';

// third party
import moment from 'moment';

// base url
const baseUrl = `${process.env.REACT_APP_BASE_URL_API}`;

/**
 * format price
 * @param price
 * @return format price
 */
export const formatPrice = (price: any) => {
    return new Intl.NumberFormat('en-US').format(+price);
};

/**
 * transformRequestOptions
 * @param params
 * @returns
 */
export const transformRequestOptions = (params: any) => {
    let options = '';
    Object.entries<any>(params).forEach(([key, value]) => {
        if (typeof value !== 'object' && value) {
            options += `${key}=${encodeURIComponent(value)}&`;
        } else if (Array.isArray(value)) {
            value.forEach((el) => {
                options += `${key}=${encodeURIComponent(el)}&`;
            });
        }
    });
    return options ? options.slice(0, -1) : options;
};

/**
 * export document
 * @param url
 * @param query
 */
export const exportDocument = (url: any, query?: any) => {
    const accessToken = getCookieByKey('accessToken');
    // const urlDownload = `${baseUrl + '/' + url}?${qs.stringify({ ...query, token: accessToken })}`;
    const urlDownload = `${baseUrl + '/' + url}?${transformRequestOptions({ ...query, token: accessToken })}`;
    const win = window.open(urlDownload, '_blank')!;
    win.focus();
};
/**
 * format tableCell project
 * @param projects
 * @param character
 * @return
 */
export const formatTableCellMemberInProject = (projects: string | null, character?: string) => {
    let splitCharacter = character ? character : ';';
    if (!projects) return <span></span>;
    const formatProjects = projects.split(splitCharacter);
    if (formatProjects.length > 1) {
        return formatProjects.map((item: string, key: number) => (
            <Fragment key={key}>
                <span>{item.includes(splitCharacter) ? item.slice(0, -1) : item}</span>
                <br></br>
            </Fragment>
        ));
    }
    return projects.includes(splitCharacter) ? projects.slice(0, -1) : projects;
};

/**
 * format tableCell project
 * @param {project: string[]}
 * @return {ReactNode} format tablecell
 */
export const formatTableCellProject = (projects: string[]) => {
    return projects.map((project, key) => (
        <Fragment key={key}>
            <span>{project}</span>
            <br />
        </Fragment>
    ));
};

/**
 * convert status
 * @param status
 * @return status user
 */
export const convertStatus = (status: string) => {
    return !!status ? STATUS.filter((el) => el.value === status)[0].label : <></>;
};

/**
 * isEmpty return true when value: undefined, null, "", [], {}
 * @param obj
 * @return {boolean} boolean
 */
export const isEmpty = (value: any): boolean => {
    return (
        // null or undefined
        value == null ||
        // has length and it's zero
        (value.hasOwnProperty('length') && value.length === 0) ||
        // is an Object and has no keys
        (value.constructor === Object && Object.keys(value).length === 0)
    );
};

/**
 * Validate file format
 * @param file
 * @return {boolean} boolean
 */
export const validateFileFormat = (file: File): boolean => {
    const validExtensions = ['xlsx', 'xls'];
    const fileExtension = file.name.split('.')[1];
    return validExtensions.includes(fileExtension);
};

/**
 * isNotNumber
 */
export const isNotNumber = (string: any) => {
    if (string) {
        if (string?.length === 0) {
            // Nếu chuỗi rỗng, coi là chuỗi
            return true;
        } else if (string[0] === '0') {
            // Nếu có số 0 ở đầu chuỗi, coi là chuỗi
            if (string?.length === 1) {
                return false;
            } else {
                return true;
            }
        } else {
            if (!isNaN(string)) {
                // Kiểm tra xem có thể chuyển đổi thành số hay không
                return false;
            } else {
                return true;
            }
        }
    }
};

/**
 * get PARAMS URL
 * @param {string[]} keyParams
 * @param {URLSearchParams} searchParams
 * @return {object} object urlParams
 */
export const getSearchParam = (keyParams: string[], searchParams: URLSearchParams, keyParamsArray?: string[]): object => {
    let urlParams: { [key: string]: any } = {};

    for (const key of keyParams) {
        !isNotNumber(searchParams.get(key)! as any)
            ? (urlParams[key] = searchParams.get(key) ? +searchParams.get(key)! : null)
            : (urlParams[key] = searchParams.get(key));
    }
    if (keyParamsArray) {
        for (const key of keyParamsArray) {
            let isArrayNumber = !isNaN(searchParams.getAll(key)[0] as any);
            urlParams[key] = isArrayNumber ? convertArrayStringToNumber(searchParams.getAll(key)) : searchParams.getAll(key);
        }
    }
    return urlParams;
};

/**
 * Check invalid value in object
 * delete object key have value: null, undefined, '', {}, []
 * @param {object} value
 */
export const transformObject = (obj: any) => {
    Object.keys(obj).forEach((key) => {
        isEmpty(obj[key]) && delete obj[key];
    });
};

/**
 * removeExtraSpace
 * @param str
 * @returns
 */
export const removeExtraSpace = (str: any) => {
    const stringFormat = !Array.isArray(str) ? str?.toString()?.trim().replace(/\t/g, '').split(/ +/).join(' ') : str;

    return stringFormat;
};

/**
 * check error tab
 * @param errors
 * @param fields
 * @returns
 */
export const getTabValueByFieldError = (errors: FieldErrors<any>, fields: IFieldByTabUser[]) => {
    let tabValue = 0;
    for (const error of fields) {
        if (error.fields.some((field: string) => errors[field])) {
            tabValue = error.tabValue;
            break;
        }
    }
    return tabValue;
};

/**
 * convert array string to array number
 * @param arr
 * @returns
 */
export function convertArrayStringToNumber(arr: string[]) {
    return arr?.map((str) => {
        return Number(str);
    });
}

/**
 * calculation sum
 * @param numbers
 * @returns
 */
export function calculationSum(...numbers: number[]): number {
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
    }
    return sum;
}

// Calculate Monthly production performance

export const getDatesFromValue = (value: number, months: IOption[]) => {
    const selectedMonth = months.find((month: IOption) => month.value === value);
    if (selectedMonth) {
        const fromDate = selectedMonth.label.substring(selectedMonth.label.indexOf('(') + 1, selectedMonth.label.indexOf('~')).trim();
        const toDate = selectedMonth.label.substring(selectedMonth.label.indexOf('~') + 1, selectedMonth.label.indexOf(')')).trim();
        return { fromDate, toDate };
    }
    return { fromDate: '', toDate: '' };
};

// Calculate receivable (TM)
export const calculateReceivable = (month: number, paymentTerm: number) => {
    const receivable = month - paymentTerm;
    return receivable;
};

// Calculate amount (TM)
export const calculateAmount = (arr: IProductivityHcInfo[], standardWorkingDay: number) => {
    for (let i = 0; i < arr.length; i++) {
        const { rateUSD, quantity } = arr[i];
        if (quantity && rateUSD !== null) {
            arr[i].amount = +rateUSD * +quantity * standardWorkingDay;
        }
    }
};

// Total amount (TM)
export const calculateTotalAmount = (arr: IProductivityHcInfo[]) => {
    let totalAmount = 0;
    for (let i = 0; i < arr?.length; i++) {
        if (arr[i].amount !== null) {
            totalAmount += parseInt(arr[i].amount);
        }
    }
    return totalAmount;
};

// Calculate Contract size (TM)
export const calculateContractSize = (original: number, exchange: number) => {
    const contractSize = original / exchange;
    return contractSize;
};

// Calculate rate USD (TM)
export const calculateRateUsd = (exchange: number, rate: number) => {
    // extra / usdmd * 23
    const rateUsd = rate / exchange;
    return rateUsd;
};

// Calculate delivered (Fix cost)
export const calculateDeliveredFixCost = (contractSize: number, contractAllocationByMonth: number) => {
    const delivered = contractSize / contractAllocationByMonth;
    return delivered;
};

//Total Delivered
export const calculateTotalDelivered = (data: IProductivity[]) => {
    let totalDelivered = 0;
    if (data) {
        for (let i = 0; i < data.length; i++) {
            totalDelivered += data[i]!.delivered!.value!;
        }
        return totalDelivered;
    }
};
// Delivered month 4 last year
export const deliveredMonthLastYear = (data: IProductivity[], month: number) => {
    if (data) {
        for (const item of data) {
            if (item.month === month) {
                return item!.delivered!.value;
            }
        }
    } else {
        return 0;
    }
};

export const getWorkingDaysByMonth = (months: any, monthNumber: any) => {
    const month = months?.find((m: any) => m.month === monthNumber);
    if (month) {
        return month.workingDays;
    }
    return 0;
};

// Calculate Contract allocation by month (Fix cost)

export const calculateMonthDifference = (fromDate: string, toDate: string) => {
    const formatString = DATE_FORMAT.DDMMYYYY;
    const from_date = moment(fromDate, formatString);
    const to_date = moment(toDate, formatString);

    const num_months = to_date.diff(from_date, 'months') + 1;
    return num_months;
};

// Backgroud color
export const getBackgroundColor = (item: string) => {
    return item === 'sat' || item === 'sun' ? '#B1B1B1' : '';
};

//------Calculate sale pineline buidding---
//---Financial Info

//calculate SizeVND
export const calculateSizeVND = (ori: number, usdToVnd: number) => {
    if (typeof ori === 'number' && typeof usdToVnd === 'number') {
        return ori * usdToVnd;
    } else {
        return 0;
    }
};

//calculate SizeVND
export const calculateSizeUSD = (sizeVND: number, exchangeRate: number) => {
    if (typeof sizeVND === 'number' && typeof exchangeRate === 'number') {
        return sizeVND / exchangeRate;
    } else {
        return 0;
    }
};

//calculate New sale USD
export const calculateNewSaleUSD = (managementRevenueAllocated: number, usdToVnd: number) => {
    if (typeof managementRevenueAllocated === 'number' && typeof usdToVnd === 'number') {
        return managementRevenueAllocated / usdToVnd;
    } else {
        return 0;
    }
};

//calculate remain
export const calculateRemain = (sizeUSD: number | undefined, paid: number | undefined) => {
    if (typeof sizeUSD === 'number') {
        if (typeof paid === 'number') {
            return sizeUSD - paid;
        } else {
            return sizeUSD;
        }
    } else {
        return 0;
    }
};

// Management Revenue Allocated
export const calculateTotalBillable = (data: any) => {
    let totalBillable = 0;
    for (let i = 0; i < data.length; i++) {
        totalBillable += +data[i].billable;
    }
    return totalBillable;
};

export const updateBillableInMonthlyHCList = (data: any, list: any) => {
    if (data && list) {
        return list?.map((item: any) => {
            if (item.month === data.month) {
                return {
                    ...item,
                    billable: data.billable
                };
            }
            return item;
        });
    }
};

export const updateBillableDayInMonthlyHCList = (hcList: any, billableList: any) => {
    return hcList.map((item: any) => {
        const matchingBillable = billableList.find((billable: any) => billable.month === item.month);
        if (matchingBillable) {
            return {
                ...item,
                billableDay: matchingBillable.workingDays
            };
        }
        return item;
    });
};

// Calculate rate USD (TM)
export const calculateRateUsdBidding = (exchange: number, rate: number) => {
    const rateUsd = exchange * rate;
    return rateUsd;
};

// tính dữ liệu theo quý
export const calculateQuarterlyBillable = (data: any) => {
    const quarterlyBillable = { monthly1: 0, monthly2: 0, monthly3: 0, monthly4: 0 };
    for (let i = 0; i < data.length; i++) {
        const month = +data[i].month;
        const billable = +data[i].billable;

        if (month >= 1 && month <= 3) {
            quarterlyBillable.monthly1 += billable; // Q1
        } else if (month >= 4 && month <= 6) {
            quarterlyBillable.monthly2 += billable; // Q2
        } else if (month >= 7 && month <= 9) {
            quarterlyBillable.monthly3 += billable; // Q3
        } else if (month >= 10 && month <= 12) {
            quarterlyBillable.monthly4 += billable; // Q4
        }
    }

    return quarterlyBillable;
};

// tính Total billable hours
export const calculateTotalHours = (data: any) => {
    let totalHours = 0;

    for (let i = 0; i < data.length; i++) {
        const hcMonthly = data[i].hcMonthly;
        const billableDay = data[i].billableDay;

        totalHours += hcMonthly * billableDay * 8;
    }

    return totalHours;
};

// rate by month
export const getObjectByMonth = (month: any, hcInfoMonths: any) => {
    if (month && hcInfoMonths) {
        for (let i = 0; i < hcInfoMonths.length; i++) {
            if (hcInfoMonths[i].month === month) {
                return hcInfoMonths[i];
            }
        }
        return null; // Trả về null nếu không tìm thấy object với tháng tương ứng
    }
};
export const calculateNetEarn = (qL1stValue: any, qL2ndValue: any, qL3rdValue: any, qL4thValue: any) => {
    if (qL1stValue || qL2ndValue || qL3rdValue || qL4thValue) {
        return +qL1stValue + +qL2ndValue + +qL3rdValue + +qL4thValue;
    }
};
//---HC Info

// Calculate amount (TM)
export const calculateAmountBidding = (arr: any, standardWorkingDay: number) => {
    for (let i = 0; i < arr.length; i++) {
        const { rateVND, quantity } = arr[i];
        if (quantity && rateVND !== null) {
            arr[i].amount = +rateVND * +quantity * +standardWorkingDay;
        }
    }
};

//calculate HCS
export const calculateHCS = (tlHCs: number, seniorHCs: number, midSeniorHCs: number, juniorHCs: number) => {
    if (tlHCs || seniorHCs || midSeniorHCs || juniorHCs) {
        return +tlHCs + +seniorHCs + +midSeniorHCs + +juniorHCs;
    }
};

// Total New Sale
export const calculateTotalNewSale = (st: number, nd: number, rd: number, th: number) => {
    if (typeof st === 'number' && typeof nd === 'number' && typeof rd === 'number' && typeof th === 'number') {
        return st + nd + rd + th;
    } else {
        return 0;
    }
};

//Billable FC
export const calculateBillableFC = (sizeUSD: number, ContractAllocation: number) => {
    if (typeof sizeUSD === 'number' && typeof ContractAllocation === 'number') {
        return sizeUSD / ContractAllocation;
    } else {
        return 0;
    }
};
/**
 * Get base64
 * @param text
 * @returns
 */
export const getBase64fromReaderResult = (text: string) => {
    return text.replace('data:', '').replace(/^.+,/, '');
};

/**
 * Ponvert file to base64
 * @param file
 * @returns
 */
export const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result?.toString() || '');
        reader.onerror = (error) => reject(error);
    });
};

/**
 * show pdf in new tab
 * @param base64Data
 */
export function showPdfInNewTab(base64Data: string) {
    const nav = window.navigator as any;
    if (nav && nav.msSaveOrOpenBlob) {
        var byteCharacters = atob(base64Data);
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        var blob = new Blob([byteArray], {
            type: 'application/pdf'
        });
        nav.msSaveOrOpenBlob(blob, 'myreport.pdf');
    } else {
        var pdfWindow: any = window.open('', '_blank');
        const iframeTag = "<iframe width='100%' style='margin: -8px;border: none;' height='100%' src='data:application/pdf;base64, ";
        const iframeTagClose = "'></iframe>";
        pdfWindow.document.write(iframeTag + encodeURI(base64Data) + iframeTagClose);
    }
}
// get data productivity by month
export const getDataProductivityByMonth = (array: IProductivity[], month: number) => {
    return (
        array &&
        array.length > 0 &&
        array.filter((el: IProductivity) => {
            return el.month === month;
        })
    );
};

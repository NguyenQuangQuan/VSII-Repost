// project imports
import { DATE_FORMAT } from 'constants/Common';
import { IOption } from 'types';

// third party
import moment from 'moment';

/**
 * Date format
 * @param date
 * @param format
 * @returns
 */
export function dateFormat(date: Date | string | null | undefined, format?: string): string {
    const dateFormat = date ? moment(date).format(format ? format : DATE_FORMAT.DDMMYYYY) : '';
    return dateFormat;
}

export function dateFormatComparison(day: any) {
    const dateFormat = new Date(day);
    return dateFormat.getTime();
}

/**
 * Get number of current years
 * @param numberOfYears
 * @returns
 */
export function getNumberOfCurrentYears(numberOfYears: number, reverse?: boolean) {
    let numberOfCurrentYears: number[] = [];
    for (let i = 0; i < numberOfYears; i++) {
        let year = reverse ? new Date().getFullYear() + i : new Date().getFullYear() - i;
        numberOfCurrentYears.push(year);
    }
    return numberOfCurrentYears;
}

/**
 * Get weeks periods in year (from SAT to FRI)
 * @param year
 * @returns
 */
export function getWeeksPeriodsInYear(year: number) {
    const weeks: IOption[] = [];
    const dayOfFirstWeek = dateFormat(new Date(year, 0, 1)); // Ngày đầu tiên của năm
    const dayOfLastWeek = dateFormat(new Date(year, 11, 31)); // Ngày cuối cùng của năm
    // Ngày đầu tiên của năm hoặc của tuần đầu tiên
    //nếu tuần thiếu sẽ là ngày thứ 7 cuối cùng của năm ngoái
    let currentWeek = new Date(year, 0, 1);
    let index = 1;
    let numberOfWeek = 1;
    while (currentWeek.getFullYear() === year) {
        // Nếu ngày đầu tuần không phải là thứ 7
        if (currentWeek.getDay() !== 6) {
            // thì chuyển ngày đầu tuần sang thứ 7 tuần trước
            // công thức ngày bắt đầu ngày bắt đầu của tuần đầu trừ đi ngày bắt đầu của tuần tiên + 1 ngày
            currentWeek = new Date(currentWeek.getTime() - (currentWeek.getDay() + 1) * 24 * 60 * 60 * 1000);
        }
        // Otherwise nếu ngày đầu tuần của tuần đầu tiên rơi vào thứ 7

        // Ngày kết thúc của tuần luôn là ngày thứ 6 của tuần sau hoặc tuần này (tuần thiếu)
        // Lấy ngày bắt đầu + 6 ngày (Ngày bắt đầu của tuần luôn luôn là thứ 7)
        const dayOfWeekend = new Date(currentWeek.getTime() + 6 * 24 * 60 * 60 * 1000);

        // format date
        const startDate = dateFormat(currentWeek);
        const endDate = dateFormat(dayOfWeekend);

        // Kiểm tra xem ngày kết thúc của tuần cuối cùng có nằm trong năm hiện tại không
        if (dayOfWeekend.getFullYear() !== year) {
            // Nếu không nằm thì chỉ lấy ngày bắt đầu của tuần đó
            weeks.push({
                value: `${startDate} - ${dayOfLastWeek}`,
                label: `Week ${index++} (${startDate} - ${dayOfLastWeek})`,
                number: numberOfWeek++
            });
        } else {
            // Nếu ngày thứ 7 thuộc năm ngoái
            // Nếu ngày bắt đầu thuộc năm ngóai
            if (currentWeek.getFullYear() !== year) {
                /**
                 * thì lấy số ngày còn thiếu của tuần đầu tiên để ta luôn có ngày bắt đầu là năm được chọn
                 */
                weeks.push({
                    value: `${dayOfFirstWeek} - ${endDate}`,
                    label: `Week ${index++} (${dayOfFirstWeek} - ${endDate})`,
                    number: numberOfWeek++
                });
            } else {
                // Nếu nằm trong năm hiện tại thì lấy cả ngày bắt đầu và kết thúc của tuần đó
                weeks.push({
                    value: `${startDate} - ${endDate}`,
                    label: `Week ${index++} (${startDate} - ${endDate})`,
                    number: numberOfWeek++
                });
            }
        }

        // Chuyển sang tuần tiếp theo
        currentWeek = new Date(dayOfWeekend.getTime() + 1 * 24 * 60 * 60 * 1000);
    }
    return weeks;
}

/**
 * Get months of year (first day - last day)
 * @param year
 * @returns
 */
export function getMonthsOfYear(year?: number) {
    let months = [];
    var date = new Date();

    for (let i = 0; i < 12; i++) {
        let firstDay = new Date(year ? year : date.getFullYear(), i, 1);
        let lastDay = new Date(year ? year : date.getFullYear(), i + 1, 0);
        let month = {
            value: i + 1,
            label: `${dateFormat(firstDay, DATE_FORMAT.MMM)} (${dateFormat(firstDay)} ~ ${dateFormat(lastDay)})`
        };
        months.push(month);
    }

    return months;
}

/**
 * Convert week from to date
 * @param week
 * @returns {fromDate, toDate}
 */
export function convertWeekFromToDate(week: string | number) {
    const fromDate = week.toString().slice(0, 10);
    const toDate = week.toString().slice(-10);
    return {
        fromDate,
        toDate
    };
}

/**
 * Convert month from to date
 * @param month
 * @returns {fromDate, toDate}
 */
export function convertMonthFromToDate(month: any) {
    const dateRange = month.substring(month.indexOf('(') + 1, month.indexOf(')'));
    const [fromDate, toDate] = dateRange.split(' ~ ');
    return {
        fromDate,
        toDate
    };
}

/**
 * get number of week
 * @param week
 * @returns {number} weekNumber
 */
export function getNumberOfWeek(week: string | number): number | undefined {
    const weekSelected: { fromDate: string; toDate: string } = convertWeekFromToDate(week);
    let weeks: IOption[] = [];
    getWeeksPeriodsInYear(new Date(moment(weekSelected.fromDate, DATE_FORMAT.DDMMYYYY).toDate()).getFullYear()).forEach((item) => {
        weeks.push(item);
    });
    /**
     * compare week
     * @return weekNumber
     */
    function compareWeek(weekInYear: string) {
        let convertWeek = convertWeekFromToDate(weekInYear);
        if (convertWeek.fromDate === weekSelected.fromDate) {
            return true;
        }
        return false;
    }

    const weekFilter = weeks.filter((item) => compareWeek(String(item.value)));

    return weekFilter[0].number;
}

/**
 * Get current year
 * @returns {current year}
 */
export function getCurrentYear() {
    const currentYear = new Date().getFullYear();
    return currentYear;
}

/**
 * Get current month
 * @returns {current month}
 */
export function getCurrentMonth() {
    const currentMonth = new Date().getMonth() + 1;
    return currentMonth;
}

/**
 * Get current week
 * @returns {current week}
 */
export function getCurrentWeek(): IOption {
    // Ngày hôm nay
    const today = new Date();
    // ngày hôm nay format

    let weeks: { fromDate: string; toDate: string }[] = [];
    // let weeks: IOption[] = getWeeksPeriodsInYear(today.getFullYear());

    getWeeksPeriodsInYear(today.getFullYear()).forEach((item) => {
        let week: { fromDate: string; toDate: string } = convertWeekFromToDate(item.value);
        weeks.push(week);
    });

    /**
     * Lọc ngày hiện tại đang ở tuần nào với điều kiện
     * ngày hiện tại phải lớn hoặc bằng ngày đầu tuần
     * VÀ phải nhỏ hơn hoặc bằng ngày cuối tuần
     */
    const compareDate = (fromDate: any, today: Date, toDate: any) => {
        const fromDateGetTime = new Date(moment(fromDate, DATE_FORMAT.DDMMYYYY).toDate()).getTime();
        const todayGetTime = today.getTime();
        // Ngày kết thúc tuần + thêm 24h = đến hết ngày cuối tuần
        const toDateGetTime = new Date(moment(toDate, DATE_FORMAT.DDMMYYYY).toDate()).getTime() + 1 * 24 * 60 * 60 * 1000;

        // Nếu ngày đầu tuần nhỏ hơn hoặc bằng ngày hiện tại VÀ ngày kết thúc tuần lớn hơn hoặc bằng ngày hiện tại
        if (fromDateGetTime <= todayGetTime && toDateGetTime >= todayGetTime) {
            // trả về tuần thỏa mãn điều kiện trên
            return true;
        }
        return;
    };

    const currentWeekFilter = weeks.filter((item) => compareDate(item.fromDate, today, item.toDate));
    // filter trả ra mảng, mà sau khi mảng chỉ có một index trong mảng => index 0
    let currentWeek: IOption[] = [];
    // duyệt mảng trả ra mảng index 0 có kiểu dữ liệu là IOption
    currentWeekFilter.forEach((item) => {
        let week = {
            value: `${item.fromDate} - ${item.toDate}`,
            label: ''
        };
        currentWeek.push(week);
    });

    return currentWeek[0];
}

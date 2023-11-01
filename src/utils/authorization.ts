import { MAIN_FUNCTION_LIST } from 'constants/Permission';
import { getUserInfoCookies } from './cookies';
import { ITabs } from 'types';

/**
 * User authorization
 * @param {string[]} group permissions of user
 * @return {isAllowFunctions: boolean}
 */
export function userAuthorization(group: string[], permissionsRequired?: string[]) {
    let isAllowFunctions: boolean = false;

    if (group) {
        MAIN_FUNCTION_LIST.forEach((mainFnc) => {
            mainFnc.functions.forEach((fnc) => {
                group.forEach((fncOfUser) => {
                    if (fnc === fncOfUser) {
                        if (permissionsRequired && permissionsRequired.includes(fncOfUser)) {
                            isAllowFunctions = true;
                        }
                    }
                });
            });
        });
    }

    return { isAllowFunctions };
}

/**
 * check allowed permission
 * @param permission_key
 * @return {boolean}
 */
export function checkAllowedPermission(permission_key: string): boolean {
    const userPermissions = getUserInfoCookies()?.groups;
    return userPermissions?.includes(permission_key);
}

/**
 * check user can access tab
 * @param {ITabs[]} tabs
 * @param {number} tabs
 * @return {number} tabValue
 */
export function checkAllowedTab(tabs: ITabs[], tabValueParam?: number) {
    let tabValue: number[] = [];
    tabs.forEach((item) => {
        if (checkAllowedPermission(item.permission_key!)) {
            if (tabValueParam) {
                if (item.value! === tabValueParam) {
                    tabValue.push(item.value!);
                }
                return;
            } else {
                tabValue.push(item.value!);
            }
        }
    });
    return tabValue;
}

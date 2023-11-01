import * as Alert from '@mui/material/Alert'; // eslint-disable-line @typescript-eslint/no-unused-vars

declare module '@mui/material/Alert' {
    interface AlertPropsColorOverrides {
        primary;
        secondary;
    }
}

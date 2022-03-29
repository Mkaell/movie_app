import { Snackbar } from '@mui/material'
import React from 'react'

import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface IAlertModal {
    open: boolean,
    handleClose(): void
    children: React.ReactNode;
    severity: AlertColor | undefined
}

export default function AlertModal(props: IAlertModal) {

    return (
        <>
            <Snackbar
                open={props.open}
                autoHideDuration={3000}
                onClose={props.handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    color={props.severity}
                    onClose={props.handleClose}
                    severity={props.severity}
                    sx={{ width: '100%', alignItems: 'center' }}
                >
                    {props.children}
                </Alert>
            </Snackbar>
        </>
    );
}
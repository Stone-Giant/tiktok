import { Box, Grid, TextField, Button, Snackbar, Alert } from '@mui/material';
import SubCard from 'ui-component/cards/SubCard';
import config from 'config.js';
import { useSelector, useDispatch } from 'react-redux';
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import React from 'react';
import { SETPROGRESS } from 'store/actions';

export default function VideoUpload() {
    const accessToken = useSelector((state) => state.customization.user.accessToken);
    const progressState = useSelector((state) => state.customization.progress);
    const [modalstate, setModalState] = React.useState({
        open: false,
        message: '',
        severity: 'success'
    });
    const { message, severity, open } = modalstate;

    //--------------------test
    const dispatch = useDispatch();

    // const setStep2 = () => {
    //     dispatch({ type: SETPROGRESS, progress: { step: 'Creating caption', percent: 25 } });
    // };
    // const setStep3 = () => {
    //     dispatch({ type: SETPROGRESS, progress: { step: 'Merging', percent: 50 } });
    // };
    // const setStep4 = () => {
    //     dispatch({ type: SETPROGRESS, progress: { step: 'Downloading', percent: 75 } });
    // };
    // const setStep5 = () => {
    //     dispatch({ type: SETPROGRESS, progress: { step: 'Complete', percent: 100 } });
    //     setTimeout(() => {
    //         dispatch({ type: SETPROGRESS, progress: { step: 'none', percent: 0 } });
    //     }, '1000');
    // };
    let i = 0;
    const myIntervalId = React.useRef();
    const setProgress = (step, percent) => {
        i = percent;
        clearInterval(myIntervalId.current);
        if (step != 'Completed') {
            myIntervalId.current = setInterval(function () {
                dispatch({ type: SETPROGRESS, progress: { step: step, percent: i++ } });
            }, 1000);
        } else {
            dispatch({ type: SETPROGRESS, progress: { step: step, percent: percent } });
            setTimeout(() => {
                dispatch({ type: SETPROGRESS, progress: { step: 'none', percent: 0 } });
            }, '2000');
        }
    };

    // const setProgress = (step, percent) => {
    //     let progressInterval;
    //     clearInterval(myIntervalId);
    //     let i = percent;
    //     myIntervalId = setInterval(function () {
    //         console.log(i++);
    //     }, 1000);
    // };

    //-----------------------test dispatch

    const handleClose = () => {
        setModalState({ ...modalstate, open: false });
    };

    const onChange = (e) => {
        var myHeaders = new Headers();
        myHeaders.append('authorization', 'bear ' + accessToken);

        var formdata = new FormData();
        // formdata.append('video', e.target.files[0], 'C:/Users/johy/Downloads/11111111.mp4');
        formdata.append('video', e.target.files[0], e.target.files[0].name);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(config.backendUrl + 'api/upload/filesave', requestOptions)
            .then((result) => {
                console.log(result);
                if (result.status == 200) {
                    setModalState({ open: true, message: 'Successfuly uploaded', severity: 'success' });
                } else {
                    setModalState({ open: true, message: 'Unknown error occured', severity: 'warning' });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={2000} onClose={handleClose} open={open}>
                <Alert severity={severity} onClose={handleClose} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
            <Button variant="outlined" component="label" size="large" fullWidth endIcon={<BackupOutlinedIcon />} sx={{ mb: 2 }}>
                Upload File
                <input type="file" onChange={onChange} hidden accept=".mp4,.MPEG-4,.mkv" />
            </Button>

            <Button variant="outlined" component="label" size="large" sx={{ mb: 2 }} onClick={() => setProgress('Uploading', 0)}>
                step1
            </Button>
            <Button variant="outlined" component="label" size="large" sx={{ mb: 2 }} onClick={() => setProgress('Creating caption', 25)}>
                step2
            </Button>
            <Button variant="outlined" component="label" size="large" sx={{ mb: 2 }} onClick={() => setProgress('Generating ', 50)}>
                step3
            </Button>
            <Button variant="outlined" component="label" size="large" sx={{ mb: 2 }} onClick={() => setProgress('Downloading', 75)}>
                step4
            </Button>
            <Button variant="outlined" component="label" size="large" sx={{ mb: 2 }} onClick={() => setProgress('Completed', 100)}>
                step5
            </Button>
        </>
    );
}

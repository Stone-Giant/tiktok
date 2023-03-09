import { Box, Grid, TextField, Button } from '@mui/material';
import SubCard from 'ui-component/cards/SubCard';
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import axios from 'axios';
import config from 'config.js';
import { useDispatch, useSelector } from 'react-redux';
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';

export default function VideoUpload() {
    const accessToken = useSelector((state) => state.customization.user.accessToken);

    const uploadFile = (url, file) => {
        let formData = new FormData();
        formData.append('file', file);
        axios
            .post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    authorization: 'bear ' + accessToken
                }
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log('error-------->');
                console.log(error);
            });
    };

    const onChange = (e) => {
        // const fileList = this.files;
        // const file = fileList[0];

        // // Create a FileReader
        // const reader = new FileReader();

        // reader.onload = function () {
        //     const fileURL = reader.result;
        //     console.log(fileURL);
        // };

        // Read the file as a data URL
        // reader.readAsDataURL(file);

        console.log(e.target.files[0]);
        var myHeaders = new Headers();
        myHeaders.append(
            'authorization',
            'bear eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTA4LCJpYXQiOjE2NzgyNTUzODgsImV4cCI6MTY3ODM0MTc4OH0.AwU-cP97I1hvbozqnFQEnsmpnW6nShIFxYoSov6Wn3k'
        );

        var formdata = new FormData();
        // formdata.append('video', e.target.files[0], 'C:/Users/johy/Downloads/11111111.mp4');
        formdata.append('video', e.target.files[0], e.target.files[0].name);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch('http://localhost:5000/api/upload/filesave', requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log('error', error));
    };

    return (
        <Box sx={{ width: '100%' }}>
            <SubCard sx={{ mb: 2 }}>
                <Grid container direction="column" spacing={1}>
                    <Grid item sx={{ display: 'flex', gridColumnGap: 10 }}>
                        <Button variant="contained" component="label" fullWidth endIcon={<BackupOutlinedIcon />}>
                            Upload File
                            <input type="file" onChange={onChange} hidden />
                        </Button>
                        {/* <TextField
                            id="filled-hidden-label-small"
                            placeholder="asd"
                            defaultValue="Small"
                            hiddenLabel
                            variant="filled"
                            sx={{ ml: 2, height: '100%' }}
                        />
                        <Button variant="contained" component="label" endIcon={<MovieOutlinedIcon />} sx={{ ml: 'auto' }}>
                            Generate
                        </Button> */}
                    </Grid>
                </Grid>
            </SubCard>
        </Box>
    );
}

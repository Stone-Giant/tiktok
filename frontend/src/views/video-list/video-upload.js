import { Box, Grid, TextField, Button } from '@mui/material';
import SubCard from 'ui-component/cards/SubCard';
import config from 'config.js';
import { useSelector } from 'react-redux';
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';

export default function VideoUpload() {
    const accessToken = useSelector((state) => state.customization.user.accessToken);

    const onChange = (e) => {
        console.log(e.target.files[0]);
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
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log('error', error));
    };

    return (
        <Button variant="outlined" component="label" size="large" fullWidth endIcon={<BackupOutlinedIcon />} sx={{ mb: 2 }}>
            Upload File
            <input type="file" onChange={onChange} hidden />
        </Button>
    );
}

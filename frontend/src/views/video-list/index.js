// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import VideoTable from './video-table';
import VideoUpload from './video-upload';

// ==============================|| SAMPLE PAGE ||============================== //

const Videolist = () => (
    <MainCard title="Video List">
        <VideoUpload />
        <VideoTable />
    </MainCard>
);

export default Videolist;

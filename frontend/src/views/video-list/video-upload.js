import { Box, Grid, TextField, Button } from '@mui/material';
import SubCard from 'ui-component/cards/SubCard';
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';

export default function VideoUpload() {
    return (
        <Box sx={{ width: '100%' }}>
            <SubCard sx={{ mb: 2 }}>
                <Grid container direction="column" spacing={1}>
                    <Grid item sx={{ display: 'flex', gridColumnGap: 20 }}>
                        <Button variant="contained" component="label">
                            Upload File
                            <input type="file" hidden />
                        </Button>
                        <TextField
                            id="filled-hidden-label-small"
                            placeholder="asd"
                            defaultValue="Small"
                            hiddenLabel
                            variant="filled"
                            sx={{ ml: 2, height: '100%' }}
                        />
                        {/* <Textarea placeholder="Type anything…" variant="solid" /> */}
                        <Button variant="contained" component="label" endIcon={<MovieOutlinedIcon />} sx={{ ml: 'auto' }}>
                            Generate
                        </Button>
                    </Grid>
                </Grid>
            </SubCard>
        </Box>
    );
}

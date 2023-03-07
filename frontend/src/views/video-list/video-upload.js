import * as React from 'react';
import { Box, Grid, TextField, Button } from '@mui/material';
import MuiTypography from '@mui/material/Typography';
import SubCard from 'ui-component/cards/SubCard';

export default function VideoUpload() {
    return (
        <Box sx={{ width: '100%' }}>
            <SubCard sx={{ mb: 2 }}>
                <Grid container direction="column" spacing={1}>
                    <Grid item>
                        <Button variant="contained" component="label">
                            Upload File
                            <input type="file" hidden />
                        </Button>
                        <TextField
                            id="filled-hidden-label-small"
                            placeholder="asd"
                            defaultValue="Small"
                            variant="standard"
                            sx={{ ml: 2, height: '100%' }}
                        />
                    </Grid>
                </Grid>
            </SubCard>
        </Box>
    );
}

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MenuItem, InputLabel, TextField, Select, Box, FormControl } from '@mui/material';
import { Typography } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormatBoldOutlinedIcon from '@mui/icons-material/FormatBoldOutlined';
import FormatItalicOutlinedIcon from '@mui/icons-material/FormatItalicOutlined';
import FormatUnderlinedOutlinedIcon from '@mui/icons-material/FormatUnderlinedOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
export default function AlertDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [fontFormatState, setFontFormatState] = React.useState(() => []);
    const [fontFamilyState, setFontFamilyState] = React.useState('Inter');
    const [fontSizeState, setFontSizeState] = React.useState(16);
    const [captionData, setCaptionData] = React.useState([]);

    const handleFontFamily = (event) => {
        setFontFamilyState(event.target.value);
    };

    const handleFontSize = (event) => {
        setFontSizeState(event.target.value);
    };

    const handleFormat = (event, newFormats) => {
        setFontFormatState(newFormats);
    };

    const CaptionItem = (props) => {
        return (
            <>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <TextField
                        hiddenLabel
                        variant="filled"
                        size="small"
                        value={props.startTime}
                        sx={{
                            '& .MuiInputBase-root': {
                                bgcolor: 'transparent'
                            }
                        }}
                    />
                    <TextField
                        hiddenLabel
                        variant="filled"
                        size="small"
                        value={props.endTime}
                        sx={{
                            '& .MuiInputBase-root': {
                                bgcolor: 'transparent'
                            }
                        }}
                    />
                    <TextField
                        variant="filled"
                        hiddenLabel
                        size="small"
                        fullWidth
                        value={props.captionText}
                        sx={{
                            '& .MuiInputBase-root': {
                                bgcolor: 'transparent'
                            },
                            '& .MuiInputBase-input': {
                                fontFamily: `${fontFamilyState}`,
                                fontWeight: fontFormatState.includes('bold') ? 'bold' : 'normal',
                                fontStyle: fontFormatState.includes('italic') ? 'italic' : 'normal',
                                textDecoration: fontFormatState.includes('underlined') ? 'underline' : '',
                                fontSize: `${fontSizeState}px`
                            }
                        }}
                        rows="1"
                        placeholder="Input text here."
                    />
                </Box>
            </>
        );
    };

    const Caption = () => {
        console.log(captionData);
        return (
            <>
                <Box sx={{ height: '300px', overflowY: 'auto' }}>
                    {captionData.map((item, itemCount) => {
                        console.log(item);
                        return (
                            <CaptionItem key={itemCount} startTime={item.startTime} endTime={item.endTime} captionText={item.captionText} />
                        );
                    })}
                </Box>
            </>
        );
    };
    const showFile = async (e) => {
        e.preventDefault();
        const reader = new FileReader();
        reader.onload = async (e) => {
            let arraydata = e.target.result.split('\n');
            console.log(arraydata);

            let tmp = [];
            for (let i = 1; i < arraydata.length - 1; i += 3) {
                let [start, end] = arraydata[i].split(' --> ');
                tmp.push({
                    startTime: start,
                    endTime: end,
                    captionText: arraydata[i + 1]
                });
            }
            setCaptionData(tmp);
            console.log(tmp);
        };
        reader.readAsText(e.target.files[0]);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open alert dialog
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle id="alert-dialog-title" variant="h3">
                    Edit Caption
                </DialogTitle>
                <DialogContent>
                    <input type="file" onChange={(e) => showFile(e)} />
                    <Box display={'flex'} sx={{ mb: 2, columnGap: '10px', flexWrap: 'wrap' }}>
                        <ToggleButtonGroup value={fontFormatState} onChange={handleFormat} aria-label="text formatting" color="primary">
                            <ToggleButton value="bold" aria-label="bold">
                                <FormatBoldOutlinedIcon />
                            </ToggleButton>
                            <ToggleButton value="italic" aria-label="italic">
                                <FormatItalicOutlinedIcon />
                            </ToggleButton>
                            <ToggleButton value="underlined" aria-label="underlined">
                                <FormatUnderlinedOutlinedIcon />
                            </ToggleButton>
                        </ToggleButtonGroup>
                        <TextField
                            hiddenLabel
                            type="number"
                            variant="filled"
                            sx={{ width: '70px' }}
                            onChange={handleFontSize}
                            value={fontSizeState}
                            InputProps={{ inputProps: { min: 10, max: 20 } }}
                        />
                        <FormControl variant="filled" hiddenLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={fontFamilyState}
                                onChange={handleFontFamily}
                            >
                                <MenuItem value={'Inter'}>Inter</MenuItem>
                                <MenuItem value={'Roboto'}>Roboto</MenuItem>
                                <MenuItem value={'Poppins'}>Poppins</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Caption />
                </DialogContent>
                <DialogActions sx={{ p: 3, pt: 1 }}>
                    <Button onClick={handleClose} variant="outlined" color="secondary" startIcon={<CloseOutlinedIcon />}>
                        Cancel
                    </Button>
                    <Button onClick={handleClose} variant="contained" startIcon={<CheckOutlinedIcon />}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

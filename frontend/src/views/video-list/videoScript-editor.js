import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MenuItem, InputLabel, TextField, Select, Box, FormControl, Divider } from '@mui/material';
import { Typography } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormatBoldOutlinedIcon from '@mui/icons-material/FormatBoldOutlined';
import FormatItalicOutlinedIcon from '@mui/icons-material/FormatItalicOutlined';
import FormatUnderlinedOutlinedIcon from '@mui/icons-material/FormatUnderlinedOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useEffect } from 'react';
import { width } from '@mui/system';

const CaptionItem = (props) => {
    const handleChangeCaptionData = (fileld, e) => {
        let tempCaptionData = JSON.parse(JSON.stringify(props.captionData));
        let objIndex = tempCaptionData.findIndex((obj) => obj.id == props.id);
        switch (fileld) {
            case 'captionText':
                tempCaptionData[objIndex].captionText = e.target.value;
                break;
            case 'startTime.H':
                tempCaptionData[objIndex].startTime.H = e.target.value;
                break;
            case 'startTime.M':
                tempCaptionData[objIndex].startTime.M = e.target.value;
                break;
            case 'startTime.S':
                tempCaptionData[objIndex].startTime.S = e.target.value;
                break;
            case 'startTime.MS':
                tempCaptionData[objIndex].startTime.MS = e.target.value;
                break;
            case 'endTime.H':
                tempCaptionData[objIndex].endTime.H = e.target.value;
                break;
            case 'endTime.M':
                tempCaptionData[objIndex].endTime.M = e.target.value;
                break;
            case 'endTime.S':
                tempCaptionData[objIndex].endTime.S = e.target.value;
                break;
            case 'endTime.MS':
                tempCaptionData[objIndex].endTime.MS = e.target.value;
                break;
        }

        // tempCaptionData = [];
        props.setCaptionData(tempCaptionData);
    };
    console.log(1);
    const startTimeStyle = {
        flex: '1',
        width: '100%',
        height: '100%',
        outline: 'none',
        border: 'none',
        backgroundColor: '#ffffff00',
        textAlign: 'center',
        color: '#fff'
    };
    const startTimeMSStyle = {
        flex: '1.5',
        width: '100%',
        height: '100%',
        outline: 'none',
        border: 'none',
        backgroundColor: '#ffffff00',
        textAlign: 'center',
        color: '#fff'
    };
    return (
        <>
            <Box sx={{ minWidth: '400px' }}>
                <Box
                    sx={{
                        display: 'flex',
                        flex: '1',
                        alignItems: 'flex-end',
                        border: 'none',
                        // borderBottom: '1px #949494 solid',
                        backgroundColor: '#888',
                        color: '#fff',
                        borderRadius: '5px',
                        alignItems: 'center',
                        width: '70%',
                        py: 1,
                        my: 0.5,
                        px: 1
                    }}
                >
                    <input
                        type="number"
                        value={props.startTime.H}
                        style={startTimeStyle}
                        min="0"
                        max="59"
                        onChange={(e) => {
                            handleChangeCaptionData('startTime.H', e);
                        }}
                    />
                    {':'}
                    <input
                        type="number"
                        value={props.startTime.M}
                        style={startTimeStyle}
                        min="0"
                        max="59"
                        onChange={(e) => {
                            handleChangeCaptionData('startTime.M', e);
                        }}
                    />
                    {':'}
                    <input
                        type="number"
                        value={props.startTime.S}
                        style={startTimeStyle}
                        min="0"
                        max="59"
                        onChange={(e) => {
                            handleChangeCaptionData('startTime.S', e);
                        }}
                    />
                    {':'}
                    <input
                        type="number"
                        value={props.startTime.MS}
                        style={startTimeMSStyle}
                        min="0"
                        max="999"
                        onChange={(e) => {
                            handleChangeCaptionData('startTime.MS', e);
                        }}
                    />
                    <Divider orientation="vertical" flexItem sx={{ mx: 1, borderColor: 'white' }} />
                    <input
                        type="number"
                        value={props.endTime.H}
                        style={startTimeStyle}
                        min="0"
                        max="59"
                        onChange={(e) => {
                            handleChangeCaptionData('endTime.H', e);
                        }}
                    />
                    {':'}
                    <input
                        type="number"
                        value={props.endTime.M}
                        style={startTimeStyle}
                        min="0"
                        max="59"
                        onChange={(e) => {
                            handleChangeCaptionData('endTime.M', e);
                        }}
                    />
                    {':'}
                    <input
                        type="number"
                        value={props.endTime.S}
                        style={startTimeStyle}
                        min="0"
                        max="59"
                        onChange={(e) => {
                            handleChangeCaptionData('endTime.S', e);
                        }}
                    />
                    {':'}
                    <input
                        type="number"
                        value={props.endTime.MS}
                        style={startTimeMSStyle}
                        min="0"
                        max="999"
                        onChange={(e) => {
                            handleChangeCaptionData('endTime.MS', e);
                        }}
                    />
                </Box>

                <TextField
                    variant="filled"
                    hiddenLabel
                    size="small"
                    fullWidth
                    value={props.captionText}
                    sx={{
                        flex: '1.5',
                        '& .MuiInputBase-root': {
                            bgcolor: 'transparent',
                            border: 'none'
                        },
                        '& .MuiInputBase-input': {
                            fontFamily: `${props.font.fontFamilyState}`,
                            fontWeight: props.font.fontFormatState.includes('bold') ? 'bold' : 'normal',
                            fontStyle: props.font.fontFormatState.includes('italic') ? 'italic' : 'normal',
                            textDecoration: props.font.fontFormatState.includes('underlined') ? 'underline' : '',
                            fontSize: `${props.font.fontSizeState}px`,
                            px: 1,
                            py: 1
                        }
                    }}
                    rows="1"
                    placeholder="Input text here."
                    onChange={(e) => {
                        handleChangeCaptionData('captionText', e);
                    }}
                />
            </Box>
        </>
    );
};

const Caption = (props) => {
    return (
        <>
            <Box sx={{ height: '300px', overflowY: 'auto' }}>
                {props.captionData.map((item, itemCount) => {
                    return (
                        <CaptionItem
                            key={itemCount}
                            id={item.id}
                            startTime={item.startTime}
                            endTime={item.endTime}
                            captionText={item.captionText}
                            font={props.font}
                            captionData={props.captionData}
                            setCaptionData={props.setCaptionData}
                        />
                    );
                })}
            </Box>
        </>
    );
};
export default function AlertDialog() {
    useEffect(() => {
        getText();
    }, []);
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

    function getText() {
        // read text from URL location
        var request = new XMLHttpRequest();
        request.open('GET', 'http://127.0.0.1:5500/stone.txt', true);
        request.send(null);
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                var type = request.getResponseHeader('Content-Type');
                if (type.indexOf('text') !== 1) {
                    getdata(request.responseText);
                }
            }
        };
    }

    const getdata = (text) => {
        console.log(text);
        let arraydata = text.split('\n');

        let tmp = [];
        for (let i = 1; i < arraydata.length - 1; i += 3) {
            let [start, end] = arraydata[i].split(' --> ');
            let [startFT, startMS] = start.split(',');
            let [endFT, endMS] = end.split(',');
            let [startH, startM, startS] = startFT.split(':');
            let [endH, endM, endS] = endFT.split(':');
            tmp.push({
                id: (i - (i % 3)) / 3 + 1,
                startTime: {
                    H: startH,
                    M: startM,
                    S: startS,
                    MS: startMS
                },
                endTime: {
                    H: endH,
                    M: endM,
                    S: endS,
                    MS: endMS
                },
                captionText: arraydata[i + 1]
            });
        }
        setCaptionData(tmp);
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
                    <Caption
                        captionData={captionData}
                        font={{ fontFormatState, fontFamilyState, fontSizeState }}
                        setCaptionData={setCaptionData}
                    />
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

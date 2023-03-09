import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import {
    Avatar,
    Card,
    CardContent,
    Grid,
    LinearProgress,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
    linearProgressClasses,
    Grow
} from '@mui/material';

// assets
import { IconCloudDownload } from '@tabler/icons';

// styles
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 30,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: '#fff'
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.primary.main
    }
}));

const CardStyle = styled(Card)(({ theme }) => ({
    background: theme.palette.primary.light,
    marginBottom: '22px',
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: '157px',
        height: '157px',
        background: theme.palette.primary[200],
        borderRadius: '50%',
        top: '-105px',
        right: '-96px'
    }
}));

// ==============================|| PROGRESS BAR WITH LABEL ||============================== //

function LinearProgressWithLabel({ value, ...others }) {
    const theme = useTheme();

    return (
        <Grid container direction="column" spacing={1} sx={{ mt: 1.5 }}>
            <Grid item>
                <Grid container justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h6" sx={{ color: theme.palette.primary[800] }}>
                            Progress
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6" color="inherit">{`${Math.round(value)}%`}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <BorderLinearProgress variant="determinate" value={value} {...others} />
            </Grid>
        </Grid>
    );
}

LinearProgressWithLabel.propTypes = {
    value: PropTypes.number
};

// ==============================|| SIDEBAR MENU Card ||============================== //

const MenuCard = () => {
    const theme = useTheme();
    const progressState = useSelector((state) => state.customization.progress);
    let showed = false;
    if (progressState.step != 'none') {
        showed = true;
    } else {
        showed = false;
    }

    // const customization = useSelector((state) => state.customization);
    // console.log(progressState);

    return (
        <Grow in={showed} {...(showed ? { timeout: 1000 } : {})}>
            <CardStyle>
                <CardContent sx={{ p: 2 }}>
                    <List sx={{ p: 0, m: 0 }}>
                        <ListItem alignItems="flex-start" disableGutters sx={{ p: 0 }}>
                            <ListItemAvatar sx={{ mt: 0 }}>
                                <Avatar
                                    variant="rounded"
                                    sx={{
                                        ...theme.typography.commonAvatar,
                                        ...theme.typography.largeAvatar,
                                        color: theme.palette.primary.main,
                                        border: 'none',
                                        borderColor: theme.palette.primary.main,
                                        background: '#fff',
                                        marginRight: '12px'
                                    }}
                                >
                                    <IconCloudDownload fontSize="inherit" />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                sx={{ mt: 0 }}
                                primary={
                                    <Typography variant="subtitle1" sx={{ color: theme.palette.primary[800] }}>
                                        Generating Video
                                    </Typography>
                                }
                                secondary={<Typography variant="caption"> {progressState.step}</Typography>}
                            />
                        </ListItem>
                    </List>
                    <LinearProgressWithLabel value={progressState.percent} />
                </CardContent>
            </CardStyle>
        </Grow>
    );
};

export default MenuCard;

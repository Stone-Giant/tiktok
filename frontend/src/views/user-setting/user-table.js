import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import { Chip, Button } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'moment';

import axios from 'axios';

import config from 'config';

import { IconUserX, IconUserCheck, IconLockOpen, IconUserSearch } from '@tabler/icons';
import { ManageAccountsOutlined, PeopleAltOutlined } from '@mui/icons-material';
import { useEffect } from 'react';

function createData(email, name, create_date, update_date, roles, status) {
    return {
        email,
        name,
        create_date,
        update_date,
        roles,
        status
    };
}

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'email',
        align: 'left',
        disablePadding: true,
        label: 'User Email'
    },
    {
        id: 'name',
        align: 'center',
        disablePadding: false,
        label: 'User Name'
    },
    {
        id: 'create_date',
        align: 'center',
        disablePadding: false,
        label: 'Entry date'
    },
    {
        id: 'update_date',
        align: 'center',
        disablePadding: false,
        label: 'Updated date'
    },
    {
        id: 'roles',
        align: 'center',
        disablePadding: false,
        label: 'Roles'
    },
    {
        id: 'status',
        align: 'right',
        disablePadding: false,
        label: 'User Status'
    }
    // {
    //     id: 'action',
    //     numeric: true,
    //     disablePadding: false,
    //     label: 'Action'
    // }
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {/* <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts'
                        }}
                    />
                </TableCell> */}
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
};

function EnhancedTableToolbar(props) {
    const { numSelected } = props;

    return (
        <>
            {numSelected > 0 ? (
                <Fade in={true}>
                    <Toolbar
                        sx={{
                            pl: { sm: 2 },
                            pr: { xs: 1, sm: 1 },
                            py: 0,
                            ...(numSelected > 0 && {
                                bgcolor: (theme) => alpha(theme.palette.success.main, theme.palette.action.activatedOpacity)
                            })
                        }}
                    >
                        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
                            {numSelected} selected
                        </Typography>
                        <Tooltip title="Active">
                            <IconButton aria-label="fingerprint" color="success">
                                <IconUserCheck />
                            </IconButton>
                        </Tooltip>
                    </Toolbar>
                </Fade>
            ) : (
                ''
            )}
        </>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired
};

export default function UserTable() {
    const accessToken = useSelector((state) => state.customization.user.accessToken);
    React.useEffect(() => {
        axios
            .get(config.backendUrl + 'api/user/getAllUser', {
                headers: {
                    authorization: 'bear ' + accessToken
                }
            })
            .then((res) => {
                let temp = [];
                res.data[0].data.map((item) =>
                    temp.push(
                        createData(
                            item.email,
                            item.firstName + ' ' + item.lastName,
                            item.createdAt,
                            item.updatedAt,
                            item.roles,
                            item.status
                        )
                    )
                );
                setRows(temp);
                console.log(temp);
            })
            .catch((error) => {
                console.log(error);
            });

        console.log(rows);
    }, []);

    // getUserData(accessToken);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState([]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.email);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, email) => {
        const selectedIndex = selected.indexOf(email);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, email);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (email) => selected.indexOf(email) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const ActionTool = (props) => {
        return (
            <>
                {/* {props.status > 0 ? (
                    <Tooltip title="Disactive">
                        <IconButton color="secondary">
                            <IconUserX />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Active">
                        <IconButton color="secondary">
                            <IconUserCheck />
                        </IconButton>
                    </Tooltip>
                )} */}
                <Tooltip title="Format Password">
                    <IconButton color="primary">
                        <IconLockOpen />
                    </IconButton>
                </Tooltip>
            </>
        );
    };

    const StatusChip = (props) => {
        const [chipState, setChipState] = React.useState({ status: 1, color: 'success', label: 'actived', icon: <IconUserCheck /> });
        useEffect(() => {
            if (props.status > 0) {
                setChipState({ color: 'success', label: 'actived', icon: <IconUserCheck />, status: 1 });
            } else {
                setChipState({ color: 'error', label: 'disactived', icon: <IconUserX />, status: 0 });
            }
        }, []);
        const changesss = () => {
            if (chipState.status > 0) {
                setChipState({ color: 'error', label: 'disactived', icon: <IconUserX />, status: 0 });
            } else {
                setChipState({ color: 'success', label: 'actived', icon: <IconUserCheck />, status: 1 });
            }
            axios
                .post(
                    config.backendUrl + 'api/user/setState',
                    { user_email: props.email },
                    {
                        headers: {
                            authorization: 'bear ' + accessToken
                        }
                    }
                )
                .then((res) => {
                    console.log(res);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        return (
            <>
                <Chip label={chipState.label} color={chipState.color} onClick={changesss} icon={chipState.icon} />
            </>
        );
    };

    const RolesChip = (props) => {
        return (
            <>
                {props.roles > 1 ? (
                    <Chip label="Admin" color="primary" variant="outlined" icon={<ManageAccountsOutlined />} />
                ) : (
                    <Chip label="Commen" color="secondary" variant="outlined" icon={<PeopleAltOutlined />} />
                )}
            </>
        );
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.email);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.email}
                                            selected={isItemSelected}
                                        >
                                            {/* <TableCell padding="checkbox">
                                                <Checkbox
                                                    onClick={(event) => handleClick(event, row.email)}
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId
                                                    }}
                                                />
                                            </TableCell> */}
                                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                                {row.email}
                                            </TableCell>
                                            <TableCell align="center">{row.name}</TableCell>
                                            <TableCell align="center">{Moment(row.create_date).format('YYYY-MM-DD')}</TableCell>
                                            <TableCell align="center">{Moment(row.update_date).format('YYYY-MM-DD')}</TableCell>
                                            <TableCell align="center">
                                                <RolesChip roles={row.roles} />
                                            </TableCell>
                                            <TableCell align="right">
                                                <StatusChip status={row.status} email={row.email} />
                                            </TableCell>

                                            {/* <TableCell align="right">
                                                <ActionTool status={row.status} />
                                            </TableCell> */}
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}

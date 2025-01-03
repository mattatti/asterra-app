import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchUsers, deleteUser} from '../redux/usersSlice.ts';
import {AppDispatch, RootState} from '../redux/store';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {Box, Button, IconButton, Tooltip} from '@mui/material';
import {Delete} from "@mui/icons-material";
import AddUserDialog from "./AddUserDialog.tsx";
import AddHobbyDialog from "./AddHobbyDialog.tsx";

interface IHobby {
    id: number;
    userId: number;
    hobby: string;
}

const IndexResultsPage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const users = useSelector((state: RootState) => state.users.users);

    const [dialogAddUserOpen, setDialogAddUserOpen] = useState(false);
    const [dialogAddHobbyOpen, setDialogAddHobbyOpen] = useState(false);

    const handleCloseAddHobbyDialog = () => {
        setDialogAddHobbyOpen(false);
    };

    const handleCloseAddUserDialog = () => {
        setDialogAddUserOpen(false);
    };

    const handleDelete = (userId: number) => {
        dispatch(deleteUser(userId));
    };

    const columns: GridColDef[] = [{
        field: 'firstName',
        flex: 0.8,
        headerName: 'First Name',
        width: 200,
        sortable: true,
    }, {
        field: 'lastName',
        flex: 0.8,
        headerName: 'Last Name',
        width: 200,
        sortable: true,
    }, {
        field: 'address',
        flex: 0.8,
        headerName: 'Address',
        width: 200,
        sortable: true,
    }, {
        field: 'phoneNumber',
        flex: 0.8,
        headerName: 'Phone Number',
        width: 200,
        sortable: true,
    }, {
        field: 'hobbies',
        flex: 1,
        headerName: 'Hobbies',
        width: 200,
        sortable: false,
        renderCell: (params) => {
            const hobbies = params.row.hobbies as IHobby[] || [];
            const hobbiesString = hobbies.map((hobby: IHobby) => hobby.hobby).join(', ');
            return (
                <Tooltip title={hobbiesString}>
                    <span>{hobbiesString}</span>
                </Tooltip>
            );
        },
    }, {
        field: 'actions',
        flex: 0.3,
        headerName: '',
        width: 200,
        filterable: false,
        sortable: false,
        renderCell: (params) => {
            const user = params.row;
            return (
                <div style={{float: 'right'}}>
                    <IconButton color='error' onClick={() => handleDelete(user.id)}>
                        <Delete/>
                    </IconButton>
                </div>
            );
        },
    }];

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    return (
        <>
            <Box sx={{display: 'flex', gap: 2, padding: 1}}>
                <Button
                    sx={{border: '1px solid', color: 'black', backgroundColor: '#f0f0f0'}}
                    onClick={() => setDialogAddUserOpen(true)}
                >
                    Add User
                </Button>
                <Button
                    sx={{border: '1px solid', color: 'black', backgroundColor: '#f0f0f0'}}
                    onClick={() => setDialogAddHobbyOpen(true)}
                >
                    Add Hobby
                </Button>
            </Box>

            <DataGrid
                rows={users}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
            />
            <AddHobbyDialog open={dialogAddHobbyOpen} onClose={handleCloseAddHobbyDialog}/>
            <AddUserDialog open={dialogAddUserOpen} onClose={handleCloseAddUserDialog}/>
        </>
    );
};

export default IndexResultsPage;
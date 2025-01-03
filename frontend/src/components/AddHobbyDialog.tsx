import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addHobby, fetchUsers} from "../redux/usersSlice.ts";
import {AppDispatch, RootState} from "../redux/store.ts";

interface Props {
    open: boolean;
    onClose: () => void;
}

const AddHobbyDialog: React.FC<Props> = ({open, onClose}) => {
    const [selectedUser, setSelectedUser] = useState('');
    const [hobby, setHobby] = useState('');
    const dispatch: AppDispatch = useDispatch();
    const users = useSelector((state: RootState) => state.users.users);

    const handleSave = async () => {
        dispatch(addHobby({userId: Number(selectedUser), hobby}));
        handleClose();
    };

    const handleClose = () => {
        setSelectedUser('');
        setHobby('');
        onClose();
    };

    const isFormValid = () => {
        return hobby && selectedUser;
    };

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle style={{fontSize: 20}}>Add Hobby</DialogTitle>
            <DialogContent style={{width: '300px'}}>
                <Box component="form" onSubmit={handleSave} noValidate>
                    <FormControl fullWidth margin="normal">
                        <InputLabel required id="user-select-label">User</InputLabel>
                        <Select
                            labelId="user-select-label"
                            value={selectedUser}
                            onChange={(e) => setSelectedUser(e.target.value as string)}
                            required
                            label="User"
                        >
                            {users.map((user) => (
                                <MenuItem key={user.id} value={user.id}>
                                    {user.firstName} {user.lastName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            label="Hobby"
                            value={hobby}
                            onChange={(e) => setHobby(e.target.value)}
                            required
                        />
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color='primary'>
                    Cancel
                </Button>
                <Button
                    onClick={handleSave}
                    color='primary'
                    disabled={!isFormValid()}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddHobbyDialog;
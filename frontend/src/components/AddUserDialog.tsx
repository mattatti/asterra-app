import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    TextField,
} from '@mui/material';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addUser} from "../redux/usersSlice.ts";
import {AppDispatch} from "../redux/store.ts";

interface Props {
    open: boolean;
    onClose: () => void;
}

const AddUserDialog: React.FC<Props> = ({open, onClose}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const dispatch: AppDispatch = useDispatch();

    const handleSave = async () => {
        dispatch(addUser({firstName, lastName, address, phoneNumber}));
        handleClose();
    };

    const handleClose = () => {
        setFirstName('');
        setLastName('');
        setAddress('');
        setPhoneNumber('');
        onClose();
    };

    const handleNameChange = (value: string, setter: (value: string) => void, maxLength: number) => {
        // Allow only letters and spaces, remove any other characters
        const sanitizedValue = value.replace(/[^A-Za-z\s]/g, '');
        if (sanitizedValue.length <= maxLength) {
            setter(sanitizedValue);
        }
    };

    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, ''); // Only allow digits
        if (value.length <= 15) {
            setPhoneNumber(value);
        }
    };

    const isFormValid = () => {
        return firstName && lastName && address && phoneNumber;
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle style={{fontSize: 20}}>Add User</DialogTitle>
            <DialogContent style={{width: '300px'}}>
                <Box component="form" onSubmit={handleSave} noValidate>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            label="First Name"
                            value={firstName}
                            onChange={(e) => handleNameChange(e.target.value, setFirstName, 20)}
                            required
                            inputMode="text"
                            size="medium"
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            label="Last Name"
                            value={lastName}
                            onChange={(e) => handleNameChange(e.target.value, setLastName, 20)}
                            required
                            inputMode="text"
                            size="medium"
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            label="Address"
                            value={address}
                            onChange={(e) => {
                                if (e.target.value.length <= 25) {
                                    setAddress(e.target.value);
                                }
                            }}
                            required
                            inputMode="text"
                            size="medium"
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            label="Phone Number"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                            required
                            type="tel"
                            inputMode="numeric"
                            size="medium"
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

export default AddUserDialog;
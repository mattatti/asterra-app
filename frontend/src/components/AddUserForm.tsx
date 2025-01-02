import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {addUser} from "../redux/usersSlice.ts";
import {AppDispatch} from "../redux/store.ts";

const AddUserForm: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const dispatch: AppDispatch = useDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(addUser({firstName, lastName, address, phoneNumber}));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                   required/>
            <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}
                   required/>
            <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)}
                   required/>
            <input type="text" placeholder="Phone Number" value={phoneNumber}
                   onChange={(e) => setPhoneNumber(e.target.value)} required/>
            <button type="submit">Add User</button>
        </form>
    );
};

export default AddUserForm;
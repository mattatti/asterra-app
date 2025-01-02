import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addHobby, fetchUsers, IUser} from "../redux/usersSlice.ts";
import {AppDispatch, RootState} from '../redux/store';


const AddHobbyForm: React.FC = () => {

    const [selectedUser, setSelectedUser] = useState('');
    const [hobby, setHobby] = useState('');
    const dispatch: AppDispatch = useDispatch();
    const users = useSelector((state: RootState) => state.users.users);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(addHobby({userId: Number(selectedUser), hobby}));
        dispatch(fetchUsers());
    };

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    return (
        <form onSubmit={handleSubmit}>
            <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} required>
                <option value="" disabled>Select User</option>
                {users.map((user: IUser) => (
                    <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>
                ))}
            </select>
            <input type="text" placeholder="Hobby" value={hobby} onChange={(e) => setHobby(e.target.value)} required/>
            <button type="submit">Add Hobby</button>
        </form>
    );
};

export default AddHobbyForm;
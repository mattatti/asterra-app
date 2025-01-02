import React, {useEffect} from 'react';
import {IUser} from "./AddHobbyForm.tsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchUsers} from '../redux/usersSlice.ts';
import {AppDispatch, RootState} from '../redux/store';

const IndexResultsPage: React.FC = () => {

    const dispatch: AppDispatch = useDispatch();
    const users = useSelector((state: RootState) => state.users.users);

    const handleDelete = async (userId: number) => {
        try {
            await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/users/${userId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            dispatch(fetchUsers());


        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);
    console.log('users hobbies', users.hobbies);
    return (
        <table>
            <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Hobbies</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user: IUser) => (
                <tr key={user.id}>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.address}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.hobbies?.join(', ')}</td>
                    <td>
                        <button onClick={() => handleDelete(user.id)}>Delete</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default IndexResultsPage;
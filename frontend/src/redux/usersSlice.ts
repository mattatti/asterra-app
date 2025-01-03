import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    phoneNumber: string;
    hobbies?: IHobby[];
}

interface IHobby {
    id: number;
    userId: number;
    hobby: string;
}

interface UsersState {
    users: IUser[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: UsersState = {
    users: [],
    status: 'idle',
    error: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users`);
    return await response.json();
});

export const addUser = createAsyncThunk('users/addUser', async (newUser: Omit<IUser, 'id'>) => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
    });
    const result = await response.json();
    if (!result.id) {
        throw new Error('Invalid users data from API');
    }
    return result;
});

export const addHobby = createAsyncThunk('users/addHobby', async ({userId, hobby}: {
    userId: number,
    hobby: string
}) => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/hobbies`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId, hobby}),
    });
    const result = await response.json();
    if (!result.id || !result.userId || !result.hobby) {
        throw new Error('Invalid hobby data from API');
    }
    return result;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (userId: number) => {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return userId;
});

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch users';
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.users.unshift(action.payload);
            })
            .addCase(addHobby.fulfilled, (state, action) => {
                const user = state.users.find(user => user.id === action.payload.userId);
                if (user) {
                    user.hobbies = user.hobbies ? [...user.hobbies, action.payload] : [action.payload];
                }
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter(user => user.id !== action.payload);
            });
    },
});

export default usersSlice.reducer;
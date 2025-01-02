import React from 'react';
import AddUserForm from './components/AddUserForm';
import AddHobbyForm from './components/AddHobbyForm';
import IndexResultsPage from './components/IndexResultsPage';

const App: React.FC = () => {
    return (
        <div>
            <h1>User Management</h1>
            <AddUserForm/>
            <AddHobbyForm/>
            <IndexResultsPage/>
        </div>
    );
};

export default App;
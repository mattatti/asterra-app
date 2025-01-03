import React from 'react';
import IndexResultsPage from './components/IndexResultsPage';
import {Typography} from "@mui/material";

const App: React.FC = () => {
    return (
        <div>
            <Typography sx={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>User Management</Typography>

            <IndexResultsPage/>
        </div>
    );
};

export default App;
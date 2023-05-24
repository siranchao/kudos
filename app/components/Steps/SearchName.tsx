import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';


export default function SearchName({addReceiver}: any) {
    const [user, setUser] = useState([]);
    const [name, setName] = useState('');

    const [graphData, setGraphData] = useState([]);
    const [searchTerms, setSearchTerms] = useState('');

    const sendName = () => {
        addReceiver(name);
    }

    return (
        < div
            style={{ margin: '2rem 0 0 1rem', textAlign: 'center' }}
        >
            <h6>You can search and add multiple receivers</h6>

            {/* <Autocomplete
                disablePortal
                onChange={handleChange} 
                id="combo-box-demo"
                options={user}
                sx={{ maxWidth: 400, minWidth: 300, m: `.75rem auto` }}
                renderInput={(params) => <TextField {...params} label="Name" />}
            /> */}


            {/* <h6>Or</h6>
            <div style={{ maxWidth: 400, minWidth: 300, margin: `0 auto` }}>
                <TextField
                    id="input-name"
                    label="Enter Name"
                    fullWidth

                    onChange={handleChange}
                />
            </div> */}

            <div style={{ cursor: `pointer`, display: `block`, margin: `1rem auto` }} onClick={sendName}>
                <PersonAddAlt1RoundedIcon
                    color="primary"
                    fontSize="large"
                />
                <strong style={{ padding: `0 .5rem`, color: `#0066CC` }} >Add User</strong>
            </div>

        </div>
    )
}
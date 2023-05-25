import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';

export default function SearchName({addReceiver, users}: any) {
    const [name, setName] = useState('');
    const sendName = () => addReceiver(name);

    return (
        < div
            style={{ margin: '2rem 0 0 1rem', textAlign: 'center' }}
        >
            <h6>You can search and add multiple receivers</h6>

            { users && 
                <div>
                    <Autocomplete
                        id="combo-box-demo"
                        sx={{ maxWidth: 400, minWidth: 300, m: `.75rem auto` }}
                        options={users.map((item: any) => item.name)}
                        renderInput={(params) => <TextField {...params} label="Select User" />}

                        onChange={(e: any, value: any) => setName(value)}
                    />
                    <h6>Or</h6>
                </div>
            }
            <div style={{ maxWidth: 400, minWidth: 300, margin: `0 auto` }}>
                <TextField
                    id="input-name"
                    label="Enter Name"
                    fullWidth
                    onChange={(e: any) => setName(e.target.value)}
                />
            </div>

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
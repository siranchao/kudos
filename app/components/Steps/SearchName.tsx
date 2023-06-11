'use client'
import { useState } from 'react';
import { Autocomplete, TextField, Chip } from '@mui/material';
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
                        id="select-user"
                        sx={{ maxWidth: 400, minWidth: 300, m: `.75rem auto` }}
                        onChange={(e: any, value: any) => setName(value)}
                        options={users.map((item: any) => item.username)}
                        renderOption={(props, option) => {
                            return (
                              <li {...props} key={option}>
                                {option}
                              </li>
                            );
                        }}
                        renderTags={(tagValue, getTagProps) => {
                            return tagValue.map((option, index) => (
                              <Chip {...getTagProps({ index })} key={option} label={option} />
                            ))
                        }}
                        renderInput={(params) => <TextField {...params} label="Select User" />}
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
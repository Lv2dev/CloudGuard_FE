import React from 'react';
import { Button } from '@mui/material';

function FileUploadButton({ onFileSelect }) {
    const handleFileInput = (e) => {
        const file = e.target.files[0];
        if (file) {
            onFileSelect(file);
        }
    };

    return (
        <Button
            variant="contained"
            component="label"
        >
            Upload File
            <input
                type="file"
                hidden
                onChange={handleFileInput}
            />
        </Button>
    );
}

export default FileUploadButton;

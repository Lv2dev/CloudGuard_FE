import React, { useState } from 'react';
import { Menu, MenuItem } from '@mui/material';

function FileContextMenu({ file, onEdit, onDelete, onShare, children }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleRightClick = (event) => {
        event.preventDefault();
        setAnchorEl({ top: event.clientY, left: event.clientX });
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div onContextMenu={handleRightClick}>
            {children}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={anchorEl ? { top: anchorEl.top, left: anchorEl.left } : undefined}
            >
                <MenuItem onClick={onEdit}>Edit</MenuItem>
                <MenuItem onClick={onDelete}>Delete</MenuItem>
                <MenuItem onClick={onShare}>Share</MenuItem>
            </Menu>
        </div>
    );
}

export default FileContextMenu;
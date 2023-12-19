import React, { useState } from 'react';
import { Modal, Box, Typography, Button, TextField, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import {useParams} from "react-router-dom";
import axiosInstance from "../../utils/axios";
import {useSelector} from "react-redux";

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const EncryptionModal = ({ open, onClose, treeId }) => {
    const [file, setFile] = useState(null);
    const [key, setKey] = useState('');
    const [algorithm, setAlgorithm] = useState('AES');

    const accessToken = useSelector(state => state.auth.accessToken);


    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {

        const formData = new FormData();
        formData.append('file', file);
        formData.append('encryptionKey', key);
        formData.append('algorithm', algorithm);
        formData.append('treeId', treeId ? treeId : 0);

        try {
            const response = await axios.post('http://localhost:8099/api/file/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${accessToken}`, // 이 부분을 수정
                },
            });
            console.log(response.data);
            onClose(); // 모달 닫기
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyle}>
                <Typography variant="h6" component="h2">
                    Encrypt and Upload File
                </Typography>
                <input type="file" onChange={handleFileChange} />
                <TextField
                    label="Encryption Key"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Select
                    value={algorithm}
                    onChange={(e) => setAlgorithm(e.target.value)}
                    fullWidth
                    margin="normal"
                >
                    <MenuItem value="AES">AES</MenuItem>
                    <MenuItem value="SEED">SEED</MenuItem>
                    <MenuItem value="ARIA">ARIA</MenuItem>
                </Select>
                <Button onClick={handleUpload} color="primary" variant="contained">
                    Upload
                </Button>
            </Box>
        </Modal>
    );
};

export default EncryptionModal;

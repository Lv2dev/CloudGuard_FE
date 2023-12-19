import React, { useState, useEffect } from 'react';
import {
    Box,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Typography,
    ListItemIcon,
    CardContent,
    Card, Grid, Button
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { motion } from 'framer-motion';
import FileUploadButton from "./component/FileUploadButton";
import FileContextMenu from "./component/FileContextMenu";
import TopBar from "./component/TopBar";
import EncryptionModal from "./component/EncryptionModal";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import axiosInstance from "../utils/axios";

const folderHoverStyle = {
    rotate: 5, // 마우스 호버 시 기울기 각도
};


function FileExplorer() {
    const [files, setFiles] = useState([]); // 파일 목록 상태
    const [currentPath, setCurrentPath] = useState('/'); // 현재 경로 상태

    const accessToken = useSelector(state => state.auth.accessToken);

    const dispatch = useDispatch();
    const tree = useSelector(state => state.tree);


    const [modalOpen, setModalOpen] = useState(false);
    // 모달 열기
    const openModal = () => {
        setModalOpen(true);
    };
    // 모달 닫기
    const closeModal = () => {
        setModalOpen(false);
    };


    const [hoveredItem, setHoveredItem] = useState(null); // 마우스 호버된 아이템 상태

    const handleEdit = (file) => {
        // 파일 편집 로직
    };

    const handleDelete = (file) => {
        // 파일 삭제 로직
    };

    const handleShare = (file) => {
        // 파일 공유 로직
    };

    /**
     * /api/file/list/root 호출해서 파일 가져오기(get)
     * */
    const getFiles = async () => {
        try {
            const response = await axiosInstance.get('file/list/root', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log("파일, 폴더 목록을 불러왔습니다...")
            console.log(response.data);
            setFiles(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    // 파일 목록을 가져오는 함수 (예시로 사용)
    useEffect(() => {
        if(accessToken){
            getFiles();
        }
    }, [accessToken]);

    // 파일 또는 폴더를 클릭했을 때의 핸들러
    const handleItemClick = (item) => {
        if (item.type === 'folder') {
            // 폴더일 경우 경로 변경
            setCurrentPath(currentPath + item.name + '/');
        } else {
            // 파일일 경우 여기에 파일을 여는 로직을 구현합니다.
        }
    };

    // 상위 폴더로 이동
    const goToParentDirectory = () => {
        // 상위 폴더로 경로를 설정하는 로직
    };

    return (
        <Box>
            <TopBar/>
            <Box sx={{p:2}}>
                <Button onClick={openModal}>Upload and Encrypt File</Button>
                <EncryptionModal open={modalOpen} onClose={closeModal} treeId={tree} />
                <Grid container spacing={2} sx={{width:"100%", mt:2}}>
                    {files.map((file, index) => (
                        <Grid item xs={6} sm={4} md={3} key={index}>
                            <FileContextMenu
                                key={index}
                                file={file}
                                onEdit={() => handleEdit(file)}
                                onDelete={() => handleDelete(file)}
                                onShare={() => handleShare(file)}
                            >
                                <motion.div
                                    initial={{transform: "perspective(600px)"}}
                                    whileHover={{scale: 1.1, translateY: -10, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)"}}
                                    transition={{type: "spring", stiffness: 300}}
                                >
                                    <Card sx={{width:"100%"}}>
                                        <CardContent>
                                            <IconButton>
                                                {file.type === 'folder' ? <FolderIcon/> : <InsertDriveFileIcon/>}
                                            </IconButton>
                                            <Typography variant="h6">{file.name}</Typography>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </FileContextMenu>
                        </Grid>
                    ))}
                </Grid>
            </Box>

        </Box>
    );
}

export default FileExplorer;

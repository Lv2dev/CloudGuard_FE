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
    Card
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { motion } from 'framer-motion';
import FileUploadButton from "./component/FileUploadButton";
import FileContextMenu from "./component/FileContextMenu";
import TopBar from "./component/TopBar";

const folderHoverStyle = {
    rotate: 5, // 마우스 호버 시 기울기 각도
};


function FileExplorer() {
    const [files, setFiles] = useState([]); // 파일 목록 상태
    const [currentPath, setCurrentPath] = useState('/'); // 현재 경로 상태

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

    // 파일 목록을 가져오는 함수 (예시로 사용)
    useEffect(() => {
        // 여기에 파일 목록을 가져오는 API 호출 로직을 구현합니다.
        // 예시 데이터
        setFiles([
            { name: 'Folder 1', type: 'folder' },
            { name: 'File 1.txt', type: 'file' },
            // ... 기타 파일 및 폴더
        ]);
    }, [currentPath]);

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
                <FileUploadButton onFileSelect={(file) => console.log(file)} />
                <List>
                    {files.map((file, index) => (
                        <FileContextMenu
                            key={index}
                            file={file}
                            onEdit={() => handleEdit(file)}
                            onDelete={() => handleDelete(file)}
                            onShare={() => handleShare(file)}
                        >
                            <motion.div
                                initial={{ transform: "perspective(600px)" }}
                                whileHover={{ rotateY: -10, rotateX: 10 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <Card sx={{ maxWidth: 345, mb: 2 }}>
                                    <CardContent>
                                        <IconButton>
                                            {file.type === 'folder' ? <FolderIcon /> : <InsertDriveFileIcon />}
                                        </IconButton>
                                        <Typography variant="h6">{file.name}</Typography>
                                        {/* 여기에 추가 파일 정보 또는 액션을 추가할 수 있습니다 */}
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </FileContextMenu>
                    ))}
                </List>
            </Box>

        </Box>
    );
}

export default FileExplorer;

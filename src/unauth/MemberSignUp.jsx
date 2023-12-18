import React, {useState} from 'react';
import {
    Box,
    Button, CircularProgress, createTheme,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextField, ThemeProvider,
    Typography
} from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {useNavigate} from "react-router-dom";
import axios from "axios"; // 뒤로가기 아이콘 임포트


function MemberSignUp(props) {
    // font
    const theme = createTheme({
        typography: {
            fontFamily: 'NanumSquareNeo',
        },
    })
    //navigate
    const navigate = useNavigate();

    const [gender, setGender] = useState('1'); // 성별 초기값 설정 (예: 1-남성, 2-여성)
    const [imagePreview, setImagePreview] = useState(null);

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const goBack = () => {
        navigate(-1); // 뒤로가기
    };

    const [formData, setFormData] = useState({
        email: '',
        nickname: '',
        gender: 1, // 성별 초기값 설정
        profile: null
    });

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);

        // 이메일 유효성 검사 정규 표현식
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if (!emailRegex.test(newEmail)) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
    };

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);

    const validatePassword = (password) => {
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        return regex.test(password);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setPasswordError(!validatePassword(event.target.value));
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
        setConfirmPasswordError(password !== event.target.value);
    };

    const isPasswordValid = (password) => {
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        return regex.test(password);
    };

    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!isPasswordValid(password) || password !== confirmPassword) {
            alert('The password does not match.');
            setPasswordError(true);
            return;
        }
        // 이메일 규칙 확인
        if (emailError) {
            alert('Please enter a valid email.');
            return;
        }
        setLoading(true);

        // 입력되지 않은 것 있으면 체크
        if(email == "" || password == "" || confirmPassword == ""){
            alert("입력되지 않은 항목이 있습니다.");
            return;
        }

        const payload = {
            ...formData,
        };

        try {
            const response = await axios.post('http://localhost:8099/api/token/signup', payload);
            // 성공 처리
        } catch (error) {
            // 오류 처리
        } finally {
            setLoading(false);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: {xs: 2, sm: 3, md: 4},
                    boxSizing: 'border-box',
                    position: 'relative', // 부모 컨테이너에 상대적으로 위치를 설정합니다.
                }}
            >
                {/* 로딩 중일 때 뒷 배경 */}
                {loading && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)', // 흐려진 배경 색상 및 투명도 조절
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 9999, // 다른 요소 위에 표시하려면 적절한 z-index 값을 설정하세요.
                        }}
                    >
                        {/* 로딩 중일 때 로딩 프로그레스 */}
                        <Box
                            sx={{
                                backgroundColor: 'white',
                                padding: '20px',
                                borderRadius: '5px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <CircularProgress />
                            <Typography variant="body2" sx={{ mt: 2 }}>
                                Loading...
                            </Typography>
                        </Box>
                    </Box>
                )}
                {/* 뒤로가기 버튼 */}
                <Button
                    startIcon={<ArrowBackIosNewIcon />}
                    onClick={goBack}
                    sx={{
                        position: 'absolute',
                        top: 20,
                        left: 20,
                        color: 'white'
                    }}
                >
                    Back
                </Button>
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: 400,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            color: '#fff',
                            mb: 4,
                            fontFamily: 'Arial, sans-serif',
                            fontSize: {xs: '1.5rem', sm: '2rem', md: '2.5rem'},
                        }}
                    >
                        Sign Up
                    </Typography>
                    <TextField label="Nickname" variant="outlined" fullWidth sx={{mb: 2}}/>

                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={email}
                        onChange={handleEmailChange}
                        error={emailError}
                        helperText={emailError ? "Please enter a valid email." : ""}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={password}
                        onChange={handlePasswordChange}
                        error={passwordError}
                        helperText={passwordError ? "It does not comply with password rules." : ""}
                    />
                    <TextField
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        error={confirmPasswordError}
                        helperText={confirmPasswordError ? "The password does not match." : ""}
                    />
                    <Typography variant="caption" sx={{ color: 'gray' }}>
                        Password must include at least 8 characters, a number, an uppercase and a lowercase letter.
                    </Typography>
                    <Button variant="contained" component="label" sx={{my: 2, color: 'white', backgroundColor: '#333', '&:hover': {backgroundColor: '#555'}}}>
                        Upload Profile Image
                        <input type="file" hidden onChange={handleImageChange} />
                    </Button>
                    {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />}
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            mt: 2,
                            color: 'white',
                            backgroundColor: '#333',
                            '&:hover': {backgroundColor: '#555'},
                            fontSize: {xs: '0.8rem', sm: '1rem', md: '1.2rem'},
                        }}
                        onClick={handleSubmit}
                    >
                        Sign Up
                    </Button>
                    {loading && <CircularProgress />}
                </Box>
            </Box>
        </ThemeProvider>

    );
}

export default MemberSignUp;
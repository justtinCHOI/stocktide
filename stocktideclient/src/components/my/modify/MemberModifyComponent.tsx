import React, { useEffect, useState, useRef, FC } from 'react';
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import useCustomMember from "@hooks/useCustomMember";
import { modifyMember, checkEmailDuplicate } from "@api/memberApi";
import ResultModal from "@components/common/ResultModal";
import {
    Button,
    Container,
    ContentBottom,
    ErrorMessage,
    FormRow,
    Icon,
    Input,
    InputWrapper,
    Label
} from "@assets/css/content";
import { MemberState } from '@typings/member';
import { toast } from 'react-toastify';

const initState = {
    memberId : 0,
    name : '',
    email: '',
    password: '',
    confirmPassword: '',
}

const MemberModifyComponent: FC = () => {

    const [member, setMember] = useState<MemberState>(initState)
    const { loginState: loginInfo } = useCustomMember();
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [result, setResult] = useState<string | null>()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const {doLogout, moveToLogin} = useCustomMember()

    const nameInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const confirmPasswordInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setMember({...loginInfo})
    },[loginInfo])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setMember(prev => ({
            ...prev,
            [name]: value
        }));

        if (e.target.name === 'email') {
            handleEmailChange(e.target.value).then()
        } else if (e.target.name === 'confirmPassword') {
            handlePasswordChange()
        }
    }

    const handleEmailChange = async (email: string) => {
        try {
            const isDuplicate = await checkEmailDuplicate(email)
            if (isDuplicate) {
                setEmailError('이미 사용 중인 이메일입니다.')
            } else {
                setEmailError('')
            }
        } catch (error) {
            console.error('이메일 중복 검사 중 오류가 발생했습니다.', error)
            setEmailError('이메일 중복 검사 중 오류가 발생했습니다.')
        }
    }

    const handlePasswordChange = () => {
        if (member.password !== member.confirmPassword) {
            setPasswordError('비밀번호가 일치하지 않습니다.')
        } else {
            setPasswordError('')
        }
    }

    const handleClickModify = () => {
        if (!member.name) {
            alert('이름을 입력해 주세요.')
            nameInputRef.current!.focus()
            return
        }

        if (!member.email) {
            alert('이메일을 입력해 주세요.')
            emailInputRef.current!.focus()
            return
        }

        if (!member.password) {
            alert('비밀번호를 입력해 주세요.')
            passwordInputRef.current!.focus()
            return
        }

        if (!member.confirmPassword) {
            alert('비밀번호를 입력해 주세요.')
            confirmPasswordInputRef.current!.focus()
            return
        }

        if (emailError) {
            alert('이메일을 확인해 주세요.')
            emailInputRef.current!.focus()
            return
        }

        if (passwordError) {
            alert('비밀번호가 일치하지 않습니다.')
            confirmPasswordInputRef.current!.focus()
            return
        }

        const MemberModifyDTO = {
            memberId : member.memberId,
            name : member.name,
            email: member.email,
            password: member.password,
        }

        modifyMember(MemberModifyDTO).then(() => {
            setResult('Modified')
        })
    }

    const closeModal = () => {
        setResult(null)
        doLogout()
        toast.info("로그아웃되었습니다");
        moveToLogin()
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    return (
        <>
            <Container>
                {result && <ResultModal title={'회원정보'} content={'정보수정완료'} callbackFn={closeModal}/>}

                <FormRow>
                    <Label>이름</Label>
                    <Input
                        name="name"
                        type="text"
                        value={member.name}
                        onChange={handleChange}
                        ref={nameInputRef}
                    />
                </FormRow>

                <FormRow>
                    <Label>이메일</Label>
                    <Input
                        name="email"
                        type="email"
                        value={member.email}
                        onChange={handleChange}
                        ref={emailInputRef}
                    />
                    {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
                </FormRow>

                <FormRow>
                    <Label>비밀번호</Label>
                    <InputWrapper>
                        <Input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={member.password}
                            onChange={handleChange}
                            ref={passwordInputRef}
                        />
                        <Icon onClick={toggleShowPassword}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </Icon>
                    </InputWrapper>
                </FormRow>

                <FormRow>
                    <Label>비밀번호 재확인</Label>
                    <InputWrapper>
                        <Input
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            onChange={handleChange}
                            ref={confirmPasswordInputRef}
                        />
                        <Icon onClick={toggleShowConfirmPassword}>
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </Icon>
                    </InputWrapper>
                    {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
                </FormRow>

                <FormRow style={{justifyContent: 'end'}}>
                    <Button type="button" onClick={handleClickModify}>
                        Modify
                    </Button>
                </FormRow>
            </Container>
            <ContentBottom/>
        </>

    );
}


export default MemberModifyComponent;


import React, { useEffect, useState, useRef, FC } from 'react';
// import {FaEye, FaEyeSlash} from 'react-icons/fa';
import useCustomMember from "@hooks/useCustomMember";
import { checkEmailDuplicate } from "@api/memberApi";
// import ResultModal from "@components/common/ResultModal";
import {
    Button,
    Container,
    ContentBottom,
    ErrorMessage,
    FormRow,
    // Icon,
    Input,
    InputWrapper,
    Label
} from "@styles/content";
import { MemberState } from '@typings/member';
import { toast } from 'react-toastify';

const MemberModifyComponent: FC = () => {

    const { loginState: loginInfo, doModifyMember } = useCustomMember();
    const [member, setMember] = useState<MemberState>(loginInfo)
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    // const [showPassword, setShowPassword] = useState(false)
    // const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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
        } else if (e.target.name === 'password') {
            handlePasswordChange(e.target.value)
        } else if (e.target.name === 'confirmPassword') {
            handleConfirmPasswordChange(e.target.value)
        }
    }

    const handleEmailChange = async (email: string) => {
        try {
            const isDuplicate = await checkEmailDuplicate(email)
            if (isDuplicate && (email !== loginInfo.email)) {
                setEmailError('이미 사용 중인 이메일입니다.')
            } else {
                setEmailError('')
            }
        } catch (error) {
            setEmailError('이메일 중복 검사 중 오류가 발생했습니다.')
        }
    }

    const handlePasswordChange = (password: string) => {
        if (member.confirmPassword && password !== member.confirmPassword) {
            setPasswordError('비밀번호가 일치하지 않습니다.')
        } else {
            setPasswordError('')
        }
    }

    const handleConfirmPasswordChange = (confirmPassword: string) => {
        if (member.password !== confirmPassword) {
            setPasswordError('비밀번호가 일치하지 않습니다.')
        } else {
            setPasswordError('')
        }
    }

    const handleClickModify = () => {
        if (!member.name) {
            toast.error("이름을 입력해 주세요");
            nameInputRef.current!.focus()
            return
        }

        if (!member.email) {
            toast.error("이메일을 입력해 주세요");
            emailInputRef.current!.focus()
            return
        }

        if (!member.password) {
            toast.error("비밀번호를 입력해 주세요");
            passwordInputRef.current!.focus()
            return
        }

        if (!member.confirmPassword) {
            toast.error("재확인 비밀번호를 입력해 주세요");
            confirmPasswordInputRef.current!.focus()
            return
        }

        if (emailError) {
            toast.error("이메일을 확인해 주세요");
            emailInputRef.current!.focus()
            return
        }

        if (passwordError) {
            toast.error("비밀번호가 일치하지 않습니다");
            confirmPasswordInputRef.current!.focus()
            return
        }

        const memberModifyDTO = {
            memberId : member.memberId,
            name : member.name,
            email: member.email,
            password: member.password,
        }

        doModifyMember(memberModifyDTO).catch(() => {
            toast.error("회원 정보 수정 중 오류가 발생했습니다");
        });
    }

    return (
        <>
            <Container>
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
                            // type={showPassword ? "text" : "password"}
                            type="text"
                            value={member.password}
                            onChange={handleChange}
                            ref={passwordInputRef}
                        />
                        {/*<Icon onClick={toggleShowPassword}>*/}
                        {/*    {showPassword ? <FaEyeSlash /> : <FaEye />}*/}
                        {/*</Icon>*/}
                    </InputWrapper>
                </FormRow>

                <FormRow>
                    <Label>재확인 비밀번호</Label>
                    <InputWrapper>
                        <Input
                            name="confirmPassword"
                            // type={showConfirmPassword ? "text" : "password"}
                            type="text"
                            onChange={handleChange}
                            ref={confirmPasswordInputRef}
                        />
                        {/*<Icon onClick={toggleShowConfirmPassword}>*/}
                        {/*    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}*/}
                        {/*</Icon>*/}
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


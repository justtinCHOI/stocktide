import useCustomMove from "@hooks/useCustomMove";
import { FC, useEffect, useState } from 'react';
import {FaEye, FaEyeSlash} from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import { SkeletonBox } from '@styles/SkeletonStyles';
import useCustomMember from '@hooks/useCustomMember';

import {
    Button,
    Container,
    FormRow,
    Icon,
    Input,
    InputWrapper,
    Label
} from "@styles/content";
import { MemberState } from '@typings/member';
import { Section, Title, TitleRow } from '@styles/CustomStockTideStyles';


const MemberInfoComponent: FC = () => {
    const { t } = useTranslation();

    // 화면 이동용 함수
    const {moveToMemberModify} = useCustomMove()
    const [showPassword, setShowPassword] = useState(false)

    const { loginState: loginInfo, isLoading } = useCustomMember();
    const [member, setMember] = useState<MemberState>(loginInfo)

    useEffect(() => {
        setMember({...loginInfo})
    },[loginInfo])

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    if (isLoading) {
        return (
          <Container>
              <SkeletonBox $height="24px" $width="30%" />
              <SkeletonBox $height="24px" $width="60%" />
              <SkeletonBox $height="24px" $width="30%" />
              <SkeletonBox $height="24px" $width="60%" />
              <SkeletonBox $height="24px" $width="30%" />
              <SkeletonBox $height="24px" $width="60%" />
          </Container>
        );
    }

    return (
      <Section>
          <TitleRow>
              <Title>{t('profile.title')}</Title>
          </TitleRow>
            <FormRow>
                <Label>{t('profile.name')}</Label>
                <Input
                    name="name"
                    type="text"
                    value={member.name}
                    readOnly
                />
            </FormRow>

            <FormRow>
                <Label>{t('profile.email')}</Label>
                <Input
                    name="email"
                    type="email"
                    value={member.email}
                    readOnly
                />
            </FormRow>

            <FormRow>
                <Label>{t('profile.password')}</Label>
                <InputWrapper>
                    <Input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={member.password}
                        readOnly
                    />
                    <Icon onClick={toggleShowPassword}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </Icon>
                </InputWrapper>
            </FormRow>

            <FormRow style={{justifyContent: 'end'}}>
                <Button type="button" onClick={() => moveToMemberModify()}>
                    {t('profile.modify')}
                </Button>
            </FormRow>
    </Section>
    )
}

export default MemberInfoComponent;

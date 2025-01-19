import { FC } from 'react';
import styled from 'styled-components';
import LanguageSelector from './LanguageSelector';
import { Settings, Bell, Moon, Shield } from 'lucide-react';

const SettingComponent: FC = () => {
    return (
      <SettingsContainer>
          <SettingsHeader>
              <Settings size={24} />
              <HeaderTitle>설정</HeaderTitle>
          </SettingsHeader>

          <SettingSection>
              <LanguageSelector />
          </SettingSection>

          <SettingSection>
              <SectionTitle>
                  <Bell size={20} />
                  알림 설정
              </SectionTitle>
              <ToggleSwitch>
                  <input type="checkbox" id="notifications" />
                  <label htmlFor="notifications"></label>
                  <p>실시간 알림</p>
              </ToggleSwitch>
          </SettingSection>

          <SettingSection>
              <SectionTitle>
                  <Moon size={20} />
                  테마 설정
              </SectionTitle>
              <ThemeSelector>
                  <ThemeOption $isSelected={true}>라이트</ThemeOption>
                  <ThemeOption $isSelected={false}>다크</ThemeOption>
                  <ThemeOption $isSelected={false}>시스템</ThemeOption>
              </ThemeSelector>
          </SettingSection>

          <SettingSection>
              <SectionTitle>
                  <Shield size={20} />
                  보안
              </SectionTitle>
              <SecurityButton>
                  비밀번호 변경
              </SecurityButton>
          </SettingSection>
      </SettingsContainer>
    );
};

const SettingsContainer = styled.div`
  //max-width: 600px;
    width: 100%;
  margin: 0 auto;
  padding: 20px;
`;

const SettingsHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 30px;
`;

const HeaderTitle = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
`;

const SettingSection = styled.div`
  margin-bottom: 25px;
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 15px 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
`;

const ToggleSwitch = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  input[type="checkbox"] {
    height: 0;
    width: 0;
    visibility: hidden;
  }

  label {
    cursor: pointer;
    text-indent: 60px;
    width: 50px;
    height: 25px;
    background: grey;
    display: block;
    border-radius: 100px;
    position: relative;
  }

  label:after {
    content: '';
    position: absolute;
    top: 2.5px;
    left: 2.5px;
    width: 20px;
    height: 20px;
    background: #fff;
    border-radius: 20px;
    transition: 0.3s;
  }

  input:checked + label {
    background: #4A90E2;
  }

  input:checked + label:after {
    left: calc(100% - 2.5px);
    transform: translateX(-100%);
  }
`;

const ThemeSelector = styled.div`
  display: flex;
  gap: 10px;
`;

const ThemeOption = styled.button<{ $isSelected: boolean }>`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background: ${props => props.$isSelected ? '#4A90E2' : '#F5F5F5'};
  color: ${props => props.$isSelected ? 'white' : '#333'};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.$isSelected ? '#357ABD' : '#E0E0E0'};
  }
`;

const SecurityButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #F5F5F5;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  color: #333;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #E0E0E0;
  }
`;

export default SettingComponent;
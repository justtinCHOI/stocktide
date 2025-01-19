import styled from "styled-components";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { FC, useState } from 'react';
import { StyledLink } from '@assets/css/common';

interface MenuComponentProps {
    menus: string[];
    urls: string[];
}


const MenuComponent: FC<MenuComponentProps> = ({ menus, urls }) => {
    const [expanded, setExpanded] = useState(false);
    const [activeMenu, setActiveMenu] = useState<number | null>(null);

    const handleMenuClick = (index: number) => {
        setActiveMenu(index);
        setExpanded(false);
    };

    const toggleExpand = () => setExpanded(!expanded);

    return (
        <MenuContainer>
            <SecondMenuDiv>
                <div>
                    <SecondMenuNav>
                        {menus.map((menu, index) => (
                            <SecondMenuSingle
                                key={index}
                                $active={activeMenu === index}
                                onClick={() => handleMenuClick(index)}
                            >
                                <StyledLink to={urls[index]}>{menu}</StyledLink>
                            </SecondMenuSingle>
                        ))}
                    </SecondMenuNav>
                    <ExpandIcon onClick={toggleExpand}>
                        {expanded ? <FaChevronUp /> : <FaChevronDown />}
                    </ExpandIcon>
                </div>
                {expanded && (
                    <SecondMenuExpanded>
                        {menus.map((menu, index) => (
                            <SecondMenuSingle
                                key={index}
                                $expanded={expanded}
                                $extive={activeMenu === index}
                                onClick={() => handleMenuClick(index)}
                            >
                                <StyledLink to={urls[index]}>{menu}</StyledLink>
                            </SecondMenuSingle>
                        ))}
                    </SecondMenuExpanded>
                )}
            </SecondMenuDiv>
        </MenuContainer>
    );
};

export default MenuComponent;

const MenuContainer = styled.div`
    width: 100%;
    position: relative;
`;

const SecondMenuDiv = styled.div`
    display: flex;
    background-color: #fff;
    margin-bottom: 16px;
    position: absolute;
    width: 100%;
    align-items: center;
    z-index: 10;
    flex-direction: column;
`;

const SecondMenuNav = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid #d2d6dc;
    overflow-x: auto;
    width: 100vw;
    &::-webkit-scrollbar {
        display: none;
    }
    &:after {
        content: '';
        position: absolute;
        right: 0;
        width: 35%;
        height: 30px;
        background: linear-gradient(to right, transparent, #fff);
        pointer-events: none;
    }
`;


interface StyledMenuProps {
    $active?: boolean;
    $expanded?: boolean;
    $extive?: boolean;
}

const SecondMenuSingle = styled.div<StyledMenuProps>`
    font-size: 1rem;
    color: #4a5568;
    padding: 8px 20px;
    cursor: pointer;
    white-space: nowrap;
    ${({ $expanded }) => $expanded && `
        background-color: #555;
        color: #fff;
        margin: 12px;
        border-radius: 10px;
        text-align: center;
        font-size: 0.9rem;
        padding: 2px 6px;
    `}
    ${({ $active }) => $active && `
        color: red;
        border-bottom: 1px solid red;
    `}
    ${({ $extive }) => $extive && `
        background-color: #888;
    `}
`;

const ExpandIcon = styled.div`
    display: flex;
    width: 12%;
    position: absolute;
    right: 0;
    top: 20px;
    transform: translateY(-50%);
    cursor: pointer;
    padding: 8px;
`;

const SecondMenuExpanded = styled.div`
    display: flex;
    flex-wrap: wrap;
    color: #fff;
    padding: 5px;
    width: 100%;
    & > div {
        flex: 1 1 22%;
        margin: 5px;
    }
`;
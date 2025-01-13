import dummyLogo from "@assets/CentralSectionMenu-dummyImg.png";
// import kia from "@assets/logos/기아.svg"
import dy from "@assets/logos/디와이.jpeg";
import logosamsung from "@assets/logos/삼성전자.svg";
import celltrion from "@assets/logos/셀트리온.svg";
import ecopro from "@assets/logos/에코프로.jpeg";
import ecoproBM from "@assets/logos/에코프로비엠.svg";
import kakaoBank from "@assets/logos/카카오뱅크.svg";
import kuckoo from "@assets/logos/쿠쿠홀딩스.jpeg";
import hanse from "@assets/logos/한세엠케이.jpeg";
import hyundai from "@assets/logos/현대차.svg";
import KG from "@assets/logos/KG케미칼.png";
import LGelec from "@assets/logos/LG전자.svg";
import LGchem from "@assets/logos/LG화학.svg";
import posco from "@assets/logos/POSCO홀딩스.svg";

interface LogoMap {
    [key: string]: string;  // string 인덱스 시그니처 추가
}

export const logoList: LogoMap = {
    삼성전자: logosamsung,
    POSCO홀딩스: posco,
    셀트리온: celltrion,
    에코프로: ecopro,
    에코프로비엠: ecoproBM,
    디와이: dy,
    쿠쿠홀딩스: kuckoo,
    카카오뱅크: kakaoBank,
    한세엠케이: hanse,
    KG케미칼: KG,
    LG화학: LGchem,
    현대차: hyundai,
    LG전자: LGelec,
    // 기아: kia,
    기아: LGelec,
};

export {dummyLogo};
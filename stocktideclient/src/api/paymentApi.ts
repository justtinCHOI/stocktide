import { toast } from 'react-toastify';

interface PaymentWindow {
    IMP?: any;
}

// IMP 객체가 로드될 때까지 대기
const loadIMP = () => {
    return new Promise((resolve) => {
        if (window.IMP) {
            resolve(window.IMP);
        } else {
            // IMP가 로드될 때까지 주기적으로 체크
            const interval = setInterval(() => {
                if (window.IMP) {
                    clearInterval(interval);
                    resolve(window.IMP);
                }
            }, 300);
        }
    });
};

declare const window: PaymentWindow;

// Payment 관련 타입 정의
interface PaymentData {
    total_price: number;
    address: string;
    phone: string;
}

interface PaymentResponse {
    code: number;
    msg: string;
}

interface PaymentSuccessResponse {
    success: boolean;
    // 기타 결제 성공시 필요한 응답 필드들
    [key: string]: any;
}

// const payBtn = document.getElementById('payBtn');
//
// if (payBtn) {
//     payBtn.addEventListener('click', () => {
//         requestPay();
//     });
// }
//
// function calculateAmount(priceElements: NodeListOf<Element>): number {
//     return Array.from(priceElements).reduce((sum, price) => {
//         const priceText = price.textContent || '0';
//         return sum + parseInt(priceText.replace(/[^0-9]/g, ''), 10);
//     }, 0);
// }

function generateUniqueNumber() {
    // 현재 시간을 이용하여 고유한 숫자 생성
    const timestamp = Date.now();

    // Math.random()을 이용하여 무작위 숫자 생성
    const randomValue = Math.random();

    // 위의 두 값을 조합하여 고유한 일련번호 생성
    return `${timestamp}-${randomValue}`;
}

export function requestPay(chargedMoney: number) {


    loadIMP().then((IMP: any) => {
        IMP.init('imp76806111'); // 결제 연동 준비

        // let prices = document.querySelectorAll('.price');
        // const amount = calculateAmount(prices);

        const amount = chargedMoney;

        let buyer_email, buyer_phone, buyer_name, address, detailAddress;

        // const buyerEmailElement = document.getElementById('email') as HTMLInputElement;
        // const buyerPhoneElement = document.getElementById('phone-num') as HTMLInputElement;
        // const buyerNameElement = document.getElementById('name') as HTMLInputElement;
        // const addressElement = document.getElementById('address') as HTMLInputElement;
        // const detailAddressElement = document.getElementById('detailAddress') as HTMLInputElement;
        //
        // if (!buyerEmailElement || !buyerPhoneElement || !buyerNameElement ||
        //   !addressElement || !detailAddressElement) {
        //     console.error('Required form elements not found');
        //     return;
        // }
        // buyer_email = buyerEmailElement.value;
        // buyer_phone = buyerPhoneElement.value;
        // buyer_name = buyerNameElement.value;
        // address = addressElement.value;
        // detailAddress = detailAddressElement.value;

        buyer_email = 'nicolaochoi@naver.com';
        buyer_phone = '01074991534';
        buyer_name = '최정의';
        address = '서울';
        detailAddress = '특별시';

        let fullAddress = address + ' ' + detailAddress;

        let company_name = "StockTide";

        const data2 = {
            total_price : amount,
            address : address,
            phone : buyer_phone,
        };

        console.log(data2);

        fetch("/api/POST/checkPayment", {
            method: 'POST', // 요청 방식 설정
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json', // 내용 타입을 JSON으로 지정
            },
            body: JSON.stringify(data2)
        })
            .then(response => {
                if (!response.ok) { // 응답 상태가 OK가 아닐 경우 에러 처리
                    alert("인터넷 이슈!!");
                    throw new Error('Network response was not ok');
                }
                console.log('response',response);
                return response.json(); // 응답 본문을 JSON으로 변환
            })
            .then(data => {
                // 서버로부터 받은 데이터 처리
                console.log('data.code',data.code);
                if(data.code === 666){
                    alert(data.msg);
                    location.href="/logins"
                }
                if(data.code === 400) {
                    alert(data.msg);
                    location.href = "/main"
                }
                if(data.code === 500){
                    alert(data.msg);
                    location.href="/cart"
                }
                if (data.code === 200) {
                    alert("카카오페이가 떠야해");
                    IMP.request_pay({
                            pg: "kcp.{상점ID}",
                            pay_method: "card",
                            merchant_uid: generateUniqueNumber(),   // 주문번호
                            name: company_name,
                            amount: amount,                         // 숫자 타입
                            buyer_email: buyer_email,
                            buyer_name: buyer_name,
                            buyer_tel: buyer_phone,
                            buyer_addr: fullAddress,
                            buyer_postcode: "01181"
                        },
                        function (rsp:PaymentSuccessResponse) { // callback
                            if (rsp.success) {
                                console.log(data);
                                // sendData("/api/POST/payment", data2, paymentSuccess, null)
                                sendData("/api/POST/payment", data2)
                                paymentSuccess();
                            } else {
                                console.log(rsp);
                            }
                        });
                } else {
                    handlePaymentResponse(data);
                }
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
        console.log(amount)

        // 나머지 기존 코드
    }).catch(error => {
        console.error('Failed to initialize IMP:', error);
        toast.error('결제 모듈 초기화에 실패했습니다.');
    });
}

const paymentSuccess = () =>{
    location.href = "/cart"
}

async function sendData(url: string, data: PaymentData): Promise<void> {
    try {
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
    } catch (error) {
        console.error('Failed to send payment data:', error);
        throw error;
    }
}

function handlePaymentResponse(response: PaymentResponse): void {
    switch (response.code) {
        case 666:
            alert(response.msg);
            location.href = "/logins";
            break;
        case 400:
            alert(response.msg);
            location.href = "/main";
            break;
        case 500:
            alert(response.msg);
            location.href = "/cart";
            break;
    }
}


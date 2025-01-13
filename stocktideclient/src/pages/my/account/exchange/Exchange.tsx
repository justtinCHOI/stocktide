import { useParams } from 'react-router';
import ExchangeComponent from '@components/my/account/exchange/ExchangeComponent';

const Charge = () => {
    const {cashId} = useParams()

    return (
      <ExchangeComponent cashId={Number(cashId)}/>
    );
};

export default Charge;
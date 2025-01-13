import ChargeComponent from '@components/my/account/charge/ChargeComponent';
import { useParams } from 'react-router';

const Charge = () => {
  const {cashId} = useParams()

  return (
    <ChargeComponent cashId={Number(cashId)}/>
  );
};

export default Charge;
import ChatComponent from '@components/stock/domestic/detail/chat/ChatComponent';
import { useParams } from 'react-router';

function Chat() {

    const {companyId} = useParams();

    return (
          <ChatComponent companyId = {Number(companyId)}/>
    );
}

export default Chat;
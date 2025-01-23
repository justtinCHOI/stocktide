import {IncludeInformationDiv, OutletDiv} from "@styles/menu";
import LoginComponent from '@components/member/login/LoginComponent';

const Login = () => {
  return (
      <IncludeInformationDiv $top={2}>
        <OutletDiv>
            <LoginComponent/>
        </OutletDiv>
      </IncludeInformationDiv>
   );
}

export default Login;

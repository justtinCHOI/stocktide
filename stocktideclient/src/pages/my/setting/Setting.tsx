import {useParams} from "react-router";
import SettingComponent from '@components/my/setting/SettingComponent';

function Setting() {

    const {tno} = useParams()

    return (
        <div className="p-4 w-full bg-white  ">
            <div className="text-3xl font-extrabold">
                Todo SettingPage {tno}
            </div>
            <SettingComponent tno={Number(tno)} />
        </div>
    );
}

export default Setting;
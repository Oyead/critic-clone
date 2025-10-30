import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
function Profile() {
const { isLoggedIn, username } = useSelector((state: RootState) => state.auth);

  return (
    <div>
        {isLoggedIn && <p>hello,{username}</p>}
    </div>
  )
}

export default Profile
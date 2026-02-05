
import useUserStore from '../store/useUserStore'

const ProfilePage = () => {
    const currentUser = useUserStore((state) => (state.user));
    console.log(currentUser);
    return (
        <div>
            <h1>Profile Page</h1>
            <p>Username: {currentUser?.username}</p>
        </div>
    )
}

export default ProfilePage
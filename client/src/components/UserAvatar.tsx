import style from './UserAvatar.module.css';

type props = {
    imageSrc: string;
    username: string;
};

const UserAvatar = ({ imageSrc, username }: props) => {
    return (
        <div className={style.UserAvatar}>
            <span>{username}</span>
            <img src={imageSrc} alt="user profile"></img>
        </div>
    );
}

export default UserAvatar;
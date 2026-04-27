import getBackgroundColor from "../../utils/getBackgroundColor";

const Avatar = ({ username }) => {
    const bgColor = getBackgroundColor(username);
    const initial = username ? username.charAt(0).toUpperCase() : "?";

    return (
        <div 
            style={{ 
                backgroundColor: bgColor,
                width: '45px',
                height: '45px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                textTransform: 'uppercase'
            }}
        >
            {initial}
        </div>
    );
};

export default Avatar
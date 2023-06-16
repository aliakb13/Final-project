import './loader.css';

export default function LoadingCircle(props) {
    return (
        <div className={`load-wrapper ${props.styled}`}>
            <div className="follow-the-leader">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}
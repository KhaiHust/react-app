import { useEffect } from "react";
import { useState } from "react";

const CountDown = (props) => {
    const [count, setCount] = useState(300);
    String.prototype.toHHMMSS = function () {
        let sec_num = parseInt(this, 10); // don't forget the second param
        let hours = Math.floor(sec_num / 3600);
        let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        let seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) { hours = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }
        return hours + ':' + minutes + ':' + seconds;
    }
    useEffect(() => {
        if (count === 0) {
            props.onTimeUp();
            return;
        }
        const timer = setInterval(() => {
            setCount(count - 1);

        }, 1000);
        // setTimeout(() => {
        //     clearInterval(timer);
        // }, 5000)
        return () => {
            clearInterval(timer);
        }
    }, [count])
    return (
        <div className="count=container">
            {count.toString().toHHMMSS()}
        </div>
    )
}
export default CountDown;
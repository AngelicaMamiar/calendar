import React from "react";
import './Component-Calendar-Css.css';
const EventModal = ({event, onClose}) => {
    return (
        <div className="modal">
            <div className="modal-cotent">
                <h2>{event.title}</h2>
                <p>{event.desc}</p>
                <p>start: {event.start.toLocaleString()}</p>
                <p>end: {event.end.toLocaleString}</p>
               <button onClick={onClose}>close</button>
            </div>
        </div>
    )

}

export default EventModal;
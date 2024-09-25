import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import './components/Component-Calendar-Css.css';
import defaultEvents from "./components/DefaultEvents";
import EventModal from "./components/EventModal";



const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

function MyCalendar() {

    const [events, setEvents] = useState(defaultEvents);
    const [SelectedEvents, setSelectedEvents] = useState(null);

    const moveEvents = (data) => {
        const { start, end } = data;
        const updatedEvents = events.map((event) => {
            if (event.id === data.event.id) {
                return { 
                    ...event, 
                    start: new Date(start), 
                    end: new Date(end)
                };
            }
            return event;
        });

        setEvents(updatedEvents);
    }


    const handleEventClick = (event) => {
        setSelectedEvents(event);

    }

    const handleEventClose = () => {
        setSelectedEvents(null);
    }
   
    return (
        <div>
            <DragAndDropCalendar
                defaultDate={moment().toDate()}
                defaultView='month'
                events={events}
                localizer={localizer}
                resizable
                onEventDrop={moveEvents}
                onEventResize={moveEvents}

                onSelectEvent={handleEventClick}
                className='calendar'
            />
            {SelectedEvents && (
                <EventModal 
            event={SelectedEvents} 
            onClose={handleEventClose} 
            />
            )}
        </div>
    );
}

export default MyCalendar;

import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import './components/Component-Calendar-Css.css';
import defaultEvents from "./components/DefaultEvents";
import EventModal from "./components/EventModal";
import Add from "./components/add/add";

const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

function MyCalendar() {
    const [events, setEvents] = useState(defaultEvents);
    const [selectedEvents, setSelectedEvents] = useState(null);

    const eventStyle = (event) => ({
        style: {
            backgroundColor: event.color,
        },
    });

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
    };

    const handleEventClick = (event) => {
        setSelectedEvents(event);
    };

    const handleEventClose = () => {
        setSelectedEvents(null);
    };
   
    return (
        <div className="Screen">
            <div className="toolbar">
                <Add/>
            </div>

            <div className="calendar-container">
                <DragAndDropCalendar
                    defaultDate={moment().toDate()}
                    defaultView="month"
                    events={events}
                    localizer={localizer}
                    resizable
                    onEventDrop={moveEvents}
                    onEventResize={moveEvents}
                    onSelectEvent={handleEventClick}
                    eventPropGetter={eventStyle}
                    components={{
                        toolbar: CustomToolbar,
                    }}
                    className="calendar"
                />
            </div>

            {selectedEvents && (
                <EventModal 
                    event={selectedEvents} 
                    onClose={handleEventClose} 
                />
            )}
        </div>
    );
}

const CustomToolbar = ({ label, onView, onNavigate, views }) => {
   
    
    const [itemText, setItemText] = useState('month');

    const handleViewChange = (view) => {
        onView(view);
        setItemText(view);
    };

    return (
        <div className="toolbar-container">
            <h1 className="myYear">{label}</h1>

            <div className="topDirectory">
                <div className="dropdown">
                    <button 
                        className="btn btn-secondary dropdown-toggle" 
                        type="button" 
                        id="dropdownMenuButton" 
                        data-bs-toggle="dropdown" 
                        aria-expanded="false"
                    >
                        {itemText}
                    </button>

                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        {views.map((view, index) => (
                            <li key={index}>
                                <button 
                                    className="dropdown-item" 
                                    onClick={() => { handleViewChange(view); setItemText(view); }}>
                                    {view}
                                </button>
                            </li>
                        ))}
                        {views.length > 2 && <hr className='dropdown-divider' />} {/* Divider after third item */}
                    </ul>
                </div> 

                <div className="toolbar-navigation" style={{ marginLeft: '15px'}}> 
                    <button className='btn btn-secondary btn-ls mr-2 border-0' onClick={() => onNavigate('TODAY')}>today</button>
                    <button className='btn btn-sm mr-2 text-secondary' onClick={() => onNavigate('PREV')} style={{ marginLeft: '15px}'}}> <i className="bi bi-caret-left"></i></button>
                    <button className='btn btn-sm mr-2 text-secondary' onClick={() => onNavigate('NEXT')}> <i className="bi bi-caret-right"></i></button>
                </div>
            </div>
        </div>
    );
};

export default MyCalendar;

import React, { act, useState } from "react";
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

    const eventStyle = (event) => ({
        style: {
            backgroundColor: event.color,
        },
        
    })
    
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
        <div className="Screen">
            <div className="toolbar">
                <p>Calendar</p>

            </div>

        <div className="calendar-container">

        </div>
            <DragAndDropCalendar
                defaultDate={moment().toDate()}
                defaultView='month'
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

const CustomToolbar = ({label, onView, onNavigate, views}) => {
   const handleNavigate = (action) => {
       onNavigate(action);
       }
       const [itemText, setItemText] = useState('month');

    return (
        <div className="toolbar-container">
            <h1 className="myYear">{label}</h1>

            <div className="topDirectory">
                <div className="dropdown">
                    <button className='btn btn-secondary dropdown-toggle' type='button' id='dropdownMenuButton' data-bs-toogle='dropdown' aria-expanded='false'>
                         {itemText}
                    </button>
                    <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
                        {views.map((view,index) =>(
                            <div kay={index}>
                                <li>
                                    <button className='dropdown-item' onClick={()=>onView(view)}>{view}</button>
                                </li>
                               

                            </div>
                        ) )

                        }
                    </ul>
                        
                </div>  

            </div>
        </div>
        
    )
}
export default MyCalendar;

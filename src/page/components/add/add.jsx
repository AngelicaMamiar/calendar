import React, { useState } from 'react';
import { Button, Form, Row, Rom, Col, Collapse } from 'react-bootstrap';

function Add({ onAdd }) {
    const [newEvent, setNewEvent] = useState({
        title: '',
        start: '',
        end: '',
        desc: '',  
    });

    const [expanded, setExpanded] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewEvent({ ...newEvent, [name]: value });
    };

    const handleToggleExpanded = (e) => {
        e.stopPropagation();
        setExpanded(!expanded);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(newEvent);
        setNewEvent({
            title: '',
            start: '',
            end: '',
            desc: '',
          
        });
    };

    return (
        <div className="add p-3 rounded border border-white">
            <h3>Add events</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='formBasicTitle'>
                    <Form.Label>Title of event</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        placeholder="Enter the title"
                        value={newEvent.title}
                        onChange={handleChange}
                    />
                </Form.Group>
                {/* Add more form controls as needed */}
                <Row>
                    <Col xs={6}>
                        <Form.Group controlId="formBasicStart">
                            <Form.Label>
                                    Start
                            </Form.Label>
                                <Form.Control type="datetime-local" name="start" value={newEvent.start} onChange={handleChange}>
                                  </Form.Control>
                        </Form.Group>
                   </Col>
                   <Col xs={6}>
                   <Form.Group controlId="formBasicStart">
                            <Form.Label>
                                    End
                            </Form.Label>
                                <Form.Control type="datetime-local" name="end" value={newEvent.end} onChange={handleChange}>
                                  </Form.Control>
                        </Form.Group>
                   </Col>
                </Row>
                    <Collapse in={expanded}>
                        <div>
                            <div>
                                <Form.Group controlId='formBasicDesc'>
                                    <Form.Label>
                                        Descriptions
                                    </Form.Label>
                                    <Form.Control type='text' placeholder='Enter the description' name='desc' value={newEvent.desc} onChange={handleChange} >

                                    </Form.Control>
                                </Form.Group> 
                            </div>     
                            </div>
                    </Collapse>
                   
                  
            </Form>
        </div>
    );
}

export default Add;

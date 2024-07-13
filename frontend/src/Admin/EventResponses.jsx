import React from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Card, Button, message, Image } from 'antd';
import useGetAllEventResponses from "../hook/Events/useGetAllEventResponses";
import useGetSingleEvent from "../hook/Events/useGetSingleEvents";
import acceptResponse from "../hook/Events/acceptResponse";
import rejectResponse from "../hook/Events/rejectResponse";

const EventResponses = () => {
    const { id } = useParams();
    // const history = useHistory();
    const [event] = useGetSingleEvent(id);
    const [eventResponses] = useGetAllEventResponses(id);

    const handleAccept = async (responseId) => {
        try {
            await acceptResponse(responseId);
            message.success('Response accepted successfully!');
            // Optionally, refresh the list or update the state to reflect changes
        } catch (error) {
            message.error('Failed to accept response. Please try again.');
        }
    };

    const handleReject = async (responseId) => {
        try {
            await rejectResponse(responseId);
            message.success('Response rejected successfully!');
            // Optionally, refresh the list or update the state to reflect changes
        } catch (error) {
            message.error('Failed to reject response. Please try again.');
        }
    };

    if (!event) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div>
                <Button type="primary" onClick={() => history.goBack()} style={{ marginBottom: 16 }}>
                    Back
                </Button>
            </div>
            <span style={{fontWeight: 800, fontSize: 60}}>{event.event_title}</span>
            <Row gutter={16} style={{ marginBottom: 16 }}>
                <Col span={16}>
                    <Card>
                        <p><strong>Date:</strong> {event.date}</p>
                        <p><strong>Time:</strong> {event.date_and_time}</p>
                        <p><strong>Venue:</strong> {event.venue}</p>
                        <p><strong>Description:</strong></p>
                        <p>{event.description}</p>
                    </Card>
                </Col>
                <Col span={8}>
                    <Image src={event.photo} alt={event.event_title} width="100%" />
                </Col>
            </Row>
            <div className="response-list">
                {eventResponses.map(response => (
                    <Card
                        key={response.id}
                        title={response.name}
                        extra={
                            <div className="action-buttons">
                                <Button type="primary" onClick={() => handleAccept(response.id)} style={{ marginRight: 8 }}>
                                    Accept
                                </Button>
                                <Button type="danger" onClick={() => handleReject(response.id)}>
                                    Reject
                                </Button>
                            </div>
                        }
                        style={{ marginBottom: 16 }}
                    >
                        <p><strong>Email:</strong> {response.email}</p>
                        <p><strong>Phone:</strong> {response.phone}</p>
                        <p><strong>Amount:</strong> {response.amount}</p>
                        <p><strong>Transaction ID:</strong> {response.trxId}</p>
                        <p><strong>Comment:</strong> {response.comment}</p>
                        <p><strong>Status:</strong> {response.status}</p>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default EventResponses;

import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import api from '../../api/axiosConfig';
import ReviewForm from '../reviewForm/Form';

const Reviews = ({ getMovieData, movie, reviews: propReviews, setReviews }) => {
    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;

    // Initialize local state for reviews if not provided by props
    const [localReviews, setLocalReviews] = useState(propReviews || []);

    useEffect(() => {
        getMovieData(movieId);
    }, [movieId, getMovieData]);

    useEffect(() => {
        if (Array.isArray(propReviews)) {
            setLocalReviews(propReviews);
        }
    }, [propReviews]);

    const addReview = async (e) => {
        e.preventDefault();
        const rev = revText.current;
        try {
            const response = await api.post("/api/v1/reviews", { reviewBody: rev.value, imdbId: movieId });
            console.log('API response:', response);

            // Ensure reviews is always an array
            const updatedReviews = Array.isArray(localReviews) ? [...localReviews, { body: rev.value }] : [{ body: rev.value }];
            console.log('Updated reviews:', updatedReviews);

            rev.value = "";
            setLocalReviews(updatedReviews);
            setReviews(updatedReviews);
        } catch (err) {
            console.error('Error adding review:', err);
        }
    };

    return (
        <Container>
            <Row>
                <Col><h3>Reviews</h3></Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <img src={movie?.poster} alt="Movie Poster" />
                </Col>
                <Col>
                    <Row>
                        <Col>
                            <ReviewForm 
                                handleSubmit={addReview} 
                                revText={revText} 
                                labelText="Write a Review?" 
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <hr />
                        </Col>
                    </Row>
                    {Array.isArray(localReviews) && localReviews.map((r, index) => (
                        <React.Fragment key={index}>
                            <Row>
                                <Col>{r.body}</Col>
                            </Row>
                            <Row>
                                <Col>
                                    <hr />
                                </Col>
                            </Row>
                        </React.Fragment>
                    ))}
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
        </Container>
    );
};

export default Reviews;

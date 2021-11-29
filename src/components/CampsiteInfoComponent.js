import React from "react";
import { Card, CardBody, CardText, CardImg, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            author: '',
            touched: {
                author: false
            }
        };
        this.toggleModal = this.toggleModal.bind(this);
        // this.handleComment = this.handleComment.bind(this);
    }

        toggleModal() {
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }

        // handleComment(values) {
        //     console.log("Comments Modal Submitted: " + JSON.stringify(values));
        //     alert("Comments Modal Submitted: " + JSON.stringify(values));
        // }

        render() {
            return (
                <>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader>Submit Comment</ModalHeader>
                        <ModalBody toggle={this.toggleModal}>
                            <LocalForm onSubmit={this.handleComment}>
                                <div className="form-group">
                                    <Label htmlFor="rating">Rating</Label>
                                    <Control.select 
                                    model='.rating' 
                                    id='rating' 
                                    name='rating' 
                                    className='form-control'>
                                        <option name='rating' value='1'>1</option>
                                        <option name='rating' value='2'>2</option>
                                        <option name='rating' value='3'>3</option>
                                        <option name='rating' value='4'>4</option>
                                        <option name='rating' value='5'>5</option>
                                    </Control.select>
                                </div>
                                <div className="form-group">
                                    <Label htmlFor="author">Your Name</Label>
                                    <Control.text 
                                    model=".author" 
                                    id="author" 
                                    name="author"
                                    className="form-control" />
                                </div>
                                <div className="form-group">
                                    <Label htmlFor="text">Comment</Label>
                                    <Control.textarea 
                                    model=".comment" 
                                    id="comment" 
                                    name="comment" 
                                    className="form-control"
                                    rows='6' />
                                </div>
                                <Button type='submit' value='submit' color='primary' onClick={this.handleComment} toggle={this.toggleModal}>Submit</Button>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                    <Button outline onClick={this.toggleModal}><i className="fa fa-pencil fa-lg" />Submit Comment</Button>
                </>
            );
        }
    }


function RenderCampsite({ campsite }) {
    return (
        <div className="col-md-5 m-1">
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

function RenderComments({ comments }) {
    if (comments) {
        return (
            <div className="col-md-5 m-1">
                <h4>Comments</h4>
                {comments.map((comment) => {
                    return (
                        <div key={comment.id}>
                            <div>{comment.text}</div>
                            <div>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))} </div>
                            <br></br>
                        </div>
                    );
                })}
                <CommentForm />
            </div>
        );
    } return <div />
}

function CampsiteInfo(props) {
    if (props.campsite) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        );
    }
    return <div></div>
}

export default CampsiteInfo;
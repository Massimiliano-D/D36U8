import { Component } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";

class CommentArea extends Component {
  state = {
    comments: [],
    isLoading: true,
    isError: false,
  };

  componentDidMount = async () => {
    try {
      let response = await fetch("https://striveschool-api.herokuapp.com/api/comments/", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGY5ZGRhMjhkM2Q0OTAwMTRjZmQ4MzEiLCJpYXQiOjE2OTQwOTcxMzgsImV4cCI6MTY5NTMwNjczOH0.rwxIt9OW3IQ4PxTLsPRKYMYCNqIYhGtQ2_mYLiL-IDk",
        },
      });
      console.log(response);
      if (response.ok) {
        let comments = await response.json();
        const filteredComments = comments.filter((comment) => comment.elemntId === this.props.asin);
        this.setState({ comments: filteredComments, isLoading: false, isError: false });
      } else {
        console.log("error");
        this.setState({ isLoading: false, isError: true });
      }
    } catch (error) {
      console.log(error);
      this.setState({ isLoading: false, isError: true });
    }
  };

  render() {
    return (
      <div className="text-center">
        {this.state.isLoading && <Loading />}
        {this.state.isError && <Error />}
        <AddComment asin={this.props.asin} />
        <CommentList comments={this.state.comments} />
      </div>
    );
  }
}

export default CommentArea;

import CreatePost from "../../components/CreatePost/CreatePost";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Modal } from "@material-ui/core";
import { selectMyLocation } from "../../store/location/selector";
import { fetchPostsWithMyLocation } from "../../store/posts/actions";
import { selectPosts } from "../../store/posts/selectors";
import Post from "./Post";
import "./index.css";
import { selectToken } from "../../store/user/selector";

export default function MainPage() {
  const dispatch = useDispatch();

  // states
  const [CPVisibility, setCPVisibility] = useState(false); // CP = create post

  // redux selectors
  const location = useSelector(selectMyLocation);
  const posts = useSelector(selectPosts);
  const userToken = useSelector(selectToken);

  useEffect(() => {
    if (location) dispatch(fetchPostsWithMyLocation(location));
  }, [location, dispatch]);

  return (
    <>
      <div className="container">
        <Button onClick={() => setCPVisibility(true)} disabled={!userToken}>
          Create Post
        </Button>
        <div className="posts">
          <Grid container spacing={3}>
            {posts.length > 0 &&
              posts.map((post) => <Post key={post.id} post={post} />)}
          </Grid>
        </div>
      </div>
      <Modal open={CPVisibility} onClose={() => setCPVisibility(false)}>
        <CreatePost
          location={location}
          closeModal={() => setCPVisibility(false)}
        />
      </Modal>
    </>
  );
}

import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Post from "./Post";

function Posts({ posts }) {
  const [realtimePosts] = useCollection(
    db.collection("posts").orderBy("timestamp", "desc")
  );

  return (
    <div>
      {realtimePosts
        ? realtimePosts?.docs.map((post) => (
            <Post
              key={post.id}
              message={post.data().message}
              name={post.data().name}
              image={post.data().image}
              postImage={post.data().postImage}
              email={post.data().email}
              timestamp={post.data().timestamp}
            />
          ))
        : posts?.map((post) => (
            <Post
              key={post.id}
              message={post.message}
              name={post.name}
              image={post.image}
              postImage={post.postImage}
              email={post.email}
              timestamp={post.timestamp}
            />
          ))}
    </div>
  );
}

export default Posts;

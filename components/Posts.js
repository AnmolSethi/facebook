import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Post from "./Post";

function Posts() {
  const [realtimePosts, loading, error] = useCollection(
    db.collection("posts").orderBy("timestamp", "desc")
  );

  return (
    <div>
      {realtimePosts.docs.map((post) => (
        <Post
          key={post.id}
          message={post.data().message}
          name={post.data().name}
          image={post.data().image}
          postImage={post.data().postImage}
          email={post.data().email}
          timestamp={post.data().timestamp}
        />
      ))}
    </div>
  );
}

export default Posts;

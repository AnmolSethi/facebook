import Stories from "./Stories";
import InputBox from "./InputBox";
import Posts from "./Posts";

function Feed({ posts }) {
  return (
    <div
      className="flex-grow h-screen pb-44 pt-6 
      p-4 xl:mr-40 overflow-y-auto scrollbar-hide"
    >
      <div className="mx-auto max-w-sm md:max-w-lg lg:max-w-2xl">
        <Stories />
        <InputBox />
        <Posts posts={posts} />
      </div>
    </div>
  );
}

export default Feed;

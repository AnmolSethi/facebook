import { useSession } from "next-auth/client";
import Image from "next/image";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/solid";
import { useRef, useState } from "react";
import { db, storage } from "../firebase";
import firebase from "firebase";

function InputBox() {
  const [session, loading] = useSession();
  const inputRef = useRef(null);
  const filepickerRef = useRef(null);
  const [imageToPost, setImageToPost] = useState(null);
  const postRef = db.collection("posts");

  const sendPost = (e) => {
    e.preventDefault();

    if (!inputRef.current.value) return;

    postRef
      .add({
        message: inputRef.current.value,
        name: session.user.name,
        image: session.user.image,
        email: session.user.email,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((doc) => {
        if (imageToPost) {
          const uploadtask = storage
            .ref(`posts/${doc.id}`)
            .putString(imageToPost, "data_url");

          removeImage();

          uploadtask.on(
            "state_change",
            null,
            (err) => console.error(err),
            () => {
              storage
                .ref(`posts/${doc.id}`)
                .getDownloadURL()
                .then((url) => {
                  postRef.doc(doc.id).set({ postImage: url }, { merge: true });
                });
            }
          );
        }
      });

    inputRef.current.value = "";
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    };
  };

  const removeImage = () => {
    setImageToPost(null);
  };

  return (
    <div className="bg-white rounded-2xl p-2 shadow-md text-gray-500 font-medium mt-6">
      <div className="flex space-x-2 p-4 items-center">
        <Image
          className="rounded-full"
          src={session.user.image}
          width={40}
          height={40}
          layout="fixed"
        />
        <form className="flex flex-1">
          <input
            ref={inputRef}
            className="rounded-full h-12 bg-gray-100 flex-grow px-5 
            focus:outline-none focus:text-black focus:font-semibold"
            type="text"
            placeholder={`What's on your mind, ${session.user.name}?`}
          />
          <button hidden type="submit" onClick={sendPost}>
            Submit
          </button>
        </form>

        {imageToPost && (
          <div
            className="flex flex-col hover:brightness-110 
            transition duration-150 transform hover:scale-105 cursor-pointer"
            onClick={removeImage}
          >
            <img className="h-10 object-contain" src={imageToPost} />
            <p className="text-red-500 text-xs text-center">Remove</p>
          </div>
        )}
      </div>

      <div className="flex justify-evenly p-3 border-t">
        <div className="inputIcon">
          <VideoCameraIcon className="h-7 text-red-500" />
          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
        </div>

        <div
          className="inputIcon"
          onClick={() => filepickerRef.current.click()}
        >
          <CameraIcon className="h-7 text-green-500" />
          <p className="text-xs sm:text-sm xl:text-base">Photo</p>
          <input
            ref={filepickerRef}
            hidden
            onChange={addImageToPost}
            type="file"
          ></input>
        </div>

        <div className="inputIcon">
          <EmojiHappyIcon className="h-7 text-yellow-500" />
          <p className="text-xs sm:text-sm xl:text-base">Activity</p>
        </div>
      </div>
    </div>
  );
}

export default InputBox;

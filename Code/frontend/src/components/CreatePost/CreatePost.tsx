import { useState } from "react";
import CreatePostButton from "./CreatePostButton";
import CreatePostTextBox from "./CreatePostTextBox";
import CreatePostTitle from "./CreatePostTitle";

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    return (
        <>
            <CreatePostTitle titleText={title} setTitleText={setTitle} />

            <CreatePostTextBox bodyText={body} setBodyText={setBody} />

            <CreatePostButton
                titleText={title}
                bodyText={body}
                path="/screens/TabOneScreen.tsx"
            />
        </>
    );
};

export default CreatePost;

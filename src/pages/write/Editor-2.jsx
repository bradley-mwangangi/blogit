import React, {useRef, useState} from "react";
import {Form} from "react-bootstrap";
import useAutosizeTextArea from "../../components/autoSize-textarea/useAutosizeTextArea";
import "react-quill/dist/quill.snow.css";
import quill from "quill";

const Editor2 = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const titleRef = useRef(null);
    const bodyRef = useRef(null);

    useAutosizeTextArea(titleRef.current, title);
    useAutosizeTextArea(bodyRef.current, body);

    const handleTitleChange = (evt) => {
        const val = evt.target?.value;
        setTitle(val);
    };

    const handleBodyChange = (evt) => {
        const val = evt.target?.value;
        setBody(val);
    };

    // const handleBodyChange = (value) => {
    //     setBody(value);
    // };

    const publishArticle = () => {
        if (quill) {
            // Get the content of the Quill editor
            const quillContent = quill.getContents();

            // Log the Quill content to the console
            console.log("Quill Content:", quillContent);
        }
    };

    return (
        <div className="page-container">
            <div className="article-editor">
                <Form className="editor-form">
                    <Form.Group className="form-group">
                        <textarea
                            className="text-area title"
                            id="text-area-title"
                            placeholder="Article Title"
                            style={{
                                maxWidth: "700px",
                                resize: "none",
                                overflowY: "hidden",
                                border: "none",
                                outline: "none",
                            }}
                            onChange={handleTitleChange}
                            ref={titleRef}
                            rows={1}
                            value={title}
                        />
                        <input type="file"/>
                        {/*<ReactQuill*/}
                        {/*    // className="custom-quill-editor"*/}
                        {/*    theme="snow"*/}
                        {/*    value={body}*/}
                        {/*    onChange={handleBodyChange}*/}
                        {/*    placeholder="Type something"*/}
                        {/*    modules={{*/}
                        {/*        toolbar: [*/}
                        {/*            [{ header: [1, 2, 3, 4, 5, 6, false] }],*/}
                        {/*            ["bold", "italic", "underline", "strike"],*/}
                        {/*            [{ list: "ordered" }, { list: "bullet" }],*/}
                        {/*            ["link", "image"],*/}
                        {/*            ["clean"],*/}
                        {/*        ],*/}
                        {/*    }}*/}
                        {/*/>*/}
                        <textarea
                            className="text-area body"
                            id="text-area-body"
                            placeholder="Article body"
                            style={{
                                maxWidth: "700px",
                                resize: "none",
                                overflowY: "hidden",
                                border: "none",
                                outline: "none",
                            }}
                            onChange={handleBodyChange}
                            ref={bodyRef}
                            rows={1}
                            value={body}
                        />
                    </Form.Group>
                    <button className="publish-btn" onClick={publishArticle}>
                        Publish
                    </button>
                </Form>
            </div>
        </div>
    );
};

export default Editor2;

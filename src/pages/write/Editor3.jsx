import React, {useState} from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from "react-quill";
import ChipInput from "../../components/chip-input/chipInput";

const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        // [{ font: [] }],
        // [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean'],
    ],
};

const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
    'clean'
];

const Editor3 = () => {
    const [title, setTitle] = useState('');
    const [files, setFiles] = useState('');
    const [tags, setTags] = useState([]);
    const [content, setContent] = useState('');

    function createNewPost(ev) {
        ev.preventDefault();

        const data = new FormData();
        data.set('title', title);
        data.set('file', files[0]);
        data.set('tags', tags.join(","));
        data.set('content', content);

        console.log(files);

        fetch ('http://localhost:8080//api/v1/articles/create-article', {
            method: 'POST',
            body: data,
        });
    }

    return (
        <form onSubmit={createNewPost}>
            <input type="title"
                   placeholder={'Title'}
                   value={title}
                   onChange={ev => setTitle(ev.target.value)}
            />

            <input type="file"
                   onChange={ev => setFiles(ev.target.files)}
            />

            <ChipInput value={tags} onChange={setTags} />

            <ReactQuill value={content}
                        onChange={newValue => setContent(newValue)}
                        modules={modules}
                        formats={formats}
            />
            <button style={{marginTop: '5px'}}>Publish</button>
        </form>
    );
};

export default Editor3;

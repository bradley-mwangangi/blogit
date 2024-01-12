import './Editor.css';
import React, {useEffect, useState} from 'react';
import {Form} from "react-bootstrap";

const Editor = () => {
    const [inputs, setInputs] = useState([
        { id: 1, type: 'title', placeholder: 'Article title' },
        { id: 2, type: 'content', placeholder: 'Type a paragraph...' },
    ]);

    const adjustTextareaHeight = (index) => {
        const textarea = document.getElementById(`writeInput${index}`);
        if (textarea) {
            textarea.style.height = inputs[index].height;
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    const addInput = (index) => {
        const newInputs = [...inputs];
        newInputs.splice(index + 1, 0, { id: Date.now(), type: 'content', placeholder: 'Type a paragraph...' });
        setInputs(newInputs);
    };

    const deleteInput = (index) => {
        if (inputs.length > 2) {
            const newInputs = [...inputs];
            newInputs.splice(index, 1);
            setInputs(newInputs);
            const prevInputIndex = index - 1;
            if (prevInputIndex >= 0) {
                const prevTextarea = document.getElementById(`writeInput${prevInputIndex}`);
                if (prevTextarea) {
                    prevTextarea.focus();
                    adjustTextareaHeight(prevInputIndex);
                }
            }
        }
    };

    const handleKeyPress = (event, index) => {
        const textarea = document.getElementById(`writeInput${index}`);
        const value = textarea.value;

        if (event.key === 'Enter') {
            event.preventDefault();

            const nextInputIndex = index + 1;

            // Check if there is another text area after the current one
            if (nextInputIndex < inputs.length) {
                const nextTextarea = document.getElementById(`writeInput${nextInputIndex}`);
                if (nextTextarea) {
                    nextTextarea.focus();
                }
            } else {
                addInput(index);
                const newInputIndex = index + 1;
                const newTextarea = document.getElementById(`writeInput${newInputIndex}`);
                if (newTextarea) {
                    newTextarea.focus();
                }
            }
        } else if (event.key === 'Backspace') {
            if (textarea.selectionStart === 0 && textarea.selectionEnd === 0) {
                event.preventDefault();

                if (value === '') {
                    deleteInput(index);
                } else {
                    const prevInputIndex = index - 1;
                    if (prevInputIndex >= 0) {
                        const prevTextarea = document.getElementById(`writeInput${prevInputIndex}`);
                        if (prevTextarea) {
                            prevTextarea.focus();
                            prevTextarea.value += value;
                            prevTextarea.setSelectionRange(prevTextarea.value.length, prevTextarea.value.length);
                            adjustTextareaHeight(prevInputIndex);
                        }
                    }
                }
            }
        } else {
            // Adjust textarea height when typing
            adjustTextareaHeight(index);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            // Adjust textarea height on window resize
            inputs.forEach((_, index) => adjustTextareaHeight(index));
        };
        // Focus on the last input field on component mount
        const lastInputIndex = inputs.length - 1;
        const lastTextarea = document.getElementById(`writeInput${lastInputIndex}`);
        if (lastTextarea) {
            lastTextarea.focus();
        }

        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [inputs]);

    return (
        <div className="page-container">
            <div className="article-editor">
                <Form className="editor-form">
                    {inputs.map((input, index) => (
                        <Form.Group className="form-group" key={input.id}>
                            <textarea
                                className={`text-area ${input.type}`}
                                id={`writeInput${index}`}
                                placeholder={input.placeholder}
                                style={{
                                    maxWidth: '700px',
                                    resize: 'none',
                                    overflowY: 'hidden',
                                    border: 'none',
                                    outline: 'none',
                                }}
                                rows={1}
                                onKeyDown={(event) => handleKeyPress(event, index)}
                                onInput={() => adjustTextareaHeight(index)}
                            />
                        </Form.Group>
                    ))}
                    <button className="publish-btn">Publish</button>
                </Form>
            </div>
        </div>
    );
};

export default Editor;

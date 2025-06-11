import React, {useState, useRef} from 'react';
import { useOutletContext } from "react-router-dom";
import PropTypes from 'prop-types';


export default function TextForm() {
    // const {heading, mode, showAlert} = props; // Destructuring props for heading and mode
    const {heading, mode, showAlert} = useOutletContext();

    // State to hold the text input
    const [text, setText] = useState("Enter text here");

    // useRef to persist the last key pressed across renders
    const lastKeyRef = useRef(""); 

    //Covert to lower case
    const handleLowClick = () => {
        setText(text.toLowerCase());
    }

    //Convert to uppercase
    const handleUpClick = () => {
        setText(text.toUpperCase());
    }

    //Listen to changes in the textarea
    const handleOnChange = (event) => {
        setText(event.target.value);
    }

    // Handle keydown events for special functionality
    const handleKeyDown = (event) => {
        // let lastKey = ""; // Variable to store the last key pressed
        let key = event.key.toLowerCase();
        if (key === "u" || key ==="l") {
            lastKeyRef.current = key; // store persistently
        }
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent form submission on Enter key
            if (event.ctrlKey) {
                event.preventDefault(); // Prevent form submission on Enter key
                const textarea = event.target;
                const { selectionStart, selectionEnd } = textarea;

                const newText =
                    text.substring(0, selectionStart) +
                    "\n" +
                    text.substring(selectionEnd);

                setText(newText);

                // Set cursor after the newline
                setTimeout(() => {
                    textarea.selectionStart = textarea.selectionEnd = selectionStart + 1;
                }, 0);
            }
            else if (lastKeyRef.current === "u") {
            event.preventDefault(); // Prevent form submission on Enter key
            handleUpClick(); // Call the function to convert text to uppercase
            }
            else if (lastKeyRef.current === "l") {
                event.preventDefault(); // Prevent form submission on Enter key
                handleLowClick(); // Call the function to convert text to lowercase
            }
            lastKeyRef.current = ""; // reset after enter
        }
    }

    // Copy text to clipboard
    const handleCopy = () => {
        let trimmedText = text.trim().replace(/\s+/g, ' ');
        setText(trimmedText); // update the state
        navigator.clipboard.writeText(trimmedText) // copy to clipboard
        
        //SHow alert upon copy
        showAlert("Copied to clipboard.", "success");
    }

    // Remove extra spaces
    const handleExtraSpace = () => {
        let newText = text.split(/[ ]+/).join(" "); // replace multiple spaces with a single space
        setText(newText.trim()); // update the state and remove leading/trailing spaces
    }

    // Reset the text area
    const handleResetClick = () => {
        setText("");
    }


    return (
        <>
            <div className='container my-2'>
                <h1>{heading}</h1>
                <hr className='mx-3 border border-secondary'/>
                <div className={`form-group my-2 py-3 px-4 border border-${mode.theme==="dark"?"success":"black"} rounded-lg`}>
                    <textarea className="form-control my-2 shadow p-3 mb-5 rounded" name="myBox" id="myBox" rows="8" value={text} onChange={handleOnChange} onKeyDown={handleKeyDown} style={{backgroundColor: mode.theme === "dark"?"#343a40":"white", color: mode.theme==="dark"?"white":"black"}} ></textarea>
                    <button disabled={text.length===0} type="button" className="btn btn-info mx-2 my-1 shadow" id="upButton" name='upButton' onClick={handleUpClick}>UpperCase</button>
                    <button disabled={text.length===0} type="button" className="btn btn-info mx-2 my-1 shadow" id="lowButton" name='lowButton' onClick={handleLowClick}>LowerCase</button>
                    <button disabled={text.length===0} type="button" className="btn btn-info mx-2 my-1 shadow" id="copyButton" name='copyButton' onClick={handleCopy}>Copy</button>
                    <button disabled={text.length===0} type="button" className="btn btn-info mx-2 my-1 shadow" id="extraSpaceButton" name='extraSpaceButton' onClick={handleExtraSpace}>Remove extra space</button>
                    <button disabled={text.length===0} type="button" className="btn btn-light my-1 border border-dark mx-5 shadow" id="resetButton" name='resetButton' onClick={handleResetClick}>Reset</button>
                </div>
            </div>
            <div className="container my-2">
                <h2>Your text summary</h2>
                <p>{text.split(" ")[0]===""?"0":text.split(" ").length} words and {text.length} characters</p>
                <p>{(0.08*text.split(" ").length).toFixed(2)} Minutes to read this !</p>
                <hr className={`border border-${mode.theme==="dark"?"success":"black"}`}/>
                <h2>Preview</h2>
                <p>{text.length>0?text:"Enter something in the textbox above to preview it here"}</p>
            </div>
        </>
    )
}

TextForm.propTypes = {
    heading: PropTypes.string.isRequired,
    mode: PropTypes.shape({
        theme: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        classNameAttribute: PropTypes.string.isRequired
    }).isRequired,
    showAlert: PropTypes.func.isRequired
}

TextForm.defaultProps = {
    heading: 'Set Heading Here',
    mode: {
        theme: 'light',
        text: 'Dark Mode',
        classNameAttribute: 'text-black'
    },
    showAlert: () => {}
}
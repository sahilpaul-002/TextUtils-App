import React, {useState, useEffect} from 'react'
import { useOutletContext } from "react-router-dom";
import PropTypes from 'prop-types';

export default function About() {
    const { mode } = useOutletContext();

    // State to track expansion of all cards at once
    const [expandAll, setExpandAll] = useState(false);

    // State for individual cards
    const [expandedCards, setExpandedCards] = useState({
        card1: false,
        card2: false,
        card3: false
    });

    // Toggle all cards
    const handleExpandAll = () => {
        setExpandAll(prev => !prev);

        // Expand/collapse individual cards based on global state
        setExpandedCards({
            card1: !expandAll,
            card2: !expandAll,
            card3: !expandAll
        });
    };

    // Toggle individual cards
    const handleExpandCard = (cardKey) => {
        setExpandedCards(prev => ({
            ...prev,
            [cardKey]: !prev[cardKey]
        }));
    };

    //Logic for smooth transition of expanding / collapsing of the cards
    const btnStyleCheck = () => {
        if (expandAll && (expandedCards.card1===false || expandedCards.card2===false || expandedCards.card3===false))
        {
            return "btn btn-info";
        }
        else if (expandAll || (expandedCards.card1 && expandedCards.card2 && expandedCards.card3))
        {
            return "btn btn-success";
        }
        else if (expandAll === false || (expandedCards.card1===false && expandedCards.card2===false && expandedCards.card3===false))
        {
            return "btn btn-info";
        }
    }
    //Logic for text of the button on expanding / collapsing of the cards
    const btnTextCheck = () => {
        if (expandAll === true && (expandedCards.card1===false || expandedCards.card2===false || expandedCards.card3===false))
        {
            return "Expand All";
        }
        else if (expandAll || (expandedCards.card1 && expandedCards.card2 && expandedCards.card3))
        {
            return "Collapse All";
        }
        else if (expandAll === false || (expandedCards.card1===false && expandedCards.card2===false && expandedCards.card3===false))
        {
            return "Expand All";
        }
    }

    // Change of state of expandAll in effect of the respective conditions
    useEffect(() => {
        if (expandedCards.card1 && expandedCards.card2 && expandedCards.card3)
        {
            setExpandAll(true);
        }
        else if (expandedCards.card1===false || expandedCards.card2===false || expandedCards.card3===false)
        {
            setExpandAll(false);
        }
    }, [expandedCards.card1, expandedCards.card2, expandedCards.card3]);

    //Card style for dark and light mode
    const outerCardStyle = {
        backgroundColor: mode.theme === "dark" ? "#343a40" : "#CAE8BD",
        color: mode.theme === "dark" ? "white" : "black",
        border: mode.theme === "dark" ? "2px solid white" : "2px solid black",
    };

    //Card style for dark and light mode
    const innerCardStyle = {
        backgroundColor: mode.theme === "dark" ? "#343a40" : "#CAE8BD",
        color: mode.theme === "dark" ? "white" : "black",
        // border: mode.theme === "dark" ? "1px solid green" : "1px solid black",
    };
    // Card body style
    const bodyCardStyle = {
        backgroundColor: mode.theme === "dark" ? "#254D70" : "#9FC87E",
        color: mode.theme === "dark" ? "white" : "black"
    }
    return (
        <div className="container py-5 px-5 rounded" style={outerCardStyle}>
            <h2 className="my-3">About Us</h2>
            <div className="accordion" id="accordionExample">

                {/* Card 1 */}
                <div className="card my-1" style={innerCardStyle}>
                    <div className="card-header">
                        <h2 className="mb-0">
                            <button
                                className="btn btn-light"
                                type="button"
                                onClick={() => handleExpandCard("card1")} style={innerCardStyle}
                            >
                                Enhance Your Text Editing Experience
                            </button>
                        </h2>
                    </div>
                    {expandedCards.card1 && (
                        <div className="collapse show" style={bodyCardStyle}>
                            <div className="card-body">
                                TextUtils simplifies text manipulation with powerful tools at your fingertips. Whether you need to format, count words, convert cases, or remove extra spaces, our intuitive interface makes it effortless. Improve readability and efficiency in just a few clicks!
                            </div>
                        </div>
                    )}
                </div>

                {/* Card 2 */}
                <div className="card my-1" style={innerCardStyle}>
                    <div className="card-header">
                        <h2 className="mb-0">
                            <button
                                className="btn btn-light"
                                type="button"
                                onClick={() => handleExpandCard("card2")} style={innerCardStyle}
                            >
                                Analyze & Optimize Your Content
                            </button>
                        </h2>
                    </div>
                    {expandedCards.card2 && (
                        <div className="collapse show" style={bodyCardStyle}>
                            <div className="card-body">
                                Need quick insights on your text? TextUtils provides word count, character count, and reading time estimations to help you refine your content. Whether you're crafting blogs, writing emails, or coding, precision matters—let TextUtils handle the details.
                            </div>
                        </div>
                    )}
                </div>

                {/* Card 3 */}
                <div className="card my-1" style={innerCardStyle}>
                    <div className="card-header">
                        <h2 className="mb-0">
                            <button
                                className="btn btn-light"
                                type="button"
                                onClick={() => handleExpandCard("card3")} style={innerCardStyle}
                            >
                                Convert, Clean & Format Text with Ease
                            </button>
                        </h2>
                    </div>
                    {expandedCards.card3 && (
                        <div className="collapse show" style={bodyCardStyle}>
                            <div className="card-body">
                                Say goodbye to manual text adjustments! TextUtils lets you transform your content by converting uppercase/lowercase, cleaning up unnecessary spaces, and ensuring perfect formatting. Save time and focus on what truly matters—your message!
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Expand All Button */}
            <div className="container my-3">
                <button
                    type="button"
                    // className={expandAll || (expandedCards.card1 && expandedCards.card2 && expandedCards.card3) ? "btn btn-success" : "btn btn-warning"}
                    className={btnStyleCheck()}
                    onClick={handleExpandAll} >
                    {/* {expandAll || (expandedCards.card1 && expandedCards.card2 && expandedCards.card3) ? "Collapse All" : "Expand All"} */}
                    {btnTextCheck()}
                </button>
            </div>
        </div>
    );
}

About.propTypes = {
    mode: PropTypes.shape({
        theme: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        classNameAttribute: PropTypes.string.isRequired
    }).isRequired
}

About.defaultProps = {
    mode: {
        theme: 'light',
        text: 'Dark Mode',
        classNameAttribute: 'text-black'
    }
}
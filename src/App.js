import React, { useState } from "react";

const App = () => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [answerType, setAnswerType] = useState("text");
  const [options, setOptions] = useState([
    { placeholder: "", min: "", max: "", rows: "", label: "" },
    { placeholder: "", min: "", max: "", rows: "", label: "" },
  ]);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "questionTitle") {
      setQuestionTitle(value);
    } else if (name === "answerType") {
      setAnswerType(value);
    }
  };

  const handleOptionChange = (index, field, value) => {
    const updatedOptions = [...options];
    updatedOptions[index][field] = value;
    setOptions(updatedOptions);
  };

  const addOption = () => {
    setOptions([...options, { placeholder: "", min: "", max: "", rows: "", label: "" }]);
  };

  const removeOption = (index) => {
    if (options.length > 1) {
      const updatedOptions = options.filter((_, i) => i !== index);
      setOptions(updatedOptions);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Log form values to the console
    console.log("Question Title:", questionTitle);
    console.log("Answer Type:", answerType);

    // Loop through the options array and log each option's details
    options.forEach((option, index) => {
      console.log(`Option ${index + 1}:`);
      console.log("  Placeholder:", option.placeholder);
      console.log("  Min:", option.min);
      console.log("  Max:", option.max);
      console.log("  Rows:", option.rows);
      console.log("  Label:", option.label);
    });

    // Show success message
    setSuccessMessage("Form submitted successfully!");

    // Reset form after 2 seconds (to allow the success message to be visible for a brief period)
    setTimeout(() => {
      setSuccessMessage(""); // Clear success message
      setQuestionTitle("");  // Reset question title
      setAnswerType("text"); // Reset answer type to the default
      setOptions([{ placeholder: "", min: "", max: "", rows: "", label: "" }]); // Reset options to initial state
    }, 2000);
  };

  const renderAnswerInput = () => {
    switch (answerType) {
      case "text":
        return <input type="text" placeholder="Enter text" />;
      case "textarea":
        return <textarea rows="4" placeholder="Enter your answer"></textarea>;
      case "select":
        return (
          <select>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        );
      case "none":
        return <input type="hidden" />;
      case "number":
        return <input type="number" placeholder="Enter a number" />;
      case "slider":
        return <input type="range" min="0" max="100" />;
      case "checkbox":
        return <input type="checkbox" />;
      case "radio":
        return (
          <>
            <input type="radio" name="option" value="option1" /> Option 1
            <input type="radio" name="option" value="option2" /> Option 2
          </>
        );
      default:
        return <input type="text" />;
    }
  };

  return (
    <div className="form-container">
      <h2>Add Question</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="question-title">Question Title</label>
          <input
            type="text"
            id="question-title"
            name="questionTitle"
            value={questionTitle}
            onChange={handleInputChange}
            placeholder="Question Title"
          />
        </div>

        <div>
          <label htmlFor="answer-type">Answer Type</label>
          <select
            id="answer-type"
            name="answerType"
            value={answerType}
            onChange={handleInputChange}
          >
            <option value="text">Text</option>
            <option value="textarea">Textarea</option>
            <option value="select">Select</option>
            <option value="none">None</option>
            <option value="number">Number</option>
            <option value="slider">Slider</option>
            <option value="checkbox">Checkbox</option>
            <option value="radio">Radio</option>
          </select>
        </div>

        {renderAnswerInput()}

        {options.map((option, index) => (
          <div className="option" key={index}>
            <div className="option-fields">
              <input
                type="text"
                placeholder="Placeholder"
                value={option.placeholder}
                onChange={(e) => handleOptionChange(index, "placeholder", e.target.value)}
              />
              {answerType === "textarea" && (
                <>
                  <input
                    type="number"
                    placeholder="Min"
                    value={option.min}
                    onChange={(e) => handleOptionChange(index, "min", e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={option.max}
                    onChange={(e) => handleOptionChange(index, "max", e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Rows"
                    value={option.rows}
                    onChange={(e) => handleOptionChange(index, "rows", e.target.value)}
                  />
                </>
              )}
              {answerType === "number" && (
                <>
                  <input
                    type="number"
                    placeholder="Min"
                    value={option.min}
                    onChange={(e) => handleOptionChange(index, "min", e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={option.max}
                    onChange={(e) => handleOptionChange(index, "max", e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Label"
                    value={option.label}
                    onChange={(e) => handleOptionChange(index, "label", e.target.value)}
                  />
                </>
              )}
            </div>
            <button
              type="button"
              className="remove-btn"
              onClick={() => removeOption(index)}
            >
              -
            </button>
          </div>
        ))}

        <button type="button" className="add-btn" onClick={addOption}>
          +
        </button>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>

      {/* Success message */}
      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
};

export default App;

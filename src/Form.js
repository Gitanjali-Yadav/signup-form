import React, { useState } from 'react'; 
import './Form.css';

const Form = () => {
  // State to hold form field values
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneCode: '',
    phoneNumber: '',
    country: '',
    city: '',
    panNumber: '',
    aadharNumber: ''
  });

  // Regular expressions for validating input fields
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const usernameRegex = /^[a-z]+$/;
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  const aadharRegex = /^\d{12}$/;
  const phoneAlphaRegex = /[a-zA-Z]/;

  // State to hold validation error messages
  const [errors, setErrors] = useState({});
  
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  
  // State to track if the form has been submitted successfully
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Function to validate all form fields and set error messages
  const validateForm = () => {
    const newErrors = {};

    // Regular expressions redeclared here (could reuse above)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-z]+$/;
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const aadharRegex = /^\d{12}$/;
    const phoneAlphaRegex = /[a-zA-Z]/;

    // First Name validation: required and minimum length 2
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    // Last Name validation: required and minimum length 2
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    // Username validation: required and only lowercase letters, no spaces
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (!usernameRegex.test(formData.username)) {
      newErrors.username = 'Username must be lowercase letters only, no spaces';
    }

    // Email validation: required and valid format
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Password validation: required and minimum length 6
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Phone Code (Country code) validation: required
    if (!formData.phoneCode.trim()) {
      newErrors.phoneCode = 'Country code is required';
    }

    // Phone Number validation: required and must be exactly 10 digits
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if(formData.phoneNumber.length !== 10){
      newErrors.phoneNumber='Contact number should be exactly 10 digits.';
    }

    // Country validation: required
    if (!formData.country) {
      newErrors.country = 'Country is required';
    }

    // City validation: required
    if (!formData.city) {
      newErrors.city = 'City is required';
    }

    // PAN Number validation: required and must match PAN format
    if (!formData.panNumber.trim()) {
      newErrors.panNumber = 'PAN number is required';
    } else if (!panRegex.test(formData.panNumber)) {
      newErrors.panNumber = 'Invalid PAN format';
    }

    // Aadhar Number validation: required and must be exactly 12 digits
    if (!formData.aadharNumber.trim()) {
      newErrors.aadharNumber = 'Aadhar number is required';
    } else if (!aadharRegex.test(formData.aadharNumber)) {
      newErrors.aadharNumber = 'Aadhar number must be 12 digits';
    }

    // Update the errors state with any validation errors
    setErrors(newErrors);

    // Return true if no errors, else false
    return Object.keys(newErrors).length === 0;
  };

  // Function to update form state on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on submit
    if (validateForm()) {
      // If validation passes, mark form as submitted
      setIsSubmitted(true);
    }
  };

  // Render success message and submitted data after successful submission
  if (isSubmitted) {
    return (
      <div className="success-container">
        <h2>Form Submitted Successfully!</h2>
        <div className="submitted-data">
          <h3>Submitted Details:</h3>
          <p><strong>First Name:</strong> {formData.firstName}</p>
          <p><strong>Last Name:</strong> {formData.lastName}</p>
          <p><strong>Username:</strong> {formData.username}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Phone:</strong> +{formData.phoneCode} {formData.phoneNumber}</p>
          <p><strong>Country:</strong> {formData.country}</p>
          <p><strong>City:</strong> {formData.city}</p>
          <p><strong>PAN Number:</strong> {formData.panNumber}</p>
          <p><strong>Aadhar Number:</strong> {formData.aadharNumber}</p>
        </div>
        <button onClick={() => setIsSubmitted(false)}>Submit Another Form</button>
      </div>
    );
  }

  // Render the form with all input fields and error messages
  return (
    <div className="form-container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        {/* First Name Field */}
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <span className="error">{errors.firstName}</span>}
        </div>

        {/* Last Name Field */}
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>

        {/* Username Field */}
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        {/* Password Field with show/hide toggle */}
        <div className="form-group">
          <label>Password:</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="toggle-password"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        {/* Phone Number Fields: country code and number */}
        <div className="form-group">
          <label>Phone Number:</label>
          <div className="phone-input">
            <input
              type="number"
              name="phoneCode"
              placeholder="Code"
              value={formData.phoneCode}
              onChange={handleChange}
              className="phone-code"
            />
            <input
              type="number"
              name="phoneNumber"
              placeholder="Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="phone-number"
            />
          </div>
          {(errors.phoneCode || errors.phoneNumber) && (
            <span className="error">{errors.phoneCode || errors.phoneNumber}</span>
          )}
        </div>

        {/* Country dropdown */}
        <div className="form-group">
          <label>Country:</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
          >
            <option value="">Select Country</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
          </select>
          {errors.country && <span className="error">{errors.country}</span>}
        </div>

        {/* City dropdown - options depend on country selected */}
        <div className="form-group">
          <label>City:</label>
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
          >
            <option value="">Select City</option>
            {formData.country === "India" && (
              <>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Chennai">Chennai</option>
              </>
            )}
            {formData.country === "USA" && (
              <>
                <option value="New York">New York</option>
                <option value="Los Angeles">Los Angeles</option>
                <option value="Chicago">Chicago</option>
              </>
            )}
            {/* Add more cities for other countries */}
          </select>
          {errors.city && <span className="error">{errors.city}</span>}
        </div>

        {/* PAN Number field */}
        <div className="form-group">
          <label>PAN Number:</label>
          <input
            type="text"
            name="panNumber"
            value={formData.panNumber}
            onChange={handleChange}
            placeholder="ABCDE1234F"
          />
          {errors.panNumber && <span className="error">{errors.panNumber}</span>}
        </div>

        {/* Aadhar Number field */}
        <div className="form-group">
          <label>Aadhar Number:</label>
          <input
            type="text"
            name="aadharNumber"
            value={formData.aadharNumber}
            onChange={handleChange}
            placeholder="123456789012"
          />
          {errors.aadharNumber && <span className="error">{errors.aadharNumber}</span>}
        </div>

        {/* Submit button */}
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default Form;

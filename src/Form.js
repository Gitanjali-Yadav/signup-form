import React, { useState } from 'react';
import './Form.css';

const Form = () => {
  // Form state
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

  // Regex declarations (declare at the top of the function)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const usernameRegex = /^[a-z]+$/;
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  const aadharRegex = /^\d{12}$/;
  const phoneAlphaRegex = /[a-zA-Z]/;

  // Error state
  const [errors, setErrors] = useState({});
  
  // Show/hide password state
  const [showPassword, setShowPassword] = useState(false);
  
  // Success state
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validation function
  const validateForm = () => {
  const newErrors = {};

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const usernameRegex = /^[a-z]+$/;
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  const aadharRegex = /^\d{12}$/;
  const phoneAlphaRegex = /[a-zA-Z]/;

  // First Name validation
  if (!formData.firstName.trim()) {
    newErrors.firstName = 'First name is required';
  } else if (formData.firstName.length < 2) {
    newErrors.firstName = 'First name must be at least 2 characters';
  }

  // Last Name validation
  if (!formData.lastName.trim()) {
    newErrors.lastName = 'Last name is required';
  } else if (formData.lastName.length < 2) {
    newErrors.lastName = 'Last name must be at least 2 characters';
  }

  // Username validation
  if (!formData.username.trim()) {
    newErrors.username = 'Username is required';
  } else if (!usernameRegex.test(formData.username)) {
    newErrors.username = 'Username must be lowercase letters only, no spaces';
  }

  // Email validation
  if (!formData.email.trim()) {
    newErrors.email = 'Email is required';
  } else if (!emailRegex.test(formData.email)) {
    newErrors.email = 'Invalid email format';
  }

  // Password validation
  if (!formData.password) {
    newErrors.password = 'Password is required';
  } else if (formData.password.length < 6) {
    newErrors.password = 'Password must be at least 6 characters';
  }

  // Phone Number validation
  if (!formData.phoneCode.trim()) {
    newErrors.phoneCode = 'Country code is required';
  }

  if (!formData.phoneNumber.trim()) {
    newErrors.phoneNumber = 'Phone number is required';
  } else if(formData.phoneNumber.length !== 10){
    newErrors.phoneNumber='Contact number should be exactly 10 digits.';
  }
  
  // Country validation
  if (!formData.country) {
    newErrors.country = 'Country is required';
  }

  // City validation
  if (!formData.city) {
    newErrors.city = 'City is required';
  }

  // PAN Number validation
  if (!formData.panNumber.trim()) {
    newErrors.panNumber = 'PAN number is required';
  } else if (!panRegex.test(formData.panNumber)) {
    newErrors.panNumber = 'Invalid PAN format';
  }

  // Aadhar Number validation
  if (!formData.aadharNumber.trim()) {
    newErrors.aadharNumber = 'Aadhar number is required';
  } else if (!aadharRegex.test(formData.aadharNumber)) {
    newErrors.aadharNumber = 'Aadhar number must be 12 digits';
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};


  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
    }
  };

  // If form is submitted successfully, show success page
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

  return (
    <div className="form-container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
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

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default Form; 
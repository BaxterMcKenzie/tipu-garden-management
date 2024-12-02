import { useState } from "react";
import axios from "axios";
import PageHeader from "../components/PageHeader";
import Seo from "../components/Seo";
import Toast from "../components/Toast"; // Import the Toast component

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // State for the form inputs
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [services, setServices] = useState([]);
  const [jobSize, setJobSize] = useState([]);
  const [jobDescription, setJobDescription] = useState("");

  // Update the form endpoint to the new contact form endpoint
  const formEndpoint = import.meta.env.VITE_WP_API_CONTACT_FORM_ENDPOINT;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formEndpoint) {
      console.error("Form endpoint is not defined.");
      return;
    }

    const contactForm = new FormData();
    contactForm.append("your-name", name); // Update these based on your form field names
    contactForm.append("your-phone", phone);
    contactForm.append("your-email", email);
    contactForm.append("your-message", message);
    contactForm.append("your-services", services.join(", ")); // Join selected services
    contactForm.append("your-job-size", jobSize.join(", ")); // Join selected job sizes
    contactForm.append("your-job-description", jobDescription);

    axios
      .post(formEndpoint, contactForm, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        setSubmitted(true);
        setError(false);
      })
      .catch((error) => {
        setError(true);
        setSubmitted(false);
      });
  };

  const handleCheckboxChange = (setter) => (event) => {
    const value = event.target.value;
    setter((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  return (
    <>
      <Seo
        title="Contact Us - Tipu Garden Management"
        description="Get in touch with Tipu Garden Management for any inquiries or to schedule a consultation."
        url={window.location.href}
      />

      <PageHeader
        title="Contact Us"
        image_url="/header-image/contact.jpg"
        blurb="Have a question or want to get started with our services? We'd love to hear from you!"
        showButton={false}
      />

      <div className="contact-form-container">
        <div className="inner-container">
          <h2 className="h2-alt">Get in Touch</h2>
          <p>
            Below is our contact form—please provide as much detail as possible
            when filling it out, as gardening jobs can vary widely in size,
            scope, and pricing.
            <br />
            <br />
            Feel free to check all the boxes that apply to your needs. If you'd
            prefer to reach out via email or have a chat over the phone, our
            contact details are listed below.
            <br />
            <br />
            Phone: 022 175 3264
            <br />
            <br />
            Email: tipugarden@gmail.com
          </p>
          <div className="form-container">
            <form onSubmit={handleSubmit} className="custom-form">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Services and Job Size Checkbox Groups */}
              <div className="form-group">
                <div className="checkbox-section">
                  {/* Services Section */}
                  <div className="checkbox-column">
                    <h3>Services:</h3>
                    <label>
                      <input
                        type="checkbox"
                        value="Lawn Care"
                        onChange={handleCheckboxChange(setServices)}
                      />
                      Lawn Care
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="Pest Control"
                        onChange={handleCheckboxChange(setServices)}
                      />
                      Pest Control
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="Section Clearing"
                        onChange={handleCheckboxChange(setServices)}
                      />
                      Section Clearing
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="Hedges & Topiaries"
                        onChange={handleCheckboxChange(setServices)}
                      />
                      Hedges & Topiaries
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="Plant Consultation"
                        onChange={handleCheckboxChange(setServices)}
                      />
                      Plant Consultation
                    </label>
                  </div>

                  {/* Job Size Section */}
                  <div className="checkbox-column">
                    <h3>Job Size:</h3>
                    <label>
                      <input
                        type="checkbox"
                        value="Basic"
                        onChange={handleCheckboxChange(setJobSize)}
                      />
                      Basic
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="Intermediate"
                        onChange={handleCheckboxChange(setJobSize)}
                      />
                      Intermediate
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="Advanced"
                        onChange={handleCheckboxChange(setJobSize)}
                      />
                      Advanced
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="Commercial"
                        onChange={handleCheckboxChange(setJobSize)}
                      />
                      Commercial
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="Other"
                        onChange={handleCheckboxChange(setJobSize)}
                      />
                      Other
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="job-description">Job Description:</label>
                <textarea
                  id="job-description"
                  name="job-description"
                  placeholder="Describe your job"
                  rows="4"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Enter your message"
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>
              <div>
                <button type="submit" className="secondary-button">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Work Zone */}
      <div className="main-container">
        <div className="inner-container">
          <div
            className="image-container"
            style={{
              backgroundImage: `url('/img/service-area.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="text-container">
            <h2 className="h2-orange">Service Area</h2>
            <br />
            <p className="p-invert">
              Our main service area covers from Seatoun to Titahi Bay, and we
              focus our work within this region. However, if you're just outside
              these boundaries, please don’t hesitate to get in touch! We’ll do
              our best to accommodate you—we don’t want anyone to miss out on
              our services.
            </p>
          </div>
        </div>
      </div>

      {/* Toast Notification for Success/Error */}
      <Toast
        message={
          submitted
            ? "Thank you for your message!"
            : error
            ? "Error submitting your message!"
            : ""
        }
        type={submitted ? "success" : "error"}
        onClose={() => {
          setSubmitted(false);
          setError(false);
        }}
      />
    </>
  );
};

export default Contact;

import React, { useState } from 'react';

function Contact() {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    setFeedback(`Thank you, ${name}! We have received your message.`);
    e.target.reset();
  };

  return (
    <section id="contact" className="section">
      <h2>Contact</h2>
      <p>Feel free to reach out via the form below:</p>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" required />
        <input type="email" name="email" placeholder="Your Email" required />
        <textarea name="message" placeholder="Your Message" required></textarea>
        <button type="submit">Send</button>
      </form>
      <p>{feedback}</p>
    </section>
  );
}

export default Contact;
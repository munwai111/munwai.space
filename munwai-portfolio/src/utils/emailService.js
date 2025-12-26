// Email service using EmailJS - Sends directly to Yahoo inbox
// No backend server required, works directly from frontend

import emailjs from "@emailjs/browser";

// EmailJS Configuration
const EMAILJS_SERVICE_ID = "service_r142b9a";
const EMAILJS_TEMPLATE_ID = "template_4uo22lw";
const EMAILJS_PUBLIC_KEY = "c_udEO-3FlKP3w7sI";

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

export const sendEmail = async (formData) => {
  try {
    const templateParams = {
      from_name: formData.name,
      reply_to: formData.email,
      message: formData.message,
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log("Email sent successfully:", response);

    return {
      success: true,
      message: "Message sent successfully! I'll get back to you soon.",
    };
  } catch (error) {
    console.error("EmailJS error:", error);
    return {
      success: false,
      message:
        "Failed to send message. Please try again or email me directly at L.munwai@yahoo.com",
    };
  }
};

// Alternative: Copy email content to clipboard
export const copyEmailContent = (formData) => {
  const emailContent = `
To: L.munwai@yahoo.com
Subject: Portfolio Contact - Message from ${formData.name}

Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}

---
This message was sent from the portfolio contact form.
  `;

  return navigator.clipboard
    .writeText(emailContent)
    .then(() => {
      return { success: true, message: "Email content copied to clipboard!" };
    })
    .catch(() => {
      return { success: false, message: "Failed to copy email content" };
    });
};

// Keep the original openMailto function for backward compatibility
export const openMailto = (formData) => {
  const subject = encodeURIComponent(
    `Portfolio Contact - Message from ${formData.name}`
  );
  const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}
  `);

  const mailtoUrl = `mailto:L.munwai@yahoo.com?subject=${subject}&body=${body}`;
  window.open(mailtoUrl, "_blank");
};

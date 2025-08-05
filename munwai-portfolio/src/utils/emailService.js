// Email service utility using mailto as primary method
// This is the most reliable approach that works without external dependencies

export const sendEmail = async (formData) => {
  try {
    const response = await fetch("http://localhost:3002/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Email service error:", error);
    return {
      success: false,
      message:
        "Failed to send email. Please contact me directly at l_munwai@yahoo.com or munwai3939728@gmail.com",
    };
  }
};

// Alternative: Copy email content to clipboard
export const copyEmailContent = (formData) => {
  const emailContent = `
To: munwai3939728@gmail.com
Subject: Portfolio Contact - Message from ${formData.name}

Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}

---
This message was sent from the portfolio contact form.
  `;

  navigator.clipboard
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

  const mailtoUrl = `mailto:munwai3939728@gmail.com?subject=${subject}&body=${body}`;
  window.open(mailtoUrl, "_blank");
};

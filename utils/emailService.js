import emailjs from "@emailjs/browser";

// EmailJS Configuration
const EMAILJS_SERVICE_ID = "service_p3dd9gg";
const EMAILJS_TEMPLATE_ID = "template_4uo22lw";
const EMAILJS_PUBLIC_KEY = "c_udEO-3FlKP3w7sI";

/**
 * Main function to send email
 */
export const sendEmail = async (formData) => {
  try {
    const safeEmail = String(formData.email || "").trim();
    const safeName = String(formData.name || "").trim();

    // Prepare Template Params
    const templateParams = {
      name: safeName,
      email: safeEmail,
      message: formData.message,
    };

    // 3. Send via EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      { publicKey: EMAILJS_PUBLIC_KEY }
    );

    // EmailJS returns { status: 200, text: "OK" } on success
    if (response.status === 200 && response.text === "OK") {
      return {
        success: true,
        message: "Message sent successfully! I'll get back to you soon.",
      };
    } else {
      throw new Error(`EmailJS Error: ${response.text || "Unknown error"}`);
    }
  } catch (err) {
    console.error("Email submission failed:", err);

    // Handle EmailJS error objects (they have status and text properties)
    const errorMessage =
      err?.text ||
      err?.message ||
      "Failed to send message. Please try again or email directly at l_munwai@yahoo.com";

    return {
      success: false,
      message: errorMessage,
    };
  }
};

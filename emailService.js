// Email service utility using mailto as primary method
// This is the most reliable approach that works without external dependencies

export const sendEmail = async (formData) => {
  try {
    // Use mailto as the primary email method
    const subject = encodeURIComponent(`Portfolio Contact - Message from ${formData.name}`)
    const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}

---
This message was sent from the portfolio contact form.
    `)
    
    const mailtoUrl = `mailto:munwai3939728@gmail.com?subject=${subject}&body=${body}`
    
    // Open mailto link
    window.open(mailtoUrl, '_blank')
    
    // Return success since mailto was opened
    return { 
      success: true, 
      message: 'Your email client has been opened with the message pre-filled. Please send the email to complete your message submission.' 
    }
  } catch (error) {
    console.error('Email service error:', error)
    return { 
      success: false, 
      message: 'Failed to open email client. Please contact me directly at munwai3939728@gmail.com' 
    }
  }
}

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
  `
  
  navigator.clipboard.writeText(emailContent).then(() => {
    return { success: true, message: 'Email content copied to clipboard!' }
  }).catch(() => {
    return { success: false, message: 'Failed to copy email content' }
  })
}

// Keep the original openMailto function for backward compatibility
export const openMailto = (formData) => {
  const subject = encodeURIComponent(`Portfolio Contact - Message from ${formData.name}`)
  const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}
  `)
  
  const mailtoUrl = `mailto:munwai3939728@gmail.com?subject=${subject}&body=${body}`
  window.open(mailtoUrl, '_blank')
}


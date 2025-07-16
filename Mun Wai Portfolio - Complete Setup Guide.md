# Mun Wai Portfolio - Complete Setup Guide

## 📁 Package Contents

This package contains the complete source code for Mun Wai's professional portfolio website, including all components, assets, and documentation.

### 🗂️ Project Structure

```bash
munwai-portfolio/
├── public/                          # Static assets
│   ├── index.html                   # Main HTML template
│   └── LooiMunWaiResume-2025.pdf   # Resume PDF file
├── src/                             # Source code
│   ├── components/                  # React components
│   │   ├── ui/                     # UI component library (shadcn/ui)
│   │   ├── CertificationSection.jsx
│   │   ├── CertificationProgressChart.jsx
│   │   ├── HeroProfile.jsx
│   │   ├── InteractiveBackground.jsx
│   │   ├── NotificationToast.jsx
│   │   ├── ProjectCarousel.jsx
│   │   ├── ProjectDomainChart.jsx
│   │   ├── ResumeSection.jsx
│   │   ├── SkillProficiencyChart.jsx
│   │   ├── TestimonialCarousel.jsx
│   │   └── ThemeToggle.jsx
│   ├── hooks/                       # Custom React hooks
│   ├── lib/                         # Utility libraries
│   ├── utils/                       # Utility functions
│   │   └── emailService.js         # Email handling service
│   ├── App.jsx                     # Main application component
│   ├── App.css                     # Application styles
│   ├── main.jsx                    # Application entry point
│   └── index.css                   # Global styles
├── server/                          # Backend server (optional)
├── package.json                     # Project dependencies
├── vite.config.js                  # Vite configuration
├── eslint.config.js                # ESLint configuration
├── jsconfig.json                   # JavaScript configuration
└── Documentation files (*.md)       # Various documentation and test results
```

## 🚀 Quick Start Guide

### Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **pnpm** (package manager)
- **VS Code** (recommended editor)

### Installation Steps

1. **Extract the Package**

   ```bash
   tar -xzf munwai-portfolio-complete.tar.gz
   cd munwai-portfolio
   ```

2. **Install Dependencies**

   ```bash
   # Using npm
   npm install

   # OR using pnpm (recommended)
   pnpm install
   ```

3. **Start Development Server**

   ```bash
   # Using npm
   npm run dev

   # OR using pnpm
   pnpm dev
   ```

4. **Open in Browser**
   - Navigate to `http://localhost:5173`
   - The portfolio should load with all features working

### VS Code Setup

1. **Open Project in VS Code**

   ```bash
   code munwai-portfolio
   ```

2. **Recommended Extensions**

   - ES7+ React/Redux/React-Native snippets
   - Tailwind CSS IntelliSense
   - Auto Rename Tag
   - Bracket Pair Colorizer
   - Prettier - Code formatter
   - ESLint

3. **Configure Prettier (Optional)**
   Create `.prettierrc` file:

   ```json
   {
     "semi": false,
     "singleQuote": true,
     "tabWidth": 2,
     "trailingComma": "es5"
   }
   ```

## 🎨 Features Overview

### ✅ Responsive Design

- **Mobile-First**: Optimized for all device sizes
- **Device-Specific**: Special handling for flip phones, foldable phones, tablets, and TVs
- **Touch-Friendly**: Large touch targets and intuitive navigation
- **Orientation Support**: Adapts to portrait/landscape modes

### ✅ Interactive Components

- **Hero Profile**: Animated profile section with dynamic content
- **Skill Charts**: Interactive proficiency and progress charts
- **Project Carousel**: Smooth project showcase with navigation
- **Testimonial Carousel**: Client testimonials with smooth transitions
- **Interactive Background**: Animated particle system

### ✅ Theme Support

- **Dark/Light Mode**: Toggle between themes
- **Persistent Preferences**: Theme choice saved in localStorage
- **Smooth Transitions**: Animated theme switching

### ✅ Contact System

- **Contact Form**: Validated form with error handling
- **Email Integration**: Uses mailto protocol for email sending
- **Notification System**: Toast notifications for user feedback

## 📧 Email System Information

### Current Implementation

The contact form uses a **mailto-based system** that:

- Opens the user's default email client
- Pre-fills recipient, subject, and message
- Requires manual sending by the user

### Important Note

**The "Let's Talk Business" button does NOT automatically send emails.** It opens the user's email client with a pre-filled message that needs to be sent manually.

### Email Service Location

- File: `src/utils/emailService.js`
- Function: `sendEmail(formData)`
- Method: `mailto:` protocol

### Alternative Solutions

If you need automatic email sending, consider:

1. **Backend Email Service**: Implement Node.js/Express with SendGrid/Mailgun
2. **Third-Party Services**: Use Formspree, Netlify Forms, or EmailJS
3. **Serverless Functions**: Deploy with Vercel/Netlify functions

## 🛠️ Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Install new dependencies
npm install <package-name>
```

## 📱 Device Responsiveness

The portfolio is optimized for:

### 📱 Mobile Devices

- **iPhone/Android**: All screen sizes (320px-428px)
- **Flip Phones**: Adaptive layout for flipped/unflipped states
- **Foldable Phones**: Seamless transition between folded/unfolded

### 📱 Tablets

- **iPad/Android Tablets**: Portrait and landscape modes
- **Touch Navigation**: Large, accessible touch targets

### 📱 Special Devices

- **Huawei 3-Screen**: Extended layout across multiple screens
- **TV Displays**: Large fonts and remote-friendly navigation

## 🎯 Key Components Explained

### 1. App.jsx

- Main application component
- Device detection logic
- Contact form handling
- Navigation and routing

### 2. HeroProfile.jsx

- Animated profile introduction
- Dynamic skill highlights
- Call-to-action buttons

### 3. Interactive Charts

- **SkillProficiencyChart.jsx**: Animated skill levels
- **CertificationProgressChart.jsx**: Learning journey timeline
- **ProjectDomainChart.jsx**: Project categorization

### 4. ThemeToggle.jsx

- Dark/light mode switching
- Persistent theme preferences
- Smooth transition animations

## 🔧 Customization Guide

### Updating Personal Information

1. **Contact Details**: Edit `src/App.jsx` (lines 770-800)
2. **Resume PDF**: Replace `public/LooiMunWaiResume-2025.pdf`
3. **Profile Content**: Modify `src/components/HeroProfile.jsx`

### Styling Changes

1. **Colors**: Update Tailwind classes throughout components
2. **Fonts**: Modify `src/index.css` for typography
3. **Animations**: Adjust transition durations and effects

### Adding New Sections

1. Create new component in `src/components/`
2. Import and add to `src/App.jsx`
3. Update navigation links if needed

## 🚀 Deployment Options

### 1. Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### 2. Netlify

```bash
npm run build
# Upload dist/ folder to Netlify
```

### 3. GitHub Pages

```bash
npm install -g gh-pages
npm run build
gh-pages -d dist
```

## 📋 Troubleshooting

### Common Issues

1. **Dependencies Not Installing**

   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Port Already in Use**

   ```bash
   npm run dev -- --port 3001
   ```

3. **Build Errors**
   - Check for missing dependencies
   - Verify all imports are correct
   - Run `npm run lint` to check for errors

### Email Issues

- Ensure default email client is configured
- Check if mailto links are blocked by browser
- Consider implementing alternative email solution

## 📞 Support

For questions or issues:

- **Email**: <munwai3939728@gmail.com>
- **LinkedIn**: [Mun Wai Looi](https://www.linkedin.com/in/mun-wai-looi-086886225)

## 📄 License

This portfolio is for personal use. Please respect intellectual property and customize appropriately for your own use.

---

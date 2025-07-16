# Portfolio Components Reference Guide

## 📁 Complete File Structure and Component Descriptions

### 🎯 Core Application Files

#### `src/App.jsx` - Main Application Component

- **Purpose**: Central application component that orchestrates the entire portfolio
- **Features**:
  - Device detection and responsive behavior
  - Contact form handling and validation
  - Email service integration
  - Navigation and smooth scrolling
  - Theme management
  - Mobile menu functionality
- **Key Functions**:
  - `useDeviceDetection()` - Detects device type and screen size
  - `handleFormSubmit()` - Processes contact form submissions
  - `smoothScrollTo()` - Smooth scrolling navigation
  - `copyToClipboard()` - Clipboard functionality

#### `src/main.jsx` - Application Entry Point

- **Purpose**: React application initialization and mounting
- **Features**: Renders the main App component into the DOM

#### `src/App.css` - Application Styles

- **Purpose**: Global application styles and custom CSS
- **Features**: Custom animations, responsive utilities, and component-specific styles

#### `src/index.css` - Global Styles

- **Purpose**: Global CSS including Tailwind imports and base styles
- **Features**: Typography, color variables, and global resets

---

### 🧩 React Components

#### `src/components/HeroProfile.jsx` - Hero Section

- **Purpose**: Main profile introduction and hero section
- **Features**:
  - Animated profile presentation
  - Dynamic skill highlights with icons
  - Call-to-action buttons
  - Responsive design for all devices
- **Icons Used**: Brain, Lightbulb, BarChart3, Target

#### `src/components/InteractiveBackground.jsx` - Animated Background

- **Purpose**: Interactive particle system background
- **Features**:
  - Animated floating particles
  - Mouse interaction effects
  - Theme-aware colors
  - Performance-optimized animations

#### `src/components/ThemeToggle.jsx` - Theme Switcher

- **Purpose**: Dark/light mode toggle functionality
- **Features**:
  - Smooth theme transitions
  - Persistent theme preferences
  - Icon-based toggle button
  - Accessibility support

#### `src/components/ResumeSection.jsx` - Resume Display

- **Purpose**: Professional experience and education showcase
- **Features**:
  - Structured resume layout
  - Download functionality
  - Responsive design
  - Professional formatting

#### `src/components/CertificationSection.jsx` - Certifications Display

- **Purpose**: Professional certifications and achievements
- **Features**:
  - Certification cards with details
  - External links to verification
  - Responsive grid layout
  - Professional presentation

#### `src/components/ProjectCarousel.jsx` - Project Showcase

- **Purpose**: Interactive project portfolio carousel
- **Features**:
  - Smooth carousel navigation
  - Project details and links
  - Responsive image handling
  - Touch/swipe support

#### `src/components/TestimonialCarousel.jsx` - Client Testimonials

- **Purpose**: Client testimonials and recommendations
- **Features**:
  - Rotating testimonial display
  - Smooth transitions
  - Quote formatting
  - Navigation controls

#### `src/components/NotificationToast.jsx` - Notification System

- **Purpose**: User feedback and notification display
- **Features**:
  - Auto-dismissing notifications
  - Smooth animations
  - Theme-aware styling
  - Accessibility support

---

### 📊 Chart Components

#### `src/components/SkillProficiencyChart.jsx` - Skills Chart

- **Purpose**: Interactive skill proficiency visualization
- **Features**:
  - Animated bar chart
  - Skill categories and levels
  - Responsive design
  - Smooth animations
- **Skills Displayed**: Development, Data Analysis, AI/ML, Strategy

#### `src/components/CertificationProgressChart.jsx` - Learning Timeline

- **Purpose**: Certification journey timeline visualization
- **Features**:
  - Interactive line chart
  - Timeline progression
  - Hover effects
  - Responsive scaling
- **Data**: Certification milestones over time

#### `src/components/ProjectDomainChart.jsx` - Project Categories

- **Purpose**: Project domain distribution visualization
- **Features**:
  - Interactive pie chart
  - Domain categorization
  - Hover effects
  - Responsive design
- **Categories**: Digital Strategy, AI/Data, Leadership, Communication

---

### 🎨 UI Component Library (shadcn/ui)

#### `src/components/ui/button.jsx` - Button Component

- **Purpose**: Reusable button component with variants
- **Features**: Multiple styles, sizes, and states

#### `src/components/ui/card.jsx` - Card Component

- **Purpose**: Content container with consistent styling
- **Features**: Header, content, and footer sections

#### `src/components/ui/input.jsx` - Input Component

- **Purpose**: Form input fields with validation styling
- **Features**: Error states, focus styles, accessibility

#### `src/components/ui/textarea.jsx` - Textarea Component

- **Purpose**: Multi-line text input for forms
- **Features**: Resizable, validation styling

#### Additional UI Components

- `accordion.jsx` - Collapsible content sections
- `alert.jsx` - Alert and notification components
- `avatar.jsx` - User avatar display
- `badge.jsx` - Status and category badges
- `calendar.jsx` - Date picker component
- `carousel.jsx` - Content carousel base
- `chart.jsx` - Chart component utilities
- `checkbox.jsx` - Checkbox input component
- `dialog.jsx` - Modal dialog component
- `dropdown-menu.jsx` - Dropdown menu component
- `form.jsx` - Form handling utilities
- `navigation-menu.jsx` - Navigation components
- `popover.jsx` - Popover content display
- `progress.jsx` - Progress bar component
- `select.jsx` - Select dropdown component
- `sheet.jsx` - Slide-out panel component
- `skeleton.jsx` - Loading skeleton component
- `slider.jsx` - Range slider component
- `switch.jsx` - Toggle switch component
- `table.jsx` - Data table component
- `tabs.jsx` - Tabbed content component
- `tooltip.jsx` - Tooltip component

---

### 🔧 Utility Files

#### `src/utils/emailService.js` - Email Handling

- **Purpose**: Contact form email functionality
- **Features**:
  - Mailto link generation
  - Form data processing
  - Error handling
  - Clipboard functionality
- **Functions**:
  - `sendEmail()` - Main email sending function
  - `copyEmailContent()` - Copy email to clipboard
  - `openMailto()` - Open email client

#### `src/lib/utils.js` - Utility Functions

- **Purpose**: Common utility functions and helpers
- **Features**: Class name utilities, formatting functions

#### `src/hooks/use-mobile.js` - Mobile Detection Hook

- **Purpose**: React hook for mobile device detection
- **Features**: Responsive breakpoint detection

---

### 📄 Configuration Files

#### `package.json` - Project Dependencies

- **Purpose**: Project metadata and dependency management
- **Key Dependencies**:
  - React 18
  - Vite (build tool)
  - Tailwind CSS
  - Lucide React (icons)
  - Various UI libraries

#### `vite.config.js` - Build Configuration

- **Purpose**: Vite build tool configuration
- **Features**: React plugin, build optimization

#### `eslint.config.js` - Code Quality

- **Purpose**: ESLint configuration for code quality
- **Features**: React-specific rules, best practices

#### `jsconfig.json` - JavaScript Configuration

- **Purpose**: JavaScript project configuration
- **Features**: Path mapping, compiler options

---

### 📁 Static Assets

#### `public/index.html` - HTML Template

- **Purpose**: Main HTML template for the application
- **Features**: Meta tags, favicon, app mounting point

#### `public/LooiMunWaiResume-2025.pdf` - Resume File

- **Purpose**: Downloadable resume PDF
- **Features**: Professional resume document

---

### 📋 Documentation Files

#### Test Results and Documentation

- `animation_test_results.md` - Animation testing documentation
- `email_diagnosis.md` - Email system analysis
- `email_test_results.md` - Email functionality testing
- `enhanced_animation_test.md` - Advanced animation testing
- `final_test_results.md` - Final testing results
- `interactive_animation_test.md` - Interactive animation testing
- `line_graph_fix_results.md` - Chart fixing documentation
- `responsive_test_results.md` - Responsive design testing
- `test_results.md` - General testing results
- `test_results_fixed.md` - Fixed issues documentation

#### Project Management

- `todo.md` - Project task tracking
- `responsive_todo.md` - Responsive design tasks
- `email_debug_todo.md` - Email debugging tasks
- `fix_todo.md` - Bug fix tracking

---

## 🎯 Component Interaction Flow

1. **App.jsx** serves as the main orchestrator
2. **HeroProfile.jsx** provides the initial user engagement
3. **InteractiveBackground.jsx** creates visual appeal
4. **Chart components** showcase skills and experience
5. **Carousel components** display projects and testimonials
6. **Contact form** enables user interaction
7. **NotificationToast.jsx** provides user feedback
8. **ThemeToggle.jsx** manages visual preferences

## 🔄 Data Flow

1. User interactions trigger state changes in App.jsx
2. Form data flows through validation to emailService.js
3. Theme preferences persist in localStorage
4. Device detection affects responsive behavior
5. Chart data is statically defined within components
6. Navigation uses smooth scrolling between sections

## 🎨 Styling Architecture

- **Tailwind CSS** for utility-first styling
- **CSS Modules** for component-specific styles
- **Theme variables** for consistent color schemes
- **Responsive breakpoints** for device adaptation
- **Animation classes** for smooth transitions

This comprehensive reference should help you understand and modify any part of the portfolio system!

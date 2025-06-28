# Metamorph Design - Minimal Website

A delicate, minimal website for Metamorph Design Studio, inspired by Rick Rubin's "The Creative Act" and LoveFrom's design philosophy. Features page-by-page scrolling with only the essentials.

## 🎯 Design Philosophy

### Minimal & Essential
- **Page-by-Page Navigation**: Full-screen pages with smooth transitions
- **Essential Content Only**: Removed clutter, focusing on core message
- **Delicate Typography**: Light font weights and careful spacing
- **Subtle Interactions**: Custom cursor and minimal hover effects

### Inspired By
- **Rick Rubin's "The Creative Act"**: Focus on essence and intention
- **LoveFrom.com**: Clean, minimal aesthetic with purposeful design
- **Japanese Design Principles**: Ma (間) - the conscious use of space

## 🚀 Features

### Navigation
- **Dot Navigation**: Minimal dots in the top-right corner
- **Smooth Transitions**: 0.8s ease transitions between pages
- **Multiple Input Methods**: Mouse wheel, keyboard arrows, touch swipe
- **Custom Cursor**: Subtle dual-circle cursor design

### Content Structure
1. **Hero**: Your core message about sustainable development
2. **About**: Essential description of Metamorph Design
3. **Services**: Six core services in clean grid layout
4. **Contact**: Simple contact form and information

### Technical Features
- **Responsive Design**: Works on all devices
- **Touch Support**: Swipe navigation on mobile
- **Keyboard Navigation**: Arrow keys and number keys (1-4)
- **Form Validation**: Clean notification system

## 📁 File Structure

```
Metamorph/
├── index.html          # Minimal HTML structure
├── styles.css          # Clean, minimal styling
├── script.js           # Page navigation & interactions
└── README.md           # This file
```

## 🎨 Design System

### Colors
```css
/* Minimal Color Palette */
--text: #1a1a1a;        /* Primary text */
--background: #fafafa;   /* Main background */
--background-alt: #f5f5f5; /* Alternate background */
--border: #eee;         /* Subtle borders */
--accent: #666;         /* Secondary text */
```

### Typography
- **Font**: Inter (300, 400, 500, 600 weights)
- **Approach**: Light weights for elegance, careful line-height
- **Hierarchy**: Clear size differences without being loud

### Spacing
- **Consistent**: 2rem, 3rem, 5rem for major sections
- **Breathing Room**: Generous whitespace throughout
- **Grid**: Clean, minimal grid for services

## 🛠️ Customization

### Content Updates

#### Hero Message
Edit the main message in `index.html`:
```html
<div class="hero-text">
    <h1>Your core message here</h1>
</div>
```

#### Services
Modify services in the services section:
```html
<div class="service-item">
    <h3>Service Title</h3>
    <p>Brief description of key offerings</p>
</div>
```

#### Contact Information
Update contact details:
```html
<div class="contact-item">
    <span class="label">Phone</span>
    <span class="value">Your phone number</span>
</div>
```

### Styling Changes

#### Colors
Modify the color variables in `styles.css`:
```css
body {
    color: #1a1a1a;  /* Change text color */
    background: #fafafa;  /* Change background */
}
```

#### Typography
Adjust font weights and sizes:
```css
.hero-text h1 {
    font-size: 2.5rem;  /* Adjust size */
    font-weight: 300;   /* Adjust weight */
}
```

### Adding Pages
To add a new page:

1. **HTML**: Add new section in `index.html`:
```html
<section class="page" id="page-5">
    <div class="page-content">
        <!-- Your content -->
    </div>
</section>
```

2. **Navigation**: Add dot in navigation:
```html
<span class="dot" data-page="5"></span>
```

3. **JavaScript**: Update `totalPages` variable in `script.js`

## 📱 Mobile Experience

The website is optimized for mobile with:
- **Touch Navigation**: Swipe up/down to change pages
- **Responsive Typography**: Adjusted sizes for small screens
- **Touch-Friendly**: Larger touch targets
- **Performance**: Optimized for mobile browsers

## 🎯 Performance

- **Minimal Code**: Only essential JavaScript and CSS
- **Fast Loading**: Optimized assets and minimal dependencies
- **Smooth Animations**: Hardware-accelerated transitions
- **Accessibility**: Keyboard navigation and screen reader support

## 🚀 Getting Started

1. **Open**: Simply open `index.html` in your browser
2. **Navigate**: Use mouse wheel, arrow keys, or click dots
3. **Customize**: Edit content and styling as needed
4. **Deploy**: Upload to your hosting service

## 🔧 Advanced Features

### Custom Cursor
The custom cursor can be modified in `script.js`:
```javascript
// Adjust cursor size
cursor.style.width = '20px';
cursor.style.height = '20px';
```

### Page Transitions
Modify transition timing in `styles.css`:
```css
.page {
    transition: all 0.8s ease;  /* Adjust timing */
}
```

### Form Integration
For real form submission, replace the simulation in `script.js` with your backend integration.

## 🎨 Design Principles

This website follows these design principles:

1. **Less is More**: Only essential elements
2. **Space is Design**: Generous whitespace
3. **Typography is Content**: Careful font choices
4. **Interaction is Intentional**: Every interaction serves a purpose
5. **Performance is UX**: Fast, smooth experience

## 📞 Support

For modifications:
1. Edit files directly in your code editor
2. Test changes by refreshing your browser
3. Use browser dev tools for debugging

---

**Note**: This is a static website. For dynamic features like form submission, integrate with services like Netlify Forms, Formspree, or your own backend. 
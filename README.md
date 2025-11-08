# 📱 Story Feature

An Instagram/WhatsApp-style story feature built with React and Tailwind CSS. Users can upload images that automatically expire after 24 hours, view stories in full-screen mode, and swipe through multiple stories.

## ✨ Features

- 📤 **Upload Stories** - Click the + button to upload images
- ⏰ **24-Hour Auto-Expiry** - Stories automatically disappear after 24 hours
- 🎨 **Instagram-Style UI** - Gradient borders and smooth animations
- 📱 **Responsive Design** - Works perfectly on mobile and desktop
- 👆 **Swipe Navigation** - Swipe left/right to navigate between stories
- ⚡ **Auto-Progress** - Stories automatically advance after 3 seconds
- 💾 **Local Storage** - Stories persist across browser sessions
- 🖼️ **Image Optimization** - Automatic resizing to max 1080x1920px

## 🚀 Demo

[Live Demo](https://whaleeeyyyyy.github.io/24-Hour-Story/) 

## 🛠️ Technologies Used

- **React** - JavaScript library for building user interfaces
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **localStorage** - Browser storage for data persistence

## 📦 Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Setup

1. Clone the repository
```bash
git clone https://github.com/YOUR-USERNAME/story-feature.git
```

2. Navigate to the project directory
```bash
cd story-feature
```

3. Install dependencies
```bash
npm install
```

4. Start the development server
```bash
npm start
```

5. Open your browser and visit `http://localhost:3000`

## 📖 Usage

### Adding a Story
1. Click the **+** button
2. Select an image from your device
3. The story will appear with a colorful gradient border

### Viewing Stories
1. Click on any story circle
2. The story opens in full-screen mode
3. Stories auto-advance after 3 seconds
4. Swipe left/right or click the sides to navigate
5. Click the X button or middle area to close

### Story Expiration
- Stories automatically expire after 24 hours
- Expired stories are removed from the list automatically

## 🎨 Customization

### Change Gradient Colors

In `StoryFeature.jsx`, find this line (around line 230):
```jsx
className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600"
```

Replace with your desired colors:
```jsx
className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-blue-400 via-purple-500 to-pink-600"
```

### Change Story Duration

In `StoryFeature.jsx`, find this line (around line 70):
```javascript
const duration = 3000; // 3 seconds
```

Change to your desired duration (in milliseconds):
```javascript
const duration = 5000; // 5 seconds
```

### Change Story Circle Size

Find this line (around line 225):
```jsx
className="w-16 h-16 rounded-full..."
```

Change `w-16 h-16` to:
- `w-20 h-20` for larger circles
- `w-12 h-12` for smaller circles

## 📱 Features Breakdown

### Story Upload
- File input with image validation
- Automatic image resizing and optimization
- Base64 encoding for storage
- Instant preview after upload

### Story Viewer
- Full-screen modal display
- Progress bars for each story
- Touch gesture support (swipe)
- Click navigation zones
- Auto-close after last story

### Data Persistence
- Stories saved in localStorage
- Automatic cleanup of expired stories
- Timestamp tracking for expiration
- Cross-session persistence

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Weallfearnius Justin**
- GitHub: [Weallfearnius Justin](https://github.com/whaleeeyyyyy)
- Email: weallfearniusj03@gmail.com

## 🙏 Acknowledgments

- Inspired by Instagram and WhatsApp Stories
- Icons by [Lucide](https://lucide.dev)
- Built with [Create React App](https://create-react-app.dev)
- Styled with [Tailwind CSS](https://tailwindcss.com)

⭐ Star this repo if you found it helpful!

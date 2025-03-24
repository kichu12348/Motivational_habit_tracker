# Motivational Habit Tracker

A dynamic, single-page habit tracking application that helps users build positive habits while keeping them motivated through mood-based themes and visual feedback.

## 🌟 Features

- **Mood-Based Themes**: Dynamic UI that changes colors based on your selected mood
- **Habit Management**: Add, edit, delete, and complete daily habits
- **Progress Tracking**: Visual progress bar showing completion percentage
- **Streak System**: Count consecutive days of habit completion
- **Motivational Quotes**: Receive mood-specific motivational messages
- **Data Persistence**: All data stored locally in your browser
- **Visual Feedback**: Confetti animations when completing habits
- **Responsive Design**: Works well on both mobile and desktop

## 💻 Technologies Used

- **HTML5**: Structure of the single-page application
- **CSS3**: Styling with CSS variables for theme switching
- **Vanilla JavaScript**: Core functionality without frameworks
- **localStorage API**: Client-side data persistence
- **Font Awesome**: Icons for enhanced user interface

## 🚀 Getting Started

### Installation

1. Clone this repository or download the ZIP file
    ```
    git clone https://github.com/kichu12348/motivational-habit-tracker.git
    ```
2. Open the project folder
3. Launch `index.html` in your preferred browser

No additional dependencies or installations required!

### Live Demo

*Note: Add link to your deployed application here if available*

## 📱 How to Use

1. **Select Your Mood**: Click on the emoji that best represents your current mood to set the theme
2. **Add Habits**: Type your habit in the input field and click the "+" button
3. **Complete Habits**: Check the box next to a habit to mark it as complete
4. **Edit Habits**: Click the edit (pencil) icon to modify a habit
5. **Delete Habits**: Click the trash icon to remove a habit
6. **Track Progress**: View your current streak and daily progress at the top of the screen
7. **Stay Motivated**: Read the mood-specific motivational quote that changes based on your selected mood

## 🎨 Color Themes

| Mood | Description | Primary Color |
|------|-------------|---------------|
| 🔥 | Motivated | Coral (#FF6B6B) |
| 😌 | Calm & Focused | Blue (#4A90E2) |
| 🌿 | Relaxed | Green (#4CAF50) |
| 😎 | Confident | Purple (#9C27B0) |
| 🎯 | Disciplined | Dark Grey (#212121) |

## 🔧 Key Functions

- **Streak Tracking**: Automatically tracks consecutive days of habit completion
- **Daily Reset**: Habits are automatically reset at the start of each day
- **Local Storage**: All your data is saved in your browser's local storage
- **Confetti Animation**: Visual celebration when marking habits complete
- **Responsive Design**: Adapts to different screen sizes

## 🤔 How It Works

The application uses the browser's `localStorage` API to store:
- Your daily habits and completion status
- Your current streak count
- Your selected mood theme
- The last completion date to calculate streaks

When you mark a habit as complete:
1. The data is saved to localStorage
2. The UI updates to reflect the completion
3. A confetti animation plays for positive reinforcement
4. Your streak and progress statistics are updated

## 🛠️ Project Structure


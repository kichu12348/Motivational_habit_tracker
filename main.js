const habitForm = document.getElementById('habit-form');
const habitInput = document.getElementById('habit-input');
const habitList = document.getElementById('habit-list');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const streakCount = document.getElementById('streak-count');
const motivationalQuote = document.getElementById('motivational-quote');
const moodButtons = document.querySelectorAll('.mood-btn');
const confettiContainer = document.getElementById('confetti-container');


let habits = [];
let currentMood = 'motivated';
let lastCompletionDate = null;
let currentStreak = 0;

const quotes = {
    motivated: [
        "The fire in your heart is going to burn down every obstacle in your way.",
        "Your determination creates your elevation.",
        "You don't have to be great to start, but you have to start to be great.",
        "Push yourself because no one else is going to do it for you.",
        "Small daily improvements are the key to staggering long-term results."
    ],
    calm: [
        "Focus on the step in front of you, not the whole staircase.",
        "Progress is progress, no matter how small.",
        "Clear mind, calm heart, steady progress.",
        "In the midst of movement and chaos, keep stillness inside of you.",
        "Breathe. Focus. Trust the process."
    ],
    relaxed: [
        "Growth happens at your own pace. Trust your journey.",
        "Consistency with peace of mind is better than intensity with anxiety.",
        "Nature does not hurry, yet everything is accomplished.",
        "Be gentle with yourself. You're doing the best you can.",
        "Small steps every day lead to massive changes over time."
    ],
    confident: [
        "You are capable of more than you know.",
        "Confidence is not 'they will like me.' Confidence is 'I'll be fine if they don't.'",
        "Your habits today determine your success tomorrow.",
        "Be so good they can't ignore you.",
        "The most powerful belief is the belief in yourself."
    ],
    disciplined: [
        "Discipline is choosing between what you want now and what you want most.",
        "Success is the sum of small efforts repeated day in and day out.",
        "Discipline is doing what needs to be done, even if you don't want to do it.",
        "Champions are built when no one is watching.",
        "The price of discipline is always less than the pain of regret."
    ]
};

function init() {
    loadFromLocalStorage();
    updateUI();
    setupEventListeners();
    checkStreak();
    updateRandomQuote();
}

function setupEventListeners() {
    habitForm.addEventListener('submit', addHabit);

    moodButtons.forEach(button => {
        button.addEventListener('click', () => {
            setMood(button.dataset.mood);
        });
    });
    
    updateActiveMoodButton();
}

function setMood(mood) {
    currentMood = mood;
    document.body.className = mood;
    saveToLocalStorage();
    updateActiveMoodButton();
    updateRandomQuote();
}

function updateActiveMoodButton() {
    moodButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.mood === currentMood) {
            btn.classList.add('active');
        }
    });
}

function updateRandomQuote() {
    const moodQuotes = quotes[currentMood];
    const randomIndex = Math.floor(Math.random() * moodQuotes.length);
    motivationalQuote.textContent = moodQuotes[randomIndex];
    motivationalQuote.classList.add('bounce');
    setTimeout(() => motivationalQuote.classList.remove('bounce'), 500);
}

function addHabit(e) {
    e.preventDefault();
    const habitText = habitInput.value.trim();
    
    if (habitText !== '') {
        const newHabit = {
            id: Date.now(),
            text: habitText,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        habits.push(newHabit);
        saveToLocalStorage();
        renderHabit(newHabit);
        updateProgress();
        
        habitInput.value = '';
    }
}

// Render a single habit item
function renderHabit(habit) {
    const habitItem = document.createElement('div');
    habitItem.classList.add('habit-item');
    if (habit.completed) {
        habitItem.classList.add('completed');
    }
    
    habitItem.innerHTML = `
        <div class="checkbox-container">
            <input type="checkbox" class="habit-checkbox" data-id="${habit.id}" ${habit.completed ? 'checked' : ''}>
        </div>
        <div class="habit-content">
            <p class="habit-text">${habit.text}</p>
        </div>
        <div class="habit-actions">
            <button class="habit-btn edit-btn" data-id="${habit.id}">
                <i class="fas fa-edit"></i>
            </button>
            <button class="habit-btn delete-btn" data-id="${habit.id}">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;

    const checkbox = habitItem.querySelector('.habit-checkbox');
    checkbox.addEventListener('change', () => toggleHabit(habit.id));
    
    const editBtn = habitItem.querySelector('.edit-btn');
    editBtn.addEventListener('click', () => editHabit(habit.id));
    
    const deleteBtn = habitItem.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => deleteHabit(habit.id));
    
    habitList.appendChild(habitItem);
}

function toggleHabit(id) {
    const habitIndex = habits.findIndex(habit => habit.id === id);
    if (habitIndex !== -1) {
        habits[habitIndex].completed = !habits[habitIndex].completed;
        saveToLocalStorage();
        updateUI();
        
        if (habits[habitIndex].completed) {
            createConfetti();
            checkStreak();
        }
    }
}

function editHabit(id) {
    const habitIndex = habits.findIndex(habit => habit.id === id);
    if (habitIndex !== -1) {
        const newText = prompt('Edit habit:', habits[habitIndex].text);
        if (newText && newText.trim() !== '') {
            habits[habitIndex].text = newText.trim();
            saveToLocalStorage();
            updateUI();
        }
    }
}

// Delete habit
function deleteHabit(id) {
    if (confirm('Are you sure you want to delete this habit?')) {
        habits = habits.filter(habit => habit.id !== id);
        saveToLocalStorage();
        updateUI();
    }
}

// Update progress bar and text
function updateProgress() {
    const total = habits.length;
    const completed = habits.filter(habit => habit.completed).length;
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
    
    progressBar.style.width = `${percentage}%`;
    progressText.textContent = `${percentage}%`;
}

// Update all UI elements
function updateUI() {
    habitList.innerHTML = '';
    habits.forEach(habit => renderHabit(habit));
    updateProgress();
    streakCount.textContent = `${currentStreak} days`;
}

// Check and update streak
function checkStreak() {
    const today = new Date().toDateString();
    
    if (habits.some(habit => habit.completed)) {
        if (lastCompletionDate === null || isYesterday(lastCompletionDate)) {
            currentStreak++;
            lastCompletionDate = today;
            saveToLocalStorage();
        } else if (lastCompletionDate !== today) {
            currentStreak = 1;
            lastCompletionDate = today;
            saveToLocalStorage();
        }
    }
    
    streakCount.textContent = `${currentStreak} days`;
}

function isYesterday(dateString) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toDateString() === dateString;
}

function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = `${Math.random() * 10 + 5}px`;
        confetti.style.height = `${Math.random() * 10 + 5}px`;
        confetti.style.backgroundColor = getRandomColor();
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = `-20px`;
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.opacity = Math.random();
        
        confettiContainer.appendChild(confetti);
        
        animateConfetti(confetti);
    }
}

function animateConfetti(element) {
    const animationDuration = Math.random() * 2000 + 1000; // 1-3 seconds
    const startTime = Date.now();
    const startLeft = parseFloat(element.style.left);
    
    function step() {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / animationDuration;
        
        if (progress < 1) {
            const top = progress * window.innerHeight;
            const swayAmount = Math.sin(progress * 10) * 50;
            element.style.top = `${top}px`;
            element.style.left = `calc(${startLeft}% + ${swayAmount}px)`;
            requestAnimationFrame(step);
        } else {
            element.remove();
        }
    }
    
    requestAnimationFrame(step);
}

function getRandomColor() {
    const colors = ['#FF6B6B', '#4A90E2', '#4CAF50', '#9C27B0', '#FFD93D', '#FF9800'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Save data to localStorage
function saveToLocalStorage() {
    const data = {
        habits,
        currentMood,
        lastCompletionDate,
        currentStreak
    };
    localStorage.setItem('habitTrackerData', JSON.stringify(data));
}

// Load data from localStorage
function loadFromLocalStorage() {
    const savedData = localStorage.getItem('habitTrackerData');
    
    if (savedData) {
        const data = JSON.parse(savedData);
        habits = data.habits || [];
        currentMood = data.currentMood || 'motivated';
        lastCompletionDate = data.lastCompletionDate || null;
        currentStreak = data.currentStreak || 0;
        document.body.className = currentMood;
    }
}

function resetDailyHabits() {
    const today = new Date().toDateString();
    const lastReset = localStorage.getItem('lastResetDate');
    
    if (lastReset !== today) {
        habits.forEach(habit => {
            habit.completed = false;
        });
        localStorage.setItem('lastResetDate', today);
        saveToLocalStorage();
        updateUI();
    }
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    init();
    resetDailyHabits();
});

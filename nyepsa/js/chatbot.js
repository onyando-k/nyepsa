// Chatbot responses
const responses = {
    "exam": "📚 Exam timetable is available in Student Resources. Next exams: 15th june 2026.",
    "join": "✨ To join: 1) Fill membership form 2) Pay KSh 500 3) Attend orientation.",
    "events": "📅 Upcoming: Health Camp (22 Nov), General Meeting (15 Nov). Check Events page!",
    "location": "📍 KMTC Nyeri Campus, Nyeri Town. Next to County Referral Hospital.",
    "notes": "📖 All notes & past papers in Student Resources. Members get exclusive access!",
    "default": "🤖 I can help with exam dates, events, membership, or resources. What do you need?"
};

const chatbotInput = document.querySelector('.chatbot-input input');
const chatbotMessages = document.querySelector('.chatbot-body');
const sendBtn = document.querySelector('.chatbot-input button');

sendBtn.addEventListener('click', sendMessage);
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const message = chatbotInput.value.trim();
    if (!message) return;

    // Add user message
    addMessage(message, 'user');
    chatbotInput.value = '';

    // Simulate bot response
    setTimeout(() => {
        const response = getResponse(message.toLowerCase());
        addMessage(response, 'bot');
    }, 1000);
}

function addMessage(text, sender) {
    const div = document.createElement('div');
    div.className = `message ${sender}`;
    div.textContent = text;
    chatbotMessages.appendChild(div);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function getResponse(message) {
    for (let key in responses) {
        if (message.includes(key)) {
            return responses[key];
        }
    }
    return responses.default;
}

// Open chatbot on WhatsApp click
document.querySelector('.whatsapp-float').addEventListener('click', () => {
    toggleChatbot();
});
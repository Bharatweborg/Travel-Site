// Initialize Firebase (replace with your config)
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrgIYbmnbcTsIiutXGyR8xPhtc5zuDOO4",
  authDomain: "submit-8e72a.firebaseapp.com",
  databaseURL: "https://submit-8e72a-default-rtdb.firebaseio.com",
  projectId: "submit-8e72a",
  storageBucket: "submit-8e72a.firebasestorage.app",
  messagingSenderId: "441207845723",
  appId: "1:441207845723:web:21866ba456c04e2996e07e",
  measurementId: "G-FRDS227R85"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Form submission
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        formMessage.style.color = 'red';
        formMessage.textContent = 'Please fill in all fields.';
        formMessage.style.display = 'block';
        return;
    }

    try {
        await db.collection('contacts').add({
            name,
            email,
            message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        formMessage.style.color = 'green';
        formMessage.textContent = 'Message sent successfully! Thank you.';
        formMessage.style.display = 'block';
        contactForm.reset();
    } catch (error) {
        formMessage.style.color = 'red';
        formMessage.textContent = 'Error sending message. Please try again later.';
        formMessage.style.display = 'block';
        console.error('Firestore error:', error);
    }
});

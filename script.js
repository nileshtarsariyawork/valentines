document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration ---
    const messageText = "Dearest Madhuri, From the moment you came into my life, everything felt brighter... You are my happiness, my laughter, and my greatest adventure.\n\n\"Distance means so little when someone means so much.\"\n\nNo matter the miles between us, my heart is always with you. Happy Valentine's Day! ❤️";
    const typewriterSpeed = 50; // ms per char

    // --- Elements ---
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    const startBtn = document.getElementById('startBtn');
    const messageSection = document.getElementById('message');
    const loveMessageContainer = document.getElementById('loveMessage');
    const envelope = document.getElementById('envelope');
    const openHeartBtn = document.getElementById('openHeartBtn');
    const restartBtn = document.getElementById('restartBtn');
    const screens = document.querySelectorAll('.screen');
    const bgHearts = document.getElementById('bgHearts');

    let isMusicPlaying = false;

    // --- Music Control ---
    musicToggle.addEventListener('click', () => {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicToggle.querySelector('.icon').textContent = '🎵';
        } else {
            bgMusic.play().catch(e => console.log("Audio play blocked", e));
            musicToggle.querySelector('.icon').textContent = '⏸️';
        }
        isMusicPlaying = !isMusicPlaying;
    });

    // --- Navigation & Typewriter ---
    startBtn.addEventListener('click', () => {
        // Attempt to play music on first interaction if not already playing
        if (!isMusicPlaying) {
            bgMusic.play().then(() => {
                isMusicPlaying = true;
                musicToggle.querySelector('.icon').textContent = '⏸️';
            }).catch(() => { });
        }

        messageSection.classList.remove('hidden');
        messageSection.scrollIntoView({ behavior: 'smooth' });

        // Start Typewriter after a small delay
        setTimeout(() => {
            typeWriter(messageText, loveMessageContainer);
        }, 1000);
    });

    function typeWriter(text, element, index = 0) {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            setTimeout(() => typeWriter(text, element, index + 1), typewriterSpeed);
        }
    }

    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    screens.forEach(screen => {
        observer.observe(screen);
    });

    // --- Surprise Interaction ---
    openHeartBtn.addEventListener('click', () => {
        envelope.classList.add('open');
        openHeartBtn.textContent = "You are loved! ❤️";
        createConfetti();

        // Scroll to ending after reading
        setTimeout(() => {
            document.getElementById('ending').scrollIntoView({ behavior: 'smooth' });
        }, 4000);
    });

    restartBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Reset states if needed
        setTimeout(() => {
            envelope.classList.remove('open');
            openHeartBtn.textContent = "Open My Heart 💌";
            loveMessageContainer.innerHTML = ""; // Clear text to re-type if desired, or leave it
        }, 1000);
    });

    // --- Floating Hearts Generator ---
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.textContent = Math.random() > 0.5 ? '❤️' : '💖';

        // Randomize position and size
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = Math.random() * 20 + 20 + 'px';
        heart.style.animationDuration = Math.random() * 5 + 5 + 's'; // 5-10s

        bgHearts.appendChild(heart);

        // Remove after animation
        setTimeout(() => {
            heart.remove();
        }, 10000);
    }

    setInterval(createHeart, 500);

    // --- Simple Confetti Effect ---
    function createConfetti() {
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = '50%';
            confetti.style.top = '50%';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = ['#ff6b6b', '#ffd1ff', '#ffffff', '#ff9a9e'][Math.floor(Math.random() * 4)];
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            document.body.appendChild(confetti);

            // Animate using Web Animations API
            const angle = Math.random() * Math.PI * 2;
            const velocity = 200 + Math.random() * 300;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;

            confetti.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
            ], {
                duration: 1000 + Math.random() * 1000,
                easing: 'cubic-bezier(0, .9, .57, 1)'
            }).onfinish = () => confetti.remove();
        }
    }
});

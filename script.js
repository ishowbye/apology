document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('hearts-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let hearts = [];

    function Heart(x, y, size, speed) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
        this.opacity = 1;
    }

    Heart.prototype.draw = function() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y + this.size / 4);
        ctx.quadraticCurveTo(this.x, this.y, this.x + this.size / 4, this.y);
        ctx.quadraticCurveTo(this.x + this.size / 2, this.y, this.x + this.size / 2, this.y + this.size / 4);
        ctx.quadraticCurveTo(this.x + this.size / 2, this.y, this.x + this.size * 3 / 4, this.y);
        ctx.quadraticCurveTo(this.x + this.size, this.y, this.x + this.size, this.y + this.size / 4);
        ctx.quadraticCurveTo(this.x + this.size, this.y + this.size / 2, this.x + this.size * 3 / 4, this.y + this.size * 3 / 4);
        ctx.lineTo(this.x + this.size / 2, this.y + this.size);
        ctx.lineTo(this.x + this.size / 4, this.y + this.size * 3 / 4);
        ctx.quadraticCurveTo(this.x, this.y + this.size / 2, this.x, this.y + this.size / 4);
        ctx.fillStyle = `rgba(255, 105, 180, ${this.opacity})`;
        ctx.fill();
        ctx.closePath();
    };

    Heart.prototype.update = function() {
        this.y -= this.speed;
        if (this.y < 0) {
            this.y = canvas.height + this.size;
        }
        this.draw();
    };

    function createHearts() {
        for (let i = 0; i < 50; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = Math.random() * 20 + 10;
            const speed = Math.random() * 2 + 1;
            hearts.push(new Heart(x, y, size, speed));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        hearts.forEach(heart => {
            heart.update();
        });
        requestAnimationFrame(animate);
    }

    createHearts();
    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        hearts = [];
        createHearts();
    });

    const apologyBtn = document.getElementById('apology-btn');
    const iceCreamBtn = document.getElementById('ice-cream-btn');
    const dynamicMessage = document.getElementById('dynamic-message');

    iceCreamBtn.addEventListener('click', () => {
        const yourNumber = '919445104761';
        const message = encodeURIComponent('I accept your apology, get me ice cream');
        const whatsappUrl = `https://wa.me/${yourNumber}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    });

    const messages = [
"I promise to always make time for you. ❤️⏳",

"You are my priority, always and forever. 💖🏆",

"Let's create more beautiful memories together. 📸✨",

"My world is empty without you in it. 🌍💔",

"Forgive me? Let's go on a date! 🙏💐🍽️"
    ];

    let messageIndex = 0;

    apologyBtn.addEventListener('click', () => {
        if (messageIndex >= messages.length) {
            messageIndex = 0; // Reset to show messages again
        }

        const message = messages[messageIndex];
        dynamicMessage.innerHTML = ''; // Clear previous message
        typeWriter(message, 0);
        messageIndex++;
    });

    function typeWriter(txt, i) {
        if (i < txt.length) {
            dynamicMessage.innerHTML += txt.charAt(i);
            i++;
            setTimeout(() => typeWriter(txt, i), 50);
        }
    }
});

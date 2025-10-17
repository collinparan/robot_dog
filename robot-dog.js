class RobotDog {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.isAnimating = false;
        this.animationFrame = 0;
        this.speed = 5;
        this.legAngle = 0;
        this.tailAngle = 0;
        this.direction = 1; // 1 for right, -1 for left
        
        this.draw();
    }
    
    // Helper method to draw rounded rectangles for better browser compatibility
    drawRoundedRect(x, y, width, height, radius) {
        this.ctx.beginPath();
        this.ctx.moveTo(x + radius, y);
        this.ctx.lineTo(x + width - radius, y);
        this.ctx.arc(x + width - radius, y + radius, radius, Math.PI * 1.5, Math.PI * 2);
        this.ctx.lineTo(x + width, y + height - radius);
        this.ctx.arc(x + width - radius, y + height - radius, radius, 0, Math.PI * 0.5);
        this.ctx.lineTo(x + radius, y + height);
        this.ctx.arc(x + radius, y + height - radius, radius, Math.PI * 0.5, Math.PI);
        this.ctx.lineTo(x, y + radius);
        this.ctx.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 1.5);
        this.ctx.closePath();
    }
    
    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Save context state
        this.ctx.save();
        
        // Draw ground line
        this.ctx.strokeStyle = '#8B4513';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.canvas.height - 100);
        this.ctx.lineTo(this.canvas.width, this.canvas.height - 100);
        this.ctx.stroke();
        
        // Translate to dog position
        this.ctx.translate(this.x, this.y);
        
        // Flip horizontally if moving left
        if (this.direction === -1) {
            this.ctx.scale(-1, 1);
        }
        
        // Draw body
        this.drawBody();
        
        // Draw head
        this.drawHead();
        
        // Draw legs
        this.drawLegs();
        
        // Draw tail
        this.drawTail();
        
        // Restore context state
        this.ctx.restore();
    }
    
    drawBody() {
        // Main body
        this.ctx.fillStyle = '#4A90E2';
        this.ctx.strokeStyle = '#2E5C8A';
        this.ctx.lineWidth = 3;
        
        // Body rectangle with rounded corners
        this.drawRoundedRect(-60, -30, 120, 50, 10);
        this.ctx.fill();
        this.ctx.stroke();
        
        // Body details (segments)
        this.ctx.strokeStyle = '#2E5C8A';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(-20, -30);
        this.ctx.lineTo(-20, 20);
        this.ctx.moveTo(20, -30);
        this.ctx.lineTo(20, 20);
        this.ctx.stroke();
    }
    
    drawHead() {
        // Head
        this.ctx.fillStyle = '#4A90E2';
        this.ctx.strokeStyle = '#2E5C8A';
        this.ctx.lineWidth = 3;
        
        // Head circle
        this.ctx.beginPath();
        this.ctx.arc(70, -5, 25, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
        
        // Snout
        this.ctx.fillStyle = '#5BA3F5';
        this.ctx.beginPath();
        this.ctx.arc(90, 0, 12, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
        
        // Nose
        this.ctx.fillStyle = '#000';
        this.ctx.beginPath();
        this.ctx.arc(97, 0, 5, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Eyes
        this.ctx.fillStyle = '#000';
        this.ctx.beginPath();
        this.ctx.arc(65, -12, 4, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Eye shine
        this.ctx.fillStyle = '#fff';
        this.ctx.beginPath();
        this.ctx.arc(66, -13, 2, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Ears
        this.ctx.fillStyle = '#4A90E2';
        this.ctx.strokeStyle = '#2E5C8A';
        this.ctx.lineWidth = 2;
        
        // Left ear
        this.ctx.beginPath();
        this.ctx.moveTo(55, -25);
        this.ctx.lineTo(50, -40);
        this.ctx.lineTo(60, -30);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
        
        // Right ear
        this.ctx.beginPath();
        this.ctx.moveTo(75, -25);
        this.ctx.lineTo(80, -40);
        this.ctx.lineTo(70, -30);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
    }
    
    drawLegs() {
        this.ctx.strokeStyle = '#4A90E2';
        this.ctx.lineWidth = 8;
        this.ctx.lineCap = 'round';
        
        // Calculate leg positions with animation
        const frontLegOffset = this.isAnimating ? Math.sin(this.legAngle) * 15 : 0;
        const backLegOffset = this.isAnimating ? Math.sin(this.legAngle + Math.PI) * 15 : 0;
        
        // Front left leg
        this.ctx.beginPath();
        this.ctx.moveTo(40, 20);
        this.ctx.lineTo(40 + frontLegOffset, 60);
        this.ctx.stroke();
        
        // Front left paw
        this.ctx.fillStyle = '#2E5C8A';
        this.ctx.beginPath();
        this.ctx.arc(40 + frontLegOffset, 60, 6, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Back left leg
        this.ctx.strokeStyle = '#4A90E2';
        this.ctx.beginPath();
        this.ctx.moveTo(-40, 20);
        this.ctx.lineTo(-40 + backLegOffset, 60);
        this.ctx.stroke();
        
        // Back left paw
        this.ctx.fillStyle = '#2E5C8A';
        this.ctx.beginPath();
        this.ctx.arc(-40 + backLegOffset, 60, 6, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Front right leg (slightly offset for depth)
        this.ctx.strokeStyle = '#3A7AC2';
        this.ctx.beginPath();
        this.ctx.moveTo(45, 20);
        this.ctx.lineTo(45 - frontLegOffset, 60);
        this.ctx.stroke();
        
        // Front right paw
        this.ctx.fillStyle = '#2E5C8A';
        this.ctx.beginPath();
        this.ctx.arc(45 - frontLegOffset, 60, 6, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Back right leg (slightly offset for depth)
        this.ctx.strokeStyle = '#3A7AC2';
        this.ctx.beginPath();
        this.ctx.moveTo(-35, 20);
        this.ctx.lineTo(-35 - backLegOffset, 60);
        this.ctx.stroke();
        
        // Back right paw
        this.ctx.fillStyle = '#2E5C8A';
        this.ctx.beginPath();
        this.ctx.arc(-35 - backLegOffset, 60, 6, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    drawTail() {
        this.ctx.strokeStyle = '#4A90E2';
        this.ctx.lineWidth = 6;
        this.ctx.lineCap = 'round';
        
        // Calculate tail wag
        const tailWag = this.isAnimating ? Math.sin(this.tailAngle) * 20 : 0;
        
        // Tail
        this.ctx.beginPath();
        this.ctx.moveTo(-60, -10);
        this.ctx.quadraticCurveTo(-80, -20 + tailWag, -90, -30 + tailWag);
        this.ctx.stroke();
        
        // Tail tip
        this.ctx.fillStyle = '#4A90E2';
        this.ctx.beginPath();
        this.ctx.arc(-90, -30 + tailWag, 5, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    animate() {
        if (this.isAnimating) {
            // Update animation parameters
            this.legAngle += 0.15 * (this.speed / 5);
            this.tailAngle += 0.2 * (this.speed / 5);
            
            // Move the dog
            this.x += this.direction * (this.speed / 5);
            
            // Bounce back if hitting edges
            if (this.x > this.canvas.width - 100) {
                this.direction = -1;
            } else if (this.x < 100) {
                this.direction = 1;
            }
            
            this.draw();
            this.animationFrame = requestAnimationFrame(() => this.animate());
        }
    }
    
    start() {
        if (!this.isAnimating) {
            this.isAnimating = true;
            this.animate();
        }
    }
    
    stop() {
        this.isAnimating = false;
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        this.draw();
    }
    
    reset() {
        this.stop();
        this.x = this.canvas.width / 2;
        this.y = this.canvas.height / 2;
        this.legAngle = 0;
        this.tailAngle = 0;
        this.direction = 1;
        this.draw();
    }
    
    setSpeed(speed) {
        this.speed = speed;
    }
}

// Initialize the robot dog
const canvas = document.getElementById('dogCanvas');
const robotDog = new RobotDog(canvas);

// Set up controls
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const speedSlider = document.getElementById('speedSlider');
const speedValue = document.getElementById('speedValue');

startBtn.addEventListener('click', () => {
    robotDog.start();
});

stopBtn.addEventListener('click', () => {
    robotDog.stop();
});

resetBtn.addEventListener('click', () => {
    robotDog.reset();
});

speedSlider.addEventListener('input', (e) => {
    const speed = parseInt(e.target.value);
    speedValue.textContent = speed;
    robotDog.setSpeed(speed);
});

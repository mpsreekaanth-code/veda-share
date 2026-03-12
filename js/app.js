const app = {
    state: {
        currentUser: null,
        activeView: 'home',
        enrolledCommunities: [],
        communities: [
            { id: 1, name: 'Aero Dynamics Elite', members: 18, topic: 'Aerodynamics', credits: 4500, description: 'Focused on high-speed fluid dynamics and propulsion systems.' },
            { id: 2, name: 'Quantum Physics Initiative', members: 12, topic: 'Quantum Physics', credits: 3200, description: 'Exploring the subatomic realm and entanglement.' },
            { id: 3, name: 'Stellar Astronomers', members: 20, topic: 'Astronomy', credits: 5100, description: 'Deep space observation and stellar evolution study.' },
            { id: 4, name: 'Martian Architects', members: 5, topic: 'Astrophysics', credits: 800, description: 'Designing habitats for extraterrestrial colonisation.' }
        ],
        events: [
            { id: 1, title: 'Supersonic Simulation', topic: 'Aerodynamics', date: '2026-04-15', prize: 1000 },
            { id: 2, title: 'Nebula Mapping Contest', topic: 'Astronomy', date: '2026-04-22', prize: 1500 },
            { id: 3, title: 'The Great Physics Decathlon', topic: 'Physics', date: '2026-05-05', prize: 2000 },
            { id: 4, title: 'Math-Core Integration', topic: 'Mathematics', date: '2026-05-18', prize: 1800 },
            { id: 5, title: 'Molecular Stability Probe', topic: 'Chemistry', date: '2026-06-02', prize: 1100 },
            { id: 6, title: 'Deep Space Astrophysics', topic: 'Astrophysics', date: '2026-06-15', prize: 2500 }
        ],
        library: [
            { id: 1, name: 'Aero-Propulsion Fundamentals', category: 'Research Paper', type: 'PDF', hub: 'Aero Dynamics Elite' },
            { id: 2, name: 'Quantum Computing 101', category: 'Interactive Mod', type: 'DATA', hub: 'Quantum Physics Initiative' },
            { id: 3, name: 'Galaxy Atlas Vol. 4', category: 'Imaging', type: 'IMG', hub: 'Stellar Astronomers' }
        ]
    },

    init() {
        this.renderCommunities();
        this.renderEvents();
        this.renderLibrary();
        this.initKnowledgeBackground();
        console.log("Veda Share system online.");
    },

    initKnowledgeBackground() {
        const canvas = document.getElementById('knowledge-canvas');
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const symbols = ['Σ', 'π', 'Ω', 'λ', '∞', '∫', 'Δ', 'θ', 'Ψ', 'Φ', 'E=mc²', 'H₂O', 'Fe', 'NaCl', 'CO₂'];
        const particles = [];
        const count = 100;

        class Particle {
            constructor() {
                this.phi = Math.random() * Math.PI * 2;
                this.theta = Math.random() * Math.PI;
                this.radius = 250;
                this.text = symbols[Math.floor(Math.random() * symbols.length)];
                this.size = Math.random() * 10 + 10;
                this.speed = Math.random() * 0.01 + 0.005;
            }

            update() {
                this.phi += this.speed;
                // Simple 3D to 2D projection
                this.x3d = this.radius * Math.sin(this.theta) * Math.cos(this.phi);
                this.y3d = this.radius * Math.sin(this.theta) * Math.sin(this.phi);
                this.z3d = this.radius * Math.cos(this.theta);

                // Perspective projection
                const scale = 400 / (400 - this.z3d);
                this.x = width / 2 + this.x3d * scale;
                this.y = height / 2 + this.y3d * scale;
                this.opacity = (this.z3d + this.radius) / (this.radius * 2);
            }

            draw() {
                ctx.fillStyle = `rgba(0, 242, 255, ${this.opacity})`;
                ctx.font = `${this.size * (this.opacity + 0.5)}px Rajdhani`;
                ctx.fillText(this.text, this.x, this.y);
            }
        }

        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            // Sort by depth for better visual
            particles.sort((a,b) => a.z3d - b.z3d);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        }

        animate();

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });
    },

    toggleAuth(type) {
        const loginForm = document.getElementById('login-form');
        const signupForm = document.getElementById('signup-form');
        
        if (type === 'signup') {
            gsap.to(loginForm, { opacity: 0, x: -20, duration: 0.3, onComplete: () => {
                loginForm.style.display = 'none';
                signupForm.style.display = 'block';
                gsap.fromTo(signupForm, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.3 });
            }});
        } else {
            gsap.to(signupForm, { opacity: 0, x: 20, duration: 0.3, onComplete: () => {
                signupForm.style.display = 'none';
                loginForm.style.display = 'block';
                gsap.fromTo(loginForm, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.3 });
            }});
        }
    },

    login() {
        // Simulation of login
        gsap.to('#auth-page', { opacity: 0, scale: 0.9, duration: 0.5, onComplete: () => {
            document.getElementById('auth-page').style.display = 'none';
            const dashboard = document.getElementById('dashboard');
            dashboard.style.display = 'block';
            gsap.to(dashboard, { opacity: 1, duration: 0.5 });
            this.init();
            // Automatically switch to communities for selection/enrollment
            this.switchView('communities');
        }});
    },

    logout() {
        gsap.to('#dashboard', { opacity: 0, duration: 0.5, onComplete: () => {
            document.getElementById('dashboard').style.display = 'none';
            const authPage = document.getElementById('auth-page');
            authPage.style.display = 'flex';
            gsap.to(authPage, { opacity: 1, scale: 1, duration: 0.5 });
        }});
    },

    switchView(viewId) {
        const sections = document.querySelectorAll('.view-section');
        const navItems = document.querySelectorAll('.nav-item');
        
        sections.forEach(s => s.classList.remove('active'));
        navItems.forEach(n => n.classList.remove('active'));

        document.getElementById(`${viewId}-view`).classList.add('active');
        
        // Find and highlight correct nav item
        navItems.forEach(n => {
            if (n.textContent.toLowerCase().includes(viewId)) {
                n.classList.add('active');
            }
        });

        const section = document.getElementById(`${viewId}-view`);
        gsap.fromTo(section.children, 
            { opacity: 0, y: 30, filter: 'blur(10px)' }, 
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, stagger: 0.1, ease: "power2.out" }
        );

        // Auto-close sidebar on mobile
        if (window.innerWidth <= 992) {
            this.toggleSidebar(false);
        }
    },

    toggleSidebar(forceState) {
        const sidebar = document.getElementById('sidebar');
        const isOpen = sidebar.classList.contains('open');
        const newState = forceState !== undefined ? forceState : !isOpen;

        if (newState) {
            sidebar.classList.add('open');
        } else {
            sidebar.classList.remove('open');
        }
    },

    renderCommunities() {
        const container = document.getElementById('community-list');
        container.innerHTML = this.state.communities.map(hub => {
            const isEnrolled = this.state.enrolledCommunities.includes(hub.id);
            return `
                <div class="community-card glass">
                    <div style="display: flex; justify-content: space-between; align-items: start;">
                        <h3>${hub.name}</h3>
                        <span class="badge" style="background: ${this.getTopicColor(hub.topic)}">${hub.topic}</span>
                    </div>
                    <p style="color: var(--text-secondary); font-size: 0.9rem; margin: 15px 0;">${hub.description}</p>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;">
                        <div>
                            <small style="display: block; color: var(--text-secondary);">MEMBERS</small>
                            <span>${hub.members + (isEnrolled ? 1 : 0)}/20</span>
                        </div>
                        <div>
                            <small style="display: block; color: var(--text-secondary);">CREDITS</small>
                            <span style="color: var(--neon-blue); font-weight: bold;">${hub.credits}</span>
                        </div>
                    </div>
                    <div style="display: flex; gap: 10px; margin-top: 20px;">
                        ${isEnrolled ? 
                            `<button class="neon-btn" style="flex: 2; font-size: 0.8rem;" onclick="app.startVideoCall('${hub.name}')">
                                <i data-lucide="video" style="width:14px; margin-right:5px;"></i> VIDEO CALL
                             </button>
                             <button class="neon-btn" style="flex: 1; font-size: 0.8rem; border-color: var(--neon-purple); color: var(--neon-purple);" onclick="app.unenroll(${hub.id})">LEAVE</button>` :
                            `<button class="neon-btn" style="width: 100%; font-size: 0.8rem;" ${hub.members >= 20 ? 'disabled' : ''} onclick="app.enroll(${hub.id})">
                                ${hub.members >= 20 ? 'HUB FULL' : 'ENROLL IN HUB'}
                             </button>`
                        }
                    </div>
                </div>
            `;
        }).join('');
        lucide.createIcons();
    },

    enroll(id) {
        this.state.enrolledCommunities.push(id);
        this.renderCommunities();
        // Visual feedback
        gsap.to('.community-card', { scale: 1.02, duration: 0.1, yoyo: true, repeat: 1 });
    },

    unenroll(id) {
        this.state.enrolledCommunities = this.state.enrolledCommunities.filter(cid => cid !== id);
        this.renderCommunities();
    },

    startVideoCall(hubName) {
        document.getElementById('call-title').innerText = `${hubName.toUpperCase()} SESSION`;
        const overlay = document.getElementById('video-call-overlay');
        overlay.style.display = 'flex';
        gsap.fromTo(overlay, { y: '100%' }, { y: '0%', duration: 0.6, ease: "power4.out" });
        lucide.createIcons();
    },

    endVideoCall() {
        const overlay = document.getElementById('video-call-overlay');
        gsap.to(overlay, { y: '100%', duration: 0.6, ease: "power4.in", onComplete: () => {
            overlay.style.display = 'none';
        }});
    },

    renderEvents() {
        const container = document.getElementById('events-list');
        container.innerHTML = this.state.events.map(event => `
            <div class="stat-card glass" style="text-align: left; position: relative; overflow: hidden;">
                <div style="position: absolute; top: 0; right: 0; padding: 10px; background: rgba(0,242,255,0.1); font-size: 0.7rem;">
                    ${event.topic}
                </div>
                <h3 style="margin-bottom: 5px;">${event.title}</h3>
                <p style="color: var(--text-secondary); margin-bottom: 10px;">Date: ${event.date}</p>
                <div style="color: gold; margin-bottom: 15px;">+${event.prize} Credits</div>
                <div style="display: flex; gap: 10px;">
                    <button class="neon-btn" style="flex: 1; padding: 8px; font-size: 0.7rem;">Enroll</button>
                    <button class="neon-btn" style="flex: 1; padding: 8px; font-size: 0.7rem; border-color: var(--neon-pink); color: var(--neon-pink);" onclick="app.startVideoCall('${event.title}')">Synergy</button>
                </div>
            </div>
        `).join('');
        lucide.createIcons();
    },

    renderLibrary() {
        const container = document.getElementById('library-list');
        container.innerHTML = this.state.library.map(item => `
            <tr>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td><span style="color: var(--neon-purple);">${item.type}</span></td>
                <td>${item.hub}</td>
                <td><button class="neon-btn" style="padding: 5px 10px; font-size: 0.7rem;">Access</button></td>
            </tr>
        `).join('');
    },

    getTopicColor(topic) {
        const colors = {
            'Aerodynamics': '#00f2ff',
            'Quantum Physics': '#9d00ff',
            'Astronomy': '#ff00d4',
            'Astrophysics': '#ff9900'
        };
        return colors[topic] || '#ffffff';
    },

    openModal(type) {
        const container = document.getElementById('modal-container');
        const content = document.getElementById('modal-content');
        
        container.style.display = 'flex';
        gsap.fromTo(container, { opacity: 0 }, { opacity: 1, duration: 0.3 });

        if (type === 'create-community') {
            content.innerHTML = `
                <h2 style="color: var(--neon-blue); margin-bottom: 20px;">Initialize Hub</h2>
                <div class="input-group">
                    <label>Hub Name</label>
                    <input type="text" id="new-hub-name" placeholder="E.g. Lunar Geologists">
                </div>
                <div class="input-group">
                    <label>Primary Topic</label>
                    <select id="new-hub-topic">
                        <option>Aerodynamics</option>
                        <option>Quantum Physics</option>
                        <option>Astrophysics</option>
                        <option>Chemistry</option>
                        <option>Mathematics</option>
                    </select>
                </div>
                <div class="input-group">
                    <label>Objective</label>
                    <textarea id="new-hub-desc" style="width:100%; height:100px; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); color: white; border-radius: 8px; padding: 10px;"></textarea>
                </div>
                <button class="neon-btn" style="width: 100%;" onclick="app.createCommunity()">Transmit Data</button>
            `;
        }
    },

    closeModal() {
        const container = document.getElementById('modal-container');
        gsap.to(container, { opacity: 0, duration: 0.3, onComplete: () => {
            container.style.display = 'none';
        }});
    },

    createCommunity() {
        const name = document.getElementById('new-hub-name').value;
        const topic = document.getElementById('new-hub-topic').value;
        const desc = document.getElementById('new-hub-desc').value;

        if (!name || !desc) {
            alert("Transmission incomplete. Fill all fields.");
            return;
        }

        const newHub = {
            id: this.state.communities.length + 1,
            name,
            members: 1,
            topic,
            credits: 0,
            description: desc
        };

        this.state.communities.unshift(newHub);
        this.renderCommunities();
        this.closeModal();
    }
};

// Start the app when script loads
document.addEventListener('DOMContentLoaded', () => {
    app.initKnowledgeBackground();
    // Reveal auth page with animation
    gsap.from('.auth-container', { opacity: 0, scale: 0.8, duration: 1, ease: "back.out(1.7)" });
});

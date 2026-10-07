/**
 * =========================================================
 * AKSHITH KHEERAN K R - PORTFOLIO JAVASCRIPT ENGINE
 * Vertical Nav ScrollSpy, Theme Switcher, AI Chatbot,
 * Project Modals, and Email Form API Simulation.
 * =========================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    // ---------------------------------------------------------
    // 1. NIGHT / LIGHT THEME TOGGLE & MEDIA QUERY DETECTION
    // ---------------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const mobileThemeToggleBtn = document.getElementById('mobile-theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Check localStorage or default to dark
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    const toggleTheme = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
    if (mobileThemeToggleBtn) mobileThemeToggleBtn.addEventListener('click', toggleTheme);

    // ---------------------------------------------------------
    // 2. VERTICAL SIDEBAR SCROLLSPY & SMOOTH NAVIGATION
    // ---------------------------------------------------------
    const navItems = document.querySelectorAll('.sidebar-nav-item');
    const sections = document.querySelectorAll('section[id]');

    const updateActiveNavOnScroll = () => {
        const scrollPosition = window.scrollY + 180;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', updateActiveNavOnScroll, { passive: true });

    // Smooth anchor scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ---------------------------------------------------------
    // 3. MOBILE DRAWER NAVIGATION
    // ---------------------------------------------------------
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');

    if (mobileNavToggle && mobileDrawer) {
        mobileNavToggle.addEventListener('click', () => {
            const isOpen = mobileDrawer.classList.toggle('open');
            mobileNavToggle.setAttribute('aria-expanded', isOpen.toString());
        });

        // Close drawer on click of any mobile link
        mobileDrawer.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileDrawer.classList.remove('open');
                mobileNavToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ---------------------------------------------------------
    // 4. PROJECT CATEGORY FILTERING
    // ---------------------------------------------------------
    const filterTabs = document.querySelectorAll('.filter-tab');
    const projectCards = document.querySelectorAll('.project-card');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });

            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');

            const filterValue = tab.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ---------------------------------------------------------
    // 5. PROJECT DETAIL MODAL
    // ---------------------------------------------------------
    const projectData = {
        orca: {
            tag: "AI & MULTI-AGENT MARINE INTELLIGENCE • SIH 2026",
            title: "ORCA – Ocean Reasoning with Collaborative Agents",
            desc: "Developed as a shortlisted solution in Smart India Hackathon 2026 by Team Nexora (Team ID: 14916). ORCA integrates satellite multi-spectral data, AIS telemetry, buoy feeds, and sonar inputs into a collaborative multi-agent decision support platform that detects and analyzes ocean events (algal blooms, oil spills, illegal fishing, coral bleaching, and cyclone impacts) with evidence-fused confidence scoring.",
            tech: ["Python", "Gemini AI", "Multi-Agent System", "Satellite Data", "Google Cloud Run"],
            link: "https://shore-signal-hub.preview.emergentagent.com/?utm_source=share"
        },
        smokedetector: {
            tag: "IOT / EMBEDDED SYSTEMS • VTU IPBL",
            title: "Smart Smoke & Gas Hazard Detection System",
            desc: "An IoT-based safety monitoring prototype engineered as an Integrated Project-Based Learning (IPBL) project at AIT Chikkamagaluru. Features an Arduino Uno connected to an MQ135 gas sensor, ultrasonic distance alerts, buzzer/LED warning indicators, and ESP-CAM / FTDI integration for hazard monitoring.",
            tech: ["Arduino Uno", "MQ135 Gas Sensor", "ESP-CAM", "Ultrasonic Sensor", "FTDI", "IoT"],
            link: "https://github.com/akshithkheeran2008-ctrl"
        },
        cloudgenai: {
            tag: "GOOGLE CLOUD • GEMINI AI & AGENTS",
            title: "Google Cloud & GenAI Projects",
            desc: "Hands-on projects leveraging Google Cloud, Gemini LLMs, Google ADK, and serverless deployments. Includes the Cloud Run Coffee Shop Agent (GCP project: third-campus-506208-n9, service: coffee-mgr-agent, region: us-central1), Gemini 2.5 Flash agent applications, and Cymbal Travel/Shops cloud architectures verified on Google Cloud Skills Boost.",
            tech: ["Google Cloud", "Gemini 2.5 Flash", "Google ADK", "Cloud Run", "AI Agents", "Docker"],
            link: "https://www.skills.google/public_profiles/5671602d-89ff-4abf-a962-d44b1642a5b9"
        },
        awscloud: {
            tag: "AMAZON WEB SERVICES • CLOUD COMPUTING",
            title: "AWS Cloud Projects & Architecture",
            desc: "Hands-on cloud projects focused on AWS core services, cloud application development, deployment workflows, scalable cloud solutions, and cloud architecture fundamentals. Actively engaged in cloud learning including the AWS × Bharat Builds Tour 2026.",
            tech: ["AWS Cloud", "Cloud Application Dev", "Deployment", "Scalability", "Architecture"],
            link: "https://github.com/akshithkheeran2008-ctrl"
        },
        kaggle: {
            tag: "DATA SCIENCE & ML EXPERIMENTATION",
            title: "Kaggle & Data Science Projects",
            desc: "Practical exploratory data analysis (EDA), data cleaning, statistical evaluation, and machine learning experimentation conducted through Kaggle platforms and Google Cloud data tools as part of the Kaggle Data Science Workshop.",
            tech: ["Data Science", "Kaggle", "Python", "Machine Learning", "Data Analysis"],
            link: "https://github.com/akshithkheeran2008-ctrl"
        }
    };

    window.openProjectModal = (projectId) => {
        const modal = document.getElementById('project-modal');
        const project = projectData[projectId];
        if (!modal || !project) return;

        document.getElementById('modal-project-tag').textContent = project.tag;
        document.getElementById('modal-title').textContent = project.title;
        document.getElementById('modal-desc').textContent = project.desc;
        
        const techContainer = document.getElementById('modal-tech');
        techContainer.innerHTML = project.tech.map(t => `<span class="skill-pill">${t}</span>`).join('');

        const linkEl = document.getElementById('modal-link');
        linkEl.href = project.link;

        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
    };

    window.closeProjectModal = () => {
        const modal = document.getElementById('project-modal');
        if (modal) {
            modal.classList.remove('open');
            modal.setAttribute('aria-hidden', 'true');
        }
    };

    // Close modal on escape key or clicking backdrop
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') window.closeProjectModal();
    });

    const projectModal = document.getElementById('project-modal');
    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) window.closeProjectModal();
        });
    }

    // ---------------------------------------------------------
    // 6. AI CHAT INTERFACE SIMULATION & API HOOK (Prompt 10)
    // ---------------------------------------------------------
    const chatMessagesContainer = document.getElementById('chat-messages');
    const chatUserInput = document.getElementById('chat-user-input');

    const appendChatMessage = (sender, messageHtml) => {
        if (!chatMessagesContainer) return;

        const isUser = sender === 'user';
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-msg ${isUser ? 'user-msg' : 'bot-msg'}`;
        
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        msgDiv.innerHTML = `
            <span class="msg-avatar">${isUser ? '👤' : '🤖'}</span>
            <div class="msg-bubble">
                <p>${messageHtml}</p>
                <span class="msg-timestamp">${timestamp}</span>
            </div>
        `;

        chatMessagesContainer.appendChild(msgDiv);
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    };

    // Accurate Knowledge Base for Akshith Kheeran K R
    const generateBotReply = (query) => {
        const lower = query.toLowerCase();

        if (lower.includes('orca') || lower.includes('marine') || lower.includes('ocean')) {
            return "<strong>ORCA</strong> (Ocean Reasoning with Collaborative Agents) is Akshith's flagship marine intelligence platform shortlisted in <strong>Smart India Hackathon 2026</strong> (Team Nexora, ID: 14916). It integrates satellite data, AIS telemetry, buoys, and sonar into a multi-agent system to detect algal blooms, oil spills, and illegal fishing!";
        } else if (lower.includes('college') || lower.includes('branch') || lower.includes('education') || lower.includes('degree') || lower.includes('vtu') || lower.includes('ait') || lower.includes('ise')) {
            return "Akshith is a <strong>2nd-year B.E. student in Information Science and Engineering (ISE)</strong> at <strong>Adichunchanagiri Institute of Technology (AIT), Chikkamagaluru</strong>, affiliated with <strong>VTU</strong>. He maintained an <strong>8.40 SGPA</strong> in his 2nd semester (8.05 in 1st sem)!";
        } else if (lower.includes('skill') || lower.includes('java') || lower.includes('python') || lower.includes('cloud') || lower.includes('aws') || lower.includes('gcp') || lower.includes('stack')) {
            return "Akshith's core technical skills include <strong>Java, Python, JavaScript, SQL, HTML/CSS</strong>, Cloud Platforms (<strong>AWS & Google Cloud</strong>, Cloud Run), and AI/GenAI tools (<strong>Google Gemini, Google ADK, AI Agents</strong>, Multi-Agent Systems).";
        } else if (lower.includes('hackathon') || lower.includes('winner') || lower.includes('budget') || lower.includes('iqoo') || lower.includes('achievement')) {
            return "Akshith is the <strong>National-level Grand Finale Winner of MY Bharat Budget Quest 2026</strong>, was <strong>Shortlisted in Smart India Hackathon 2026</strong> for ORCA, and competed in the <strong>iQOO Hackathon 2026 in Hyderabad</strong>!";
        } else if (lower.includes('smoke') || lower.includes('iot') || lower.includes('arduino') || lower.includes('hardware')) {
            return "For his VTU IPBL project, Akshith built a <strong>Smart Smoke Detector</strong> using an <strong>Arduino Uno, MQ135 gas sensor, ultrasonic distance alerts, buzzer/LED sirens</strong>, and ESP-CAM video streaming.";
        } else if (lower.includes('contact') || lower.includes('email') || lower.includes('phone') || lower.includes('reach') || lower.includes('link') || lower.includes('github') || lower.includes('linkedin') || lower.includes('credly')) {
            return "You can reach Akshith directly via email at <a href='mailto:akshithkheeran.iseait@gmail.com' style='color:var(--brand-cyan); text-decoration:underline;'>akshithkheeran.iseait@gmail.com</a> or phone at <a href='tel:+919480948355' style='color:var(--brand-cyan); text-decoration:underline;'>+91 9480948355</a>. You can also connect on <a href='https://github.com/akshithkheeran2008-ctrl' target='_blank' style='color:var(--brand-cyan); text-decoration:underline;'>GitHub</a>, <a href='https://www.linkedin.com/in/akshith-kheeran-k-r-a08610395/' target='_blank' style='color:var(--brand-cyan); text-decoration:underline;'>LinkedIn</a>, <a href='https://www.credly.com/users/akshith-kheeran-k-r' target='_blank' style='color:var(--brand-cyan); text-decoration:underline;'>Credly</a>, and <a href='https://www.skills.google/public_profiles/5671602d-89ff-4abf-a962-d44b1642a5b9' target='_blank' style='color:var(--brand-cyan); text-decoration:underline;'>Google Skills</a>!";
        } else {
            return "Hello! I'm Akshith's portfolio AI assistant. Akshith is a 2nd-year Information Science & Engineering student at AIT Chikkamagaluru focused on Java, AWS, Google Cloud, and Gemini AI. Feel free to ask about his ORCA project, hackathons, or skills!";
        }
    };

    window.handleUserMessage = () => {
        if (!chatUserInput) return;
        const userText = chatUserInput.value.trim();
        if (!userText) return;

        // 1. Display User Message
        appendChatMessage('user', userText);
        chatUserInput.value = '';

        // 2. Show Typing / Bot Response
        // =========================================================
        // DEVELOPER NOTE: To connect an external LLM (OpenAI / Gemini API),
        // replace the setTimeout below with:
        //
        // const response = await fetch('/api/chat', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ prompt: userText })
        // });
        // const data = await response.json();
        // appendChatMessage('bot', data.reply);
        // =========================================================
        setTimeout(() => {
            const botReply = generateBotReply(userText);
            appendChatMessage('bot', botReply);
        }, 600);
    };

    window.sendQuickPrompt = (promptText) => {
        if (chatUserInput) {
            chatUserInput.value = promptText;
            window.handleUserMessage();
        }
    };

    // ---------------------------------------------------------
    // 7. CONTACT FORM SUBMISSION TO GMAIL (akshithkheeran.iseait@gmail.com)
    // ---------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');
    const formSubmitBtn = document.getElementById('form-submit-btn');
    const btnOpenGmail = document.getElementById('btn-open-gmail');
    const btnCopyGmail = document.getElementById('btn-copy-gmail');
    const AKSHITH_GMAIL = 'akshithkheeran.iseait@gmail.com';

    const getGmailComposeUrl = (name, email, subject, message) => {
        const fullSubject = `[Portfolio Contact] ${subject || 'General Inquiry'} - ${name || 'Visitor'}`;
        const fullBody = `Hi Akshith,\n\nName: ${name || 'Not provided'}\nEmail: ${email || 'Not provided'}\nSubject: ${subject || 'General Inquiry'}\n\nMessage:\n${message || ''}\n\n---\nSent from your Portfolio Website`;
        return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(AKSHITH_GMAIL)}&su=${encodeURIComponent(fullSubject)}&body=${encodeURIComponent(fullBody)}`;
    };

    const getMailtoUrl = (name, email, subject, message) => {
        const fullSubject = `[Portfolio Contact] ${subject || 'General Inquiry'} - ${name || 'Visitor'}`;
        const fullBody = `Hi Akshith,\n\nName: ${name || 'Not provided'}\nEmail: ${email || 'Not provided'}\n\nMessage:\n${message || ''}`;
        return `mailto:${AKSHITH_GMAIL}?subject=${encodeURIComponent(fullSubject)}&body=${encodeURIComponent(fullBody)}`;
    };

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('contact-name')?.value.trim() || '';
            const email = document.getElementById('contact-email')?.value.trim() || '';
            const subject = document.getElementById('contact-subject')?.value.trim() || 'Portfolio Contact';
            const message = document.getElementById('contact-message')?.value.trim() || '';

            if (!name || !email || !message) {
                if (formFeedback) {
                    formFeedback.innerHTML = '⚠️ Please fill out all required fields.';
                    formFeedback.className = 'form-feedback error';
                }
                return;
            }

            if (formSubmitBtn) {
                formSubmitBtn.disabled = true;
                formSubmitBtn.innerHTML = '<span>OPENING GMAIL... ⏳</span>';
            }

            if (formFeedback) {
                formFeedback.innerHTML = `Preparing email for <strong>${AKSHITH_GMAIL}</strong>...`;
                formFeedback.className = 'form-feedback info';
            }

            // 1. Generate URLs
            const gmailUrl = getGmailComposeUrl(name, email, subject, message);
            const mailtoUrl = getMailtoUrl(name, email, subject, message);

            // 2. Open Gmail Web Compose in new tab for instant 100% reliable sending
            const newTab = window.open(gmailUrl, '_blank');
            if (!newTab) {
                window.location.href = mailtoUrl;
            }

            // 3. Background submission to FormSubmit
            try {
                fetch(`https://formsubmit.co/ajax/${AKSHITH_GMAIL}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        _subject: `[Portfolio Inquiry] ${subject} - from ${name}`,
                        subject: subject,
                        message: message,
                        _template: 'table'
                    })
                }).catch(() => {});
            } catch (err) {}

            // 4. Feedback
            setTimeout(() => {
                contactForm.reset();
                if (formFeedback) {
                    formFeedback.innerHTML = `✅ Opened in Gmail! Click <strong>"Send"</strong> in Gmail to deliver immediately to <strong>${AKSHITH_GMAIL}</strong>.<br><a href="${gmailUrl}" target="_blank" style="color:var(--brand-cyan); text-decoration:underline; font-weight:700;">Click here if Gmail didn't open automatically</a>.`;
                    formFeedback.className = 'form-feedback success';
                }
                if (formSubmitBtn) {
                    formSubmitBtn.disabled = false;
                    formSubmitBtn.innerHTML = '<span>SEND MESSAGE TO GMAIL ▶</span>';
                }
            }, 600);
        });
    }

    // Direct "Open in Gmail" button
    if (btnOpenGmail) {
        btnOpenGmail.addEventListener('click', () => {
            const name = document.getElementById('contact-name')?.value.trim() || '';
            const email = document.getElementById('contact-email')?.value.trim() || '';
            const subject = document.getElementById('contact-subject')?.value.trim() || '';
            const message = document.getElementById('contact-message')?.value.trim() || '';

            const gmailUrl = getGmailComposeUrl(name, email, subject, message);
            window.open(gmailUrl, '_blank');
        });
    }

    // "Copy Email" button
    if (btnCopyGmail) {
        btnCopyGmail.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(AKSHITH_GMAIL);
                const originalHtml = btnCopyGmail.innerHTML;
                btnCopyGmail.innerHTML = '<span>✓ Copied!</span>';
                btnCopyGmail.style.color = 'var(--brand-emerald)';

                if (formFeedback) {
                    formFeedback.innerHTML = `📋 Copied <strong>${AKSHITH_GMAIL}</strong> to clipboard!`;
                    formFeedback.className = 'form-feedback success';
                }

                setTimeout(() => {
                    btnCopyGmail.innerHTML = originalHtml;
                    btnCopyGmail.style.color = '';
                }, 3000);
            } catch (err) {
                if (formFeedback) {
                    formFeedback.innerHTML = `Email: <strong>${AKSHITH_GMAIL}</strong>`;
                    formFeedback.className = 'form-feedback info';
                }
            }
        });
    }
});

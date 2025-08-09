
document.addEventListener('DOMContentLoaded', function() {
    // ========== Theme Toggle ==========
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Set initial theme - dark by default
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
        themeToggle.checked = true;
    } else {
        document.body.classList.remove('light-mode');
        themeToggle.checked = false;
        localStorage.setItem('theme', 'dark'); // Explicitly set dark mode
    }
    
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        }
    });

    // ========== Greeting Functionality ==========
    const greetingElement = document.getElementById('greeting');
    const hour = new Date().getHours();
    greetingElement.textContent = hour < 12 ? "Good Morning!" : hour < 18 ? "Good Afternoon!" : "Good Evening!";

    // ========== Scrollspy Navigation ==========
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function activateSection() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.scrollspy === current) {
                link.classList.add('active');
            }
        });
    }
    
    // Initialize and add scroll event
    activateSection();
    window.addEventListener('scroll', activateSection);

    // Smooth scrolling for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 60,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== Blog Posts ==========
    const blogPosts = [
        {
            title: "UX & INTERACTIVITY",
            date: "April 2025",
            excerpt: "Exploring visual programming...",
        },
        {
            title: "JS PERFORMANCE TIPS", 
            date: "May 22, 2023",
            excerpt: "Practicalities & Assets",
 
        },
        {
            title: "CSS BEST PRACTICES",
            date: "April 10, 2023",
            excerpt: "Essential patterns for writing maintainable CSS code...",
        },
        {
            title: "Debugging Strategies",
            date: "March 5, 2023",
            excerpt: "Effective approaches to identify and fix bugs...",
        }
    ];

    function loadBlogPosts() {
        const container = document.getElementById('blog-posts-container');
        if (!container) return;
        
        blogPosts.forEach(post => {
            const blogPost = document.createElement('article');
            blogPost.className = 'blog-post';
            blogPost.innerHTML = `
                
                <div class="blog-post-content">
                    <h3>${post.title}</h3>
                    <p class="post-date">${post.date}</p>
                    <p class="post-excerpt">${post.excerpt}</p>
                    <a href="#" class="read-more">Read more</a>
                </div>
            `;
            container.appendChild(blogPost);
        });
    }
    loadBlogPosts();

    // ========== Contact Form Validation ==========
const form = document.getElementById('contact-form');
if (form) {
    // Form elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const successMessage = document.getElementById('successMessage');

    // Validation patterns
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s\-()+]{10,}$/;
    

    // Validation functions
    function validateName() {
        const nameValue = nameInput.value.trim();
        let isValid = true;
        
        // Check if empty
        if (nameValue.length === 0) {
            nameError.textContent = "Name is required";
            isValid = false;
        } 
        // Check for only letters and spaces
        else {
            for (let i = 0; i < nameValue.length; i++) {
                const char = nameValue[i];
                if (!((char >= 'a' && char <= 'z') || 
                      (char >= 'A' && char <= 'Z') || 
                      char === ' ')) {
                    nameError.textContent = "Only letters and spaces allowed";
                    isValid = false;
                    break;
                }
            }
            
            if (isValid) {
                nameError.textContent = "";
            }
        }
        
        nameInput.classList.toggle('error-border', !isValid);
        nameInput.classList.toggle('success-border', isValid);
        return isValid;
    }

    function validateEmail() {
        const val = emailInput.value.trim();
        let isValid = false;
        
        if (!val) {
            emailError.textContent = "Email is required";
        } else if (!emailRegex.test(val)) {
            emailError.textContent = "Please enter a valid email";
        } else {
            emailError.textContent = "";
            isValid = true;
        }
        
        emailInput.classList.toggle('error-border', !isValid);
        emailInput.classList.toggle('success-border', isValid);
        return isValid;
    }

    function validatePhone() {
        const val = phoneInput.value.trim();
        if (!val) {
            phoneError.textContent = "";
            phoneInput.classList.remove('error-border', 'success-border');
            return true; // Phone is optional
        }
        
        const isValid = phoneRegex.test(val);
        phoneInput.classList.toggle('error-border', !isValid);
        phoneInput.classList.toggle('success-border', isValid);
        phoneError.textContent = isValid ? "" : "Please enter a valid phone number";
        return isValid;
    }

    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    phoneInput.addEventListener('input', validatePhone);

    // Form submission
    // Form validation function
function validateForm(event) {
    event.preventDefault();
    
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();

    if (isNameValid && isEmailValid && isPhoneValid) {
        successMessage.textContent = "Message sent successfully!";
        successMessage.style.display = 'block';
        
        // Reset form after 3 seconds
        setTimeout(() => {
            form.reset();
            successMessage.style.display = 'none';
            document.querySelectorAll('input').forEach(input => {
                input.classList.remove('success-border');
            });
        }, 3000);
    } else {
        // Focus on first invalid field
        const firstInvalid = document.querySelector('.error-border');
        if (firstInvalid) firstInvalid.focus();
    }
}

// Real-time validation
nameInput.addEventListener('input', function() {
    // Optional: Prevent non-letter characters from being entered
    let newValue = '';
    for (let i = 0; i < this.value.length; i++) {
        const char = this.value[i];
        if ((char >= 'a' && char <= 'z') || 
            (char >= 'A' && char <= 'Z') || 
            char === ' ') {
            newValue += char;
        }
    }
    this.value = newValue;
    
    validateName();
});

// Add event listener for form submission
form.addEventListener('submit', validateForm);
}
});
// Projects data
const projectsData = [
    {
      title: "EPL Website",
      description: "A Complete Design with HTML and CSS",
      category: "web",
      image: "weby.png"
    },
    {
      title: "LIBRARY DASHBOARD",
      description: "Interactive dashboard for analyzing sales data",
      category: "data",
      image: "jas.jpg"
    },
    {
      title: "Chatbot Implementation",
      description: "AI-powered customer support chatbot",
      category: "ai",
      image: "chash.png"
    },
    {
      title: "LOGIN FORM",
      description: "Responsive built with HTML/CSS/JS",
      category: "web",
      image: "css3-2.png"
    },
    
  ];
  
  function loadProjects(filter = 'all') {
    const container = document.getElementById('projects-list');
    container.innerHTML = '';
    
    const filteredProjects = filter === 'all' 
      ? projectsData 
      : projectsData.filter(project => project.category === filter);
    
    filteredProjects.forEach(project => {
      const projectCard = document.createElement('div');
      projectCard.className = 'project-card';
      projectCard.dataset.category = project.category;
      projectCard.innerHTML = `
        <img src="${project.image}" alt="${project.title}" class="project-image">
        <div class="project-content">
          <h4 class="project-title">${project.title}</h4>
          <p class="project-description">${project.description}</p>
          <a href="#" class="project-btn">View Project</a>
        </div>
      `;
      container.appendChild(projectCard);
    });
  }
  
  // Initialize projects and filters
  function initProjects() {
    loadProjects();
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        loadProjects(button.dataset.filter);
      });
    });
  }
  
  // Call this in your DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function() {
    initProjects();
    // ... rest of your code
  });

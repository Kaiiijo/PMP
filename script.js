// JavaScript to handle the active link highlight based on the current page
document.addEventListener("DOMContentLoaded", function() {
    // Mobile navigation menu toggle
    const hamburger = document.querySelector('.hamburger-menu');
    const mainNav = document.querySelector('.main-nav');
    
    if (hamburger && mainNav) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
        
        // Close mobile menu when clicking a nav link
        const navLinks = document.querySelectorAll('.main-nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mainNav.classList.remove('active');
            });
        });
    }
    
    // Highlight the active page link
    const links = document.querySelectorAll('nav a');
    links.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add('active');
        }
    });

    // Add lazy loading for images
    const images = document.querySelectorAll('img');
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        images.forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        // You could add a lazy loading library here if needed
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Expand the "About Us" section when the "Read More" button is clicked
    const expandAboutBtn = document.getElementById('expandAboutBtn');
    const aboutText = document.getElementById('aboutText');
    
    if (expandAboutBtn && aboutText) {
        expandAboutBtn.addEventListener('click', () => {
            aboutText.classList.toggle('expanded');
            if (aboutText.classList.contains('expanded')) {
                expandAboutBtn.textContent = 'Read Less';
            } else {
                expandAboutBtn.textContent = 'Read More';
            }
        });
    }

    // Show customer support form when "Help" is clicked (if implemented)
    const helpButton = document.getElementById('helpBtn');
    const customerSupportSection = document.getElementById('customer-support');
    
    if (helpButton && customerSupportSection) {
        helpButton.addEventListener('click', () => {
            customerSupportSection.style.display = 'block';
            customerSupportSection.classList.add('fade-in');
        });
    }

    // Handle form submission for customer support
    const supportForm = document.getElementById('supportForm');
    const confirmationMessage = document.getElementById('confirmationMessage');
    if (supportForm) {
        supportForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form from reloading the page
            
            // Show loading state
            const submitButton = supportForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate a delay for sending the message
            setTimeout(() => {
                // Display confirmation message
                confirmationMessage.classList.remove('hidden');
                supportForm.reset(); // Reset the form fields
                
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // Hide confirmation message after 5 seconds
                setTimeout(() => {
                    confirmationMessage.classList.add('hidden');
                }, 5000);
            }, 1000);
        });
    }

    // Handle the 'Get Started' button click for meal plans
    const getStartedBtn = document.getElementById('getStartedBtn');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', () => {
            window.location.href = 'meal-planning.html';
        });
    }

    // Handle the 'Subscribe' button click for newsletter
    const newsletterForm = document.getElementById('newsletterForm');
    const subscriptionMessage = document.getElementById('subscriptionMessage');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Show loading state
            const submitButton = newsletterForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Subscribing...';
            submitButton.disabled = true;
            
            const email = document.getElementById('emailInput').value;
            if (validateEmail(email)) {
                // Simulate a delay for subscription processing
                setTimeout(() => {
                    subscriptionMessage.classList.remove('hidden');
                    newsletterForm.reset(); // Reset the form fields
                    
                    // Reset button
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    
                    // Hide confirmation message after 5 seconds
                    setTimeout(() => {
                        subscriptionMessage.classList.add('hidden');
                    }, 5000);
                }, 1000);
            } else {
                alert('Please enter a valid email.');
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });
    }

    // Handle the 'Logout' button click event
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to logout?')) {
                // Show loading message
                const originalText = logoutBtn.innerHTML;
                logoutBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging out...';
                logoutBtn.disabled = true;
                
                // Simulate a delay for logout process
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            }
        });
    }

    // Handle tab switching with animations
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);

            tabLinks.forEach(link => link.classList.remove('active'));
            tabContents.forEach(content => {
                content.classList.remove('active');
                content.classList.add('hidden');
            });

            link.classList.add('active');
            const targetContent = document.getElementById(targetId);
            targetContent.classList.remove('hidden');
            targetContent.classList.add('active');
        });
    });

    // Ensure only the profile tab content is displayed initially
    const profileTabContent = document.getElementById('profile');
    if (profileTabContent) {
        profileTabContent.classList.add('active');
    }

    // Handle form submissions with enhanced validation
    const subscriptionForm = document.getElementById('subscriptionForm');
    const settingsForm = document.getElementById('settingsForm');

    // Load subscription and settings data from localStorage
    const storedPlan = localStorage.getItem('plan');
    const storedLanguage = localStorage.getItem('language');
    const storedNotifications = localStorage.getItem('notifications');

    if (storedPlan) {
        document.getElementById('plan').value = storedPlan;
    }
    if (storedLanguage) {
        document.getElementById('language').value = storedLanguage;
    }
    if (storedNotifications) {
        document.getElementById('notifications').value = storedNotifications;
    }

    if (subscriptionForm) {
        subscriptionForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const plan = document.getElementById('plan').value;
            if (plan) {
                localStorage.setItem('plan', plan);
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.classList.add('success-message');
                successMessage.textContent = `Subscription plan updated to ${plan}.`;
                
                subscriptionForm.appendChild(successMessage);
                
                // Remove message after 3 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            } else {
                alert('Please select a subscription plan.');
            }
        });
    }

    if (settingsForm) {
        settingsForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const language = document.getElementById('language').value;
            const notifications = document.getElementById('notifications').value;
            if (language && notifications) {
                localStorage.setItem('language', language);
                localStorage.setItem('notifications', notifications);
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.classList.add('success-message');
                successMessage.textContent = 'Settings saved successfully.';
                
                settingsForm.appendChild(successMessage);
                
                // Remove message after 3 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            } else {
                alert('Please complete all settings fields.');
            }
        });
    }

    // Handle the 'Edit Profile' button click event
    const editProfileBtn = document.getElementById('editProfileBtn');
    const editProfileForm = document.getElementById('editProfileForm');
    const cancelEditProfileBtn = document.getElementById('cancelEditProfileBtn');
    const fullNameSpan = document.getElementById('fullName');
    const emailAddressSpan = document.getElementById('emailAddress');

    // Load profile data from localStorage
    const storedFullName = localStorage.getItem('fullName');
    const storedEmailAddress = localStorage.getItem('emailAddress');
    if (storedFullName) {
        fullNameSpan.textContent = storedFullName;
        document.getElementById('editFullName').value = storedFullName;
    }
    if (storedEmailAddress) {
        emailAddressSpan.textContent = storedEmailAddress;
        document.getElementById('editEmailAddress').value = storedEmailAddress;
    }

    if (editProfileBtn && editProfileForm && cancelEditProfileBtn) {
        editProfileBtn.addEventListener('click', () => {
            editProfileForm.classList.remove('hidden');
            editProfileBtn.classList.add('hidden');
        });

        cancelEditProfileBtn.addEventListener('click', () => {
            editProfileForm.classList.add('hidden');
            editProfileBtn.classList.remove('hidden');
        });

        editProfileForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const newFullName = document.getElementById('editFullName').value;
            const newEmailAddress = document.getElementById('editEmailAddress').value;

            if (newFullName && newEmailAddress) {
                if (validateEmail(newEmailAddress)) {
                    fullNameSpan.textContent = newFullName;
                    emailAddressSpan.textContent = newEmailAddress;
                    localStorage.setItem('fullName', newFullName);
                    localStorage.setItem('emailAddress', newEmailAddress);
                    
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.classList.add('success-message');
                    successMessage.textContent = 'Profile updated successfully.';
                    
                    editProfileForm.appendChild(successMessage);
                    
                    // Hide form and show button after 2 seconds
                    setTimeout(() => {
                        successMessage.remove();
                        editProfileForm.classList.add('hidden');
                        editProfileBtn.classList.remove('hidden');
                    }, 2000);
                } else {
                    alert('Please enter a valid email address.');
                }
            } else {
                alert('Please fill in all profile fields.');
            }
        });
    }

    // Handle recipe form submission
    const recipeForm = document.getElementById('recipeForm');
    const recipeSubmissionMessage = document.getElementById('recipeSubmissionMessage');

    if (recipeForm) {
        recipeForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Show loading state
            const submitButton = recipeForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            submitButton.disabled = true;
            
            // Simulate submission delay
            setTimeout(() => {
                // Display success message
                recipeSubmissionMessage.classList.remove('hidden');
                recipeForm.reset();
                
                // Reset button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    recipeSubmissionMessage.classList.add('hidden');
                }, 5000);
            }, 1500);
        });
    }

    // Handle recipe search functionality
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    // Sample recipe data for demo (in a real app, this would come from a database)
    const sampleRecipes = [
        { name: 'Spaghetti Bolognese', time: '30 min', calories: '450', rating: '4.8' },
        { name: 'Chicken Caesar Salad', time: '15 min', calories: '320', rating: '4.5' },
        { name: 'Vegan Buddha Bowl', time: '20 min', calories: '380', rating: '4.7' },
        { name: 'Chocolate Chip Cookies', time: '25 min', calories: '200', rating: '4.9' },
        { name: 'Beef Stir Fry', time: '20 min', calories: '410', rating: '4.6' }
    ];

    if (searchBtn && searchInput && searchResults) {
        searchBtn.addEventListener('click', function() {
            const query = searchInput.value.trim().toLowerCase();
            
            if (query.length < 2) {
                alert('Please enter at least 2 characters to search.');
                return;
            }
            
            // Show loading state
            searchResults.innerHTML = '<div class="loading-indicator"><i class="fas fa-spinner fa-spin"></i> Searching...</div>';
            
            // Simulate search delay
            setTimeout(() => {
                const filteredRecipes = sampleRecipes.filter(recipe => 
                    recipe.name.toLowerCase().includes(query)
                );
                
                if (filteredRecipes.length > 0) {
                    // Display results
                    searchResults.innerHTML = '<h3>Search Results</h3>';
                    const resultsDiv = document.createElement('div');
                    resultsDiv.className = 'meal-plans-grid';
                    
                    filteredRecipes.forEach(recipe => {
                        const recipeCard = document.createElement('div');
                        recipeCard.className = 'recipe-card';
                        recipeCard.innerHTML = `
                            <div class="recipe-icon"><i class="fas fa-utensils"></i></div>
                            <h3>${recipe.name}</h3>
                            <div class="recipe-meta">
                                <span><i class="fas fa-clock"></i> ${recipe.time}</span>
                                <span><i class="fas fa-fire"></i> ${recipe.calories} cal</span>
                                <span><i class="fas fa-star"></i> ${recipe.rating}</span>
                            </div>
                            <a href="#" class="card-link">View Recipe</a>
                        `;
                        resultsDiv.appendChild(recipeCard);
                    });
                    
                    searchResults.appendChild(resultsDiv);
                } else {
                    searchResults.innerHTML = '<p>No recipes found. Try a different search term.</p>';
                }
            }, 1000);
        });
        
        // Enable search on Enter key press
        searchInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                searchBtn.click();
            }
        });
    }
});

// Email validation helper function
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

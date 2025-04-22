// JavaScript to handle the active link highlight based on the current page
document.addEventListener("DOMContentLoaded", function() {
    // Highlight the active page link
    const links = document.querySelectorAll('nav a');
    links.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add('active');
        }
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
            // Display confirmation message
            confirmationMessage.classList.remove('hidden');
            supportForm.reset(); // Reset the form fields
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
            const email = document.getElementById('emailInput').value;
            if (validateEmail(email)) {
                subscriptionMessage.classList.remove('hidden');
                newsletterForm.reset(); // Reset the form fields
            } else {
                alert('Please enter a valid email.');
            }
        });
    }

    // Handle the 'Logout' button click event
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            alert('You have been logged out.');
            // Add your logout logic here, such as redirecting to the login page
            window.location.href = 'login.html';
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
                alert('Subscription plan updated to ' + plan + '.');
                // Handle subscription form data submission here
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
                alert('Settings saved.');
                // Handle settings form data submission here
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
                fullNameSpan.textContent = newFullName;
                emailAddressSpan.textContent = newEmailAddress;
                localStorage.setItem('fullName', newFullName);
                localStorage.setItem('emailAddress', newEmailAddress);
                alert('Profile updated successfully.');
                editProfileForm.classList.add('hidden');
                editProfileBtn.classList.remove('hidden');
            } else {
                alert('Please complete all fields.');
            }
        });
    }

    // Email validation function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});

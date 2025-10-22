 const contactForm = document.getElementById('contactForm');
        const successMessage = document.getElementById('successMessage');
        const errorMessage = document.getElementById('errorMessage');

        // Custom error messages
        const errorMessages = {
            name: {
                empty: '⚠️ Veuillez entrer votre nom complet',
                invalid: '⚠️ Le nom doit contenir au moins 3 caractères'
            },
            email: {
                empty: '⚠️ Veuillez entrer votre adresse email',
                invalid: '⚠️ Veuillez entrer une adresse email valide (exemple@email.com)'
            },
            phone: {
                invalid: '⚠️ Numéro de téléphone invalide. Format attendu : +237 6XX XX XX XX'
            },
            subject: {
                empty: '⚠️ Veuillez sélectionner un sujet'
            },
            message: {
                empty: '⚠️ Veuillez écrire votre message',
                invalid: '⚠️ Le message doit contenir au moins 10 caractères'
            }
        };

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset previous errors
            clearErrors();
            
            // Validate all fields
            let isValid = true;
            const errors = [];

            // Validate name
            const nameInput = document.getElementById('name');
            if (!nameInput.value.trim()) {
                showFieldError(nameInput, errorMessages.name.empty);
                errors.push(errorMessages.name.empty);
                isValid = false;
            } else if (nameInput.value.trim().length < 3) {
                showFieldError(nameInput, errorMessages.name.invalid);
                errors.push(errorMessages.name.invalid);
                isValid = false;
            }

            // Validate email
            const emailInput = document.getElementById('email');
            if (!emailInput.value.trim()) {
                showFieldError(emailInput, errorMessages.email.empty);
                errors.push(errorMessages.email.empty);
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showFieldError(emailInput, errorMessages.email.invalid);
                errors.push(errorMessages.email.invalid);
                isValid = false;
            }

            // Validate phone (optional but must be valid if provided)
            const phoneInput = document.getElementById('phone');
            if (phoneInput.value.trim() && !validateCameroonPhone(phoneInput.value)) {
                showFieldError(phoneInput, errorMessages.phone.invalid);
                errors.push(errorMessages.phone.invalid);
                isValid = false;
            }

            // Validate subject
            const subjectInput = document.getElementById('subject');
            if (!subjectInput.value) {
                showFieldError(subjectInput, errorMessages.subject.empty);
                errors.push(errorMessages.subject.empty);
                isValid = false;
            }

            // Validate message
            const messageInput = document.getElementById('message');
            if (!messageInput.value.trim()) {
                showFieldError(messageInput, errorMessages.message.empty);
                errors.push(errorMessages.message.empty);
                isValid = false;
            } else if (messageInput.value.trim().length < 10) {
                showFieldError(messageInput, errorMessages.message.invalid);
                errors.push(errorMessages.message.invalid);
                isValid = false;
            }

            // If form is not valid, show general error message
            if (!isValid) {
                showGeneralError('❌ Veuillez corriger les erreurs dans le formulaire avant de continuer.');
                // Scroll to first error
                const firstError = document.querySelector('.form-group.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                return;
            }

            // If valid, submit form
            const formData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                phone: phoneInput.value.trim(),
                subject: subjectInput.value,
                message: messageInput.value.trim()
            };

            submitForm(formData);
        });

        function showFieldError(input, message) {
            const formGroup = input.parentElement;
            formGroup.classList.add('error');
            const errorText = formGroup.querySelector('.error-text');
            if (errorText) {
                errorText.textContent = message;
            }
        }

        function showGeneralError(message) {
            errorMessage.textContent = message;
            errorMessage.classList.add('show');
            
            // Hide after 5 seconds
            setTimeout(() => {
                errorMessage.classList.remove('show');
            }, 5000);
        }

        function clearErrors() {
            // Remove error classes
            document.querySelectorAll('.form-group.error').forEach(group => {
                group.classList.remove('error');
            });
            
            // Hide general error message
            errorMessage.classList.remove('show');
            successMessage.classList.remove('show');
        }

        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        function validateCameroonPhone(phone) {
            // Remove spaces and special characters
            const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
            // Check if it matches Cameroon format: +2376XXXXXXXX or 6XXXXXXXX
            const cameroonPattern = /^(\+237)?6[0-9]{8}$/;
            return cameroonPattern.test(cleanPhone);
        }

        function submitForm(data) {
            // Show loading state
            const submitBtn = document.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '⏳ Envoi en cours...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            // Simulate API call
            setTimeout(() => {
                // Show success message
                successMessage.classList.add('show');
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = '✓ Message envoyé !';
                submitBtn.style.background = '#4CAF50';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.background = '';
                }, 2000);

                // Hide success message after 7 seconds
                setTimeout(() => {
                    successMessage.classList.remove('show');
                }, 7000);

                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Log data (in production, send to server)
                console.log('✅ Form submitted successfully:', data);
            }, 1500);
        }

        // Real-time validation on blur
        document.getElementById('name').addEventListener('blur', function() {
            if (this.value.trim() && this.value.trim().length >= 3) {
                this.parentElement.classList.remove('error');
            }
        });

        document.getElementById('email').addEventListener('blur', function() {
            if (this.value.trim() && isValidEmail(this.value)) {
                this.parentElement.classList.remove('error');
            }
        });

        document.getElementById('phone').addEventListener('blur', function() {
            if (!this.value.trim() || validateCameroonPhone(this.value)) {
                this.parentElement.classList.remove('error');
            }
        });

        document.getElementById('subject').addEventListener('change', function() {
            if (this.value) {
                this.parentElement.classList.remove('error');
            }
        });

        document.getElementById('message').addEventListener('blur', function() {
            if (this.value.trim() && this.value.trim().length >= 10) {
                this.parentElement.classList.remove('error');
            }
        });

        // Smooth scroll for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Form field animations
        const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
        
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.02)';
                this.parentElement.style.transition = 'transform 0.3s ease';
            });

            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'scale(1)';
            });
        });

        // Add floating animation to info items
        const infoItems = document.querySelectorAll('.info-item');
        infoItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
        });

        // Character counter for message
        const messageTextarea = document.getElementById('message');
        const messageGroup = messageTextarea.parentElement;

        const counterDiv = document.createElement('div');
        counterDiv.style.cssText = 'text-align: right; color: #999; font-size: 0.9rem; margin-top: 0.5rem;';
        messageGroup.appendChild(counterDiv);

        messageTextarea.addEventListener('input', function() {
            const count = this.value.length;
            counterDiv.textContent = `${count} caractères`;
            
            if (count > 500) {
                counterDiv.style.color = '#E74C3C';
            } else if (count >= 10) {
                counterDiv.style.color = '#4CAF50';
            } else {
                counterDiv.style.color = '#999';
            }
        });

        // Initialize counter
        messageTextarea.dispatchEvent(new Event('input'));

        // Add visual feedback on gallery items
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, index) => {
            item.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s both`;
        });
// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="loading"></span> Processing...';
            }
        });
    });

    // Confirm delete actions
    const deleteButtons = document.querySelectorAll('button[onclick*="confirm"]');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!confirm('Are you sure you want to delete this item?')) {
                e.preventDefault();
            }
        });
    });

    // Auto-hide alerts after 5 seconds
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            alert.style.opacity = '0';
            setTimeout(() => {
                alert.remove();
            }, 300);
        }, 5000);
    });

    // Add loading states to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.type === 'submit') {
                setTimeout(() => {
                    this.disabled = true;
                    this.innerHTML = '<span class="loading"></span> Loading...';
                }, 100);
            }
        });
    });

    // Search functionality
    const searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const filter = this.value.toLowerCase();
            const table = document.querySelector('table tbody');
            const rows = table.getElementsByTagName('tr');

            for (let i = 0; i < rows.length; i++) {
                const cells = rows[i].getElementsByTagName('td');
                let shouldShow = false;

                for (let j = 0; j < cells.length - 1; j++) { // -1 to exclude actions column
                    if (cells[j].textContent.toLowerCase().indexOf(filter) > -1) {
                        shouldShow = true;
                        break;
                    }
                }

                rows[i].style.display = shouldShow ? '' : 'none';
            }
        });
    }

    // Tooltip initialization
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Form field validation
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            if (this.classList.contains('is-invalid')) {
                validateField(this);
            }
        });
    });

    function validateField(field) {
        const value = field.value.trim();
        const isRequired = field.hasAttribute('required');
        let isValid = true;
        let errorMessage = '';

        // Check required fields
        if (isRequired && !value) {
            isValid = false;
            errorMessage = 'This field is required.';
        }

        // Validate specific field types
        if (value && field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address.';
            }
        }

        if (value && field.type === 'number') {
            if (isNaN(value) || parseFloat(value) < 0) {
                isValid = false;
                errorMessage = 'Please enter a valid positive number.';
            }
        }

        if (value && field.name === 'phone') {
            const phoneRegex = /^[0-9+\-\s()]+$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number.';
            }
        }

        // Update field appearance
        if (isValid) {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
            removeErrorMessage(field);
        } else {
            field.classList.remove('is-valid');
            field.classList.add('is-invalid');
            showErrorMessage(field, errorMessage);
        }

        return isValid;
    }

    function showErrorMessage(field, message) {
        removeErrorMessage(field);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }

    function removeErrorMessage(field) {
        const existingError = field.parentNode.querySelector('.invalid-feedback');
        if (existingError) {
            existingError.remove();
        }
    }

    // Price formatting
    const priceInputs = document.querySelectorAll('input[name="price"]');
    priceInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value) {
                this.value = parseFloat(this.value).toFixed(2);
            }
        });
    });

    // Quantity validation
    const quantityInputs = document.querySelectorAll('input[name="quantity"]');
    quantityInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value < 0) {
                this.value = 0;
            }
        });
    });

    // Dynamic supplier selection in product form
    const supplierSelect = document.getElementById('supplierId');
    if (supplierSelect) {
        supplierSelect.addEventListener('change', function() {
            if (this.value) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            }
        });
    }

    console.log('Product & Supplier Management System loaded successfully!');
});
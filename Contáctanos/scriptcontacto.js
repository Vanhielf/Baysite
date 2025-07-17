// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Obtiene referencias a los elementos principales
    const form = document.getElementById('multiStepForm');
    const steps = Array.from(document.querySelectorAll('.form-step'));
    const nextButtons = Array.from(document.querySelectorAll('.next-btn'));
    const prevButtons = Array.from(document.querySelectorAll('.prev-btn'));
    const progressSteps = Array.from(document.querySelectorAll('.progress-step'));
    
    // Variable para llevar el control del paso actual
    let currentStep = 0;

    // Función para mostrar un paso específico
    function showStep(stepIndex) {
        // Oculta todos los pasos
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === stepIndex);
        });
        
        // Actualiza la barra de progreso
        progressSteps.forEach((step, index) => {
            if (index <= stepIndex) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }

    // Función para validar los campos requeridos del paso actual
    function validateStep(stepIndex) {
        const currentStepFields = steps[stepIndex].querySelectorAll('[required]');
        let isValid = true;
        
        // Verifica cada campo requerido
        currentStepFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = 'red'; // Resalta campos vacíos
                isValid = false;
            } else {
                field.style.borderColor = '#ddd'; // Restaura color normal
            }
        });
        
        return isValid;
    }

    // Agrega event listeners a los botones "Siguiente"
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Valida antes de avanzar
            if (validateStep(currentStep)) {
                currentStep++;
                // Evita pasarse del último paso
                if (currentStep >= steps.length) {
                    currentStep = steps.length - 1;
                }
                showStep(currentStep);
            }
        });
    });

    // Agrega event listeners a los botones "Anterior"
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            currentStep--;
            // Evita pasarse del primer paso
            if (currentStep < 0) {
                currentStep = 0;
            }
            showStep(currentStep);
        });
    });

    // Maneja el envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Evita el envío tradicional
        
        // Valida el último paso
        if (validateStep(currentStep)) {
            // Aquí iría el código para enviar el formulario
            alert('Formulario enviado con éxito!');
            form.reset(); // Limpia el formulario
            currentStep = 0; // Vuelve al primer paso
            showStep(currentStep); // Muestra el primer paso
        }
    });

    // Inicializa mostrando el primer paso
    showStep(currentStep);
});
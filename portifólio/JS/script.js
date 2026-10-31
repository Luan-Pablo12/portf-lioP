const chars = document.querySelectorAll('.hero-name .char');

chars.forEach((char, index) => {
    char.addEventListener('click', () => {
        chars.forEach((c, i) => {
            setTimeout(() => {
                c.classList.add('jump');
                setTimeout(() => c.classList.remove('jump'), 500);
            }, Math.abs(i - index) * 60);
        });
    });
});

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Enviando...';
        formStatus.className = 'form-status-msg d-none';

        const formData = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            mensagem: document.getElementById('mensagem').value,
            _subject: 'Novo contato do Portfólio!'
        };

        try {
            const response = await fetch('https://formsubmit.co/ajax/ribeiroaine9@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                formStatus.className = 'form-status-msg status-success';
                formStatus.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i>Mensagem enviada com sucesso! Em breve entrarei em contato.';
                contactForm.reset();
            } else {
                formStatus.className = 'form-status-msg status-error';
                formStatus.innerHTML = '<i class="bi bi-exclamation-triangle-fill me-2"></i>Não foi possível enviar a mensagem. Verifique a ativação do e-mail.';
            }
        } catch (error) {
            formStatus.className = 'form-status-msg status-error';
            formStatus.innerHTML = '<i class="bi bi-exclamation-triangle-fill me-2"></i>Erro de conexão. Tente novamente.';
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
}

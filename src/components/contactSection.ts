import type { ContactDetail, ContactFormData, FormValidationResult } from '../types.ts';

const CONTACT_DETAILS: ContactDetail[] = [
  {
    id: 'address',
    icon: '📍',
    heading: 'Temple Address',
    lines: ['Q Block, Mangolpuri', 'New Delhi – 110 083', 'Near Mangolpuri Metro Station'],
  },
  {
    id: 'phone',
    icon: '📞',
    heading: 'Phone',
    lines: ['+91 XXXXX XXXXX', 'Timings: 5:00 AM – 9:00 PM'],
  },
  {
    id: 'email',
    icon: '✉️',
    heading: 'Email',
    lines: ['info@durgamandir-mjks.org', 'samiti@mjks.org'],
  },
  {
    id: 'timings',
    icon: '🕐',
    heading: 'Temple Timings',
    lines: ['Morning: 5:00 AM – 12:00 PM', 'Evening: 4:00 PM – 9:00 PM', 'Open 365 days a year'],
  },
];

function validate(data: ContactFormData): FormValidationResult {
  const errors: FormValidationResult['errors'] = {};
  if (!data.name.trim()) errors.name = 'Please enter your name.';
  if (!data.email.trim()) {
    errors.email = 'Please enter your email.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!data.message.trim()) errors.message = 'Please enter a message.';
  return { valid: Object.keys(errors).length === 0, errors };
}

function setError(fieldId: string, msg: string): void {
  const el = document.getElementById(`${fieldId}Error`);
  if (el) el.textContent = msg;
}

function clearErrors(): void {
  ['name', 'email', 'message'].forEach(f => setError(f, ''));
  const success = document.getElementById('formSuccess');
  if (success) success.textContent = '';
}

export function initContactSection(): void {
  const info = document.getElementById('contactInfo');
  if (info) {
    info.innerHTML = CONTACT_DETAILS.map(d => `
      <div class="contact-item fade-in">
        <div class="contact-icon">${d.icon}</div>
        <div>
          <h4>${d.heading}</h4>
          ${d.lines.map(l => `<p>${l}</p>`).join('')}
        </div>
      </div>`).join('');
  }

  const form = document.getElementById('contactForm') as HTMLFormElement | null;
  if (!form) return;

  form.addEventListener('submit', (e: Event) => {
    e.preventDefault();
    clearErrors();

    const data: ContactFormData = {
      name:    (form.elements.namedItem('name')    as HTMLInputElement).value,
      email:   (form.elements.namedItem('email')   as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    const result = validate(data);
    if (!result.valid) {
      Object.entries(result.errors).forEach(([field, msg]) => setError(field, msg ?? ''));
      return;
    }

    const success = document.getElementById('formSuccess');
    if (success) success.textContent = '🙏 Thank you! Your message has been received. Jai Mata Durga!';
    form.reset();
  });
}

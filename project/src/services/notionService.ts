export interface NotionSubmissionData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  timeline?: string;
  source?: string;
  message?: string;
  services: string[];
  country?: string;
  currency?: string;
  estimateAmount?: number;
}

function saveFallback(type: string, data: object) {
  try {
    const key = 'nicheux_pending_submissions';
    const existing: object[] = JSON.parse(localStorage.getItem(key) || '[]');
    existing.push({ type, timestamp: new Date().toISOString(), ...data });
    localStorage.setItem(key, JSON.stringify(existing));
  } catch {}
}

export const submitToNotion = async (data: NotionSubmissionData): Promise<{
  success: boolean;
  message?: string;
  notionPageId?: string;
}> => {
  try {
    const response = await fetch('/api/submit-to-notion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        company: data.company || '',
        timeline: data.timeline || '',
        source: data.source || '',
        message: data.message || '',
        services: data.services || [],
        country: data.country || '',
        currency: data.currency || '',
        estimateAmount: data.estimateAmount || 0
      })
    });
    const text = await response.text();
    const result = text ? JSON.parse(text) : {};
    if (response.ok && result.success !== false) {
      return { success: true, message: result.message || 'Your enquiry has been received!', notionPageId: result.notionPageId };
    }
    saveFallback('contact', data);
    return { success: true, message: 'Your enquiry has been received!' };
  } catch {
    saveFallback('contact', data);
    return { success: true, message: 'Your enquiry has been received!' };
  }
};

export const prepareNotionData = (
  formData: any,
  selectedServices: string[],
  priceEstimate: number,
  countryInfo: any
): NotionSubmissionData => {
  return {
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    company: formData.company,
    timeline: formData.timeline,
    source: formData.source,
    message: formData.message,
    services: selectedServices,
    country: countryInfo?.countryName,
    currency: countryInfo?.symbol || '£',
    estimateAmount: priceEstimate > 0 ? priceEstimate : 0
  };
};

export const submitSimpleContact = async (data: {
  name: string;
  email: string;
  message: string;
}): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await fetch('/api/submit-simple-contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: data.name, email: data.email, message: data.message || '' })
    });
    const text = await response.text();
    const result = text ? JSON.parse(text) : {};
    if (response.ok && result.success !== false) {
      return { success: true, message: result.message || 'Message sent!' };
    }
    saveFallback('simple-contact', data);
    return { success: true, message: 'Message sent!' };
  } catch {
    saveFallback('simple-contact', data);
    return { success: true, message: 'Message sent!' };
  }
};

export const submitTestimonial = async (data: {
  name: string;
  roleCompany: string;
  message: string;
}): Promise<{ success: boolean; message?: string; notionPageId?: string }> => {
  try {
    const response = await fetch('/api/submit-testimonial', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: data.name, roleCompany: data.roleCompany, message: data.message })
    });
    const text = await response.text();
    const result = text ? JSON.parse(text) : {};
    if (response.ok && result.success !== false) {
      return { success: true, message: result.message || 'Thank you for your testimonial!', notionPageId: result.notionPageId };
    }
    saveFallback('testimonial', data);
    return { success: true, message: 'Thank you for your testimonial!' };
  } catch {
    saveFallback('testimonial', data);
    return { success: true, message: 'Thank you for your testimonial!' };
  }
};

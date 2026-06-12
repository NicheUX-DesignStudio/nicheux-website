async function sendWhatsAppNotification(message) {
  const whatsappNumber = "447342736804";
  console.log("[WHATSAPP] To: " + whatsappNumber);
  console.log("[WHATSAPP] Message: " + message);
  // Add actual WhatsApp API here later
  return true;
}

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { Client } from '@notionhq/client';
import Anthropic from '@anthropic-ai/sdk';
import nodemailer from 'nodemailer';
import { writeFile, readFile, mkdir } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env relative to this file so it works regardless of CWD
dotenv.config({ path: path.join(__dirname, '.env') });

// Notion credentials — env vars take priority; hardcoded values are live-server fallbacks
const NOTION_TOKEN = process.env.NOTION_TOKEN || 'ntn_c49892259107pfDJ4CUl568tFRqQuaP1tsPfWaip5HQbSe';
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID || '2b3129618bb680ccae40d6c190759238';
const TESTIMONIALS_TOKEN = process.env.TESTIMONIALS_TOKEN || 'ntn_W49892259107vYyua0YLx6dEXgTuMXDCm3xqOB3KlWy2g6';
const TESTIMONIALS_DATABASE_ID = process.env.TESTIMONIALS_DATABASE_ID || '2c8129618bb680108025dbd800ca7ee0';
const GALLERY_DATABASE_ID = process.env.GALLERY_DATABASE_ID || '368129618bb6808486bdea11715f0239';
const PRODUCTS_DATABASE_ID = process.env.PRODUCTS_DATABASE_ID || '368129618bb68040a07bf9f98c0559bd';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Notion client
const notion = new Client({
  auth: NOTION_TOKEN,
});

// Testimonials Notion client (uses different token if available)
const testimonialsNotion = new Client({
  auth: TESTIMONIALS_TOKEN,
});

// Database IDs
const NOTION_DATABASE_IDS = {
  testimonials: TESTIMONIALS_DATABASE_ID,
  contacts: NOTION_DATABASE_ID,
};

// ==================== EMAIL SETUP ====================
// Uses Gmail App Password. Set GMAIL_USER and GMAIL_APP_PASSWORD in .env
const emailTransporter = process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD
  ? nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })
  : null;

async function sendEmail(subject, html) {
  if (!emailTransporter) return;
  try {
    await emailTransporter.sendMail({
      from: `"NicheUX Website" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject,
      html,
    });
    console.log('✅ Email notification sent');
  } catch (err) {
    console.error('⚠️ Email notification failed (non-fatal):', err.message);
  }
}

// WhatsApp notification via Callmebot (free, no approval needed)
// Setup: Save +34 644 59 86 09 on WhatsApp, send "I allow callmebot to send me messages"
// You'll receive an API key. Set WHATSAPP_API_KEY=yourkey in .env
const WA_NUMBER = '447342736804';
async function sendWhatsApp(message) {
  const apiKey = process.env.WHATSAPP_API_KEY;
  if (!apiKey) return;
  try {
    const encoded = encodeURIComponent(message);
    const url = `https://api.callmebot.com/whatsapp.php?phone=${WA_NUMBER}&text=${encoded}&apikey=${apiKey}`;
    await fetch(url);
    console.log('✅ WhatsApp notification sent');
  } catch (err) {
    console.error('⚠️ WhatsApp notification failed (non-fatal):', err.message);
  }
}

// ==================== FALLBACK FILE SAVE ====================
// Saves form submissions to a local JSON file when Notion is unavailable.
// Check submissions_fallback.json on the server to retrieve these entries.
async function saveSubmissionFallback(type, data) {
  try {
    // Vercel serverless: /tmp is the only writable path; local dev uses data/
    const dir = process.env.VERCEL ? '/tmp' : path.join(__dirname, 'data');
    await mkdir(dir, { recursive: true });
    const filePath = path.join(dir, 'submissions_fallback.json');
    let entries = [];
    try {
      const existing = await readFile(filePath, 'utf8');
      entries = JSON.parse(existing);
    } catch {}
    entries.push({ timestamp: new Date().toISOString(), type, ...data });
    await writeFile(filePath, JSON.stringify(entries, null, 2), 'utf8');
    console.log(`✅ Fallback save successful (${type})`);
    return true;
  } catch (err) {
    console.error('⚠️ Fallback save failed:', err.message);
    return false;
  }
}

// Helper function to map form fields to database properties
function findPropertyKey(properties, searchTerms) {
  const propertyNames = Object.keys(properties);
  
  for (const searchTerm of searchTerms) {
    for (const propName of propertyNames) {
      if (propName.toLowerCase().includes(searchTerm.toLowerCase())) {
        return { name: propName, type: properties[propName].type };
      }
    }
  }
  
  return null;
}

// ==================== MAIN CONTACT FORM ENDPOINT ====================
app.post('/api/submit-to-notion', async (req, res) => {
  try {
    const { 
      name, 
      email, 
      phone, 
      company, 
      website, 
      projectType, 
      budget, 
      timeline, 
      message,
      country,
      service,
      services, // multi-select
      currency,
      estimateAmount,
      source
    } = req.body;

    console.log('📝 Contact form received:', { 
      name, email, phone, company, country, service 
    });

    // Basic validation
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: 'Name and email are required.'
      });
    }

    // Get database properties
    let databaseProperties = {};
    try {
      if (!NOTION_TOKEN || !NOTION_DATABASE_ID) {
        throw new Error('Notion env vars not configured');
      }
      const database = await notion.databases.retrieve({
        database_id: NOTION_DATABASE_IDS.contacts
      });
      databaseProperties = database.properties;
      console.log('📋 Database properties found:', Object.keys(databaseProperties));
    } catch (dbError) {
      console.error('❌ Notion DB error — saving to fallback file:', dbError.message);
      await saveSubmissionFallback('contact', { name, email, phone, company, message, services, country, currency, estimateAmount });
      await sendEmail('New Contact Form (fallback)', `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Phone:</b> ${phone || 'N/A'}</p><p><b>Company:</b> ${company || 'N/A'}</p><p><b>Services:</b> ${(services || []).join(', ')}</p><p><b>Message:</b> ${message || 'N/A'}</p><p><b>Country:</b> ${country || 'N/A'}</p><p><b>Estimate:</b> ${currency || ''}${estimateAmount || 0}</p>`);
      return res.status(200).json({ success: true, message: 'Your enquiry has been received!' });
    }

    // Build ALL properties for your form
    const properties = {};

    // 1. NAME field
    const nameMatch = findPropertyKey(databaseProperties, ['name', 'client', 'full name', 'contact']);
    if (nameMatch) {
      if (nameMatch.type === 'title') {
        properties[nameMatch.name] = {
          title: [{ text: { content: (name || '').trim() } }]
        };
      } else if (nameMatch.type === 'rich_text') {
        properties[nameMatch.name] = {
          rich_text: [{ text: { content: (name || '').trim() } }]
        };
      } else {
        console.log(`⚠️ Name field "${nameMatch.name}" is type "${nameMatch.type}", treating as text`);
        properties[nameMatch.name] = {
          rich_text: [{ text: { content: (name || '').trim() } }]
        };
      }
    }

    // 2. EMAIL field
    const emailMatch = findPropertyKey(databaseProperties, ['email', 'e-mail']);
    if (emailMatch) {
      if (emailMatch.type === 'email') {
        properties[emailMatch.name] = {
          email: (email || '').trim()
        };
      } else {
        properties[emailMatch.name] = {
          rich_text: [{ text: { content: (email || '').trim() } }]
        };
      }
    }

    // 3. PHONE field
    const phoneMatch = findPropertyKey(databaseProperties, ['phone', 'mobile', 'telephone', 'phone_number']);
    if (phoneMatch && phone && phone.trim()) {
      if (phoneMatch.type === 'phone_number') {
        properties[phoneMatch.name] = {
          phone_number: phone.trim()
        };
      } else {
        properties[phoneMatch.name] = {
          rich_text: [{ text: { content: phone.trim() } }]
        };
      }
    }

    // 4. COMPANY field
    const companyMatch = findPropertyKey(databaseProperties, ['company', 'organization', 'business']);
    if (companyMatch && company && company.trim()) {
      properties[companyMatch.name] = {
        rich_text: [{ text: { content: company.trim() } }]
      };
    }

    // 5. WEBSITE field
    const websiteMatch = findPropertyKey(databaseProperties, ['website', 'url', 'link']);
    if (websiteMatch && website && website.trim()) {
      if (websiteMatch.type === 'url') {
        properties[websiteMatch.name] = {
          url: website.trim()
        };
      } else {
        properties[websiteMatch.name] = {
          rich_text: [{ text: { content: website.trim() } }]
        };
      }
    }

    // 6. PROJECT TYPE field (select)
    const projectTypeMatch = findPropertyKey(databaseProperties, ['project type', 'project', 'type', 'category']);
    if (projectTypeMatch && projectType && projectType.trim()) {
      if (projectTypeMatch.type === 'select') {
        properties[projectTypeMatch.name] = {
          select: { name: projectType.trim() }
        };
      } else {
        properties[projectTypeMatch.name] = {
          rich_text: [{ text: { content: projectType.trim() } }]
        };
      }
    }

    // 7. BUDGET field (select)
    const budgetMatch = findPropertyKey(databaseProperties, ['budget', 'price', 'amount', 'cost']);
    if (budgetMatch && budget && budget.trim()) {
      if (budgetMatch.type === 'select') {
        properties[budgetMatch.name] = {
          select: { name: budget.trim() }
        };
      } else if (budgetMatch.type === 'number') {
        properties[budgetMatch.name] = {
          number: parseFloat(budget.replace(/[^0-9.]/g, '')) || 0
        };
      } else {
        properties[budgetMatch.name] = {
          rich_text: [{ text: { content: budget.trim() } }]
        };
      }
    }

    // 8. TIMELINE field (select)
    const timelineMatch = findPropertyKey(databaseProperties, ['timeline', 'deadline', 'schedule', 'timeframe']);
    if (timelineMatch && timeline && timeline.trim()) {
      if (timelineMatch.type === 'select') {
        properties[timelineMatch.name] = {
          select: { name: timeline.trim() }
        };
      } else {
        properties[timelineMatch.name] = {
          rich_text: [{ text: { content: timeline.trim() } }]
        };
      }
    }

    // 9. MESSAGE field
    const messageMatch = findPropertyKey(databaseProperties, ['message', 'description', 'details', 'notes', 'project']);
    if (messageMatch && message && message.trim()) {
      properties[messageMatch.name] = {
        rich_text: [{ text: { content: message.trim() } }]
      };
    }

    // 10. COUNTRY field
    const countryMatch = findPropertyKey(databaseProperties, ['country', 'location', 'region', 'territory']);
    if (countryMatch && country && country.trim()) {
      properties[countryMatch.name] = {
        rich_text: [{ text: { content: country.trim() } }]
      };
    }

    // 11. SERVICE field (select) - single service
    const serviceMatch = findPropertyKey(databaseProperties, ['service', 'services', 'offering', 'product']);
    if (serviceMatch && service && service.trim()) {
      if (serviceMatch.type === 'select') {
        properties[serviceMatch.name] = {
          select: { name: service.trim() }
        };
      } else if (serviceMatch.type === 'multi_select') {
        properties[serviceMatch.name] = {
          multi_select: [{ name: service.trim() }]
        };
      } else {
        properties[serviceMatch.name] = {
          rich_text: [{ text: { content: service.trim() } }]
        };
      }
    }

    // 12. SERVICES field (multi-select) - multiple services
    if (services && (Array.isArray(services) || services.trim())) {
      const servicesMatch = findPropertyKey(databaseProperties, ['services', 'service', 'interests', 'categories']);
      if (servicesMatch && servicesMatch.type === 'multi_select') {
        let servicesArray = [];
        if (Array.isArray(services)) {
          servicesArray = services.map(s => ({ name: String(s).trim() })).filter(s => s.name);
        } else if (services.trim()) {
          servicesArray = [{ name: services.trim() }];
        }
        
        if (servicesArray.length > 0) {
          properties[servicesMatch.name] = {
            multi_select: servicesArray
          };
        }
      }
    }

    // 13. CURRENCY field
    const currencyMatch = findPropertyKey(databaseProperties, ['currency', 'money', 'currency type']);
    if (currencyMatch && currency && currency.trim()) {
      if (currencyMatch.type === 'select') {
        properties[currencyMatch.name] = {
          select: { name: currency.trim() }
        };
      } else {
        properties[currencyMatch.name] = {
          rich_text: [{ text: { content: currency.trim() } }]
        };
      }
    }

    // 14. ESTIMATE AMOUNT field (number)
    const estimateMatch = findPropertyKey(databaseProperties, ['estimate', 'amount', 'value', 'price', 'cost', 'estimateamount']);
    if (estimateMatch && estimateAmount) {
      if (estimateMatch.type === 'number') {
        const amount = parseFloat(estimateAmount);
        if (!isNaN(amount)) {
          properties[estimateMatch.name] = {
            number: amount
          };
        }
      } else {
        properties[estimateMatch.name] = {
          rich_text: [{ text: { content: String(estimateAmount) } }]
        };
      }
    }

    // 15. SOURCE field (where they heard about you)
    const sourceMatch = findPropertyKey(databaseProperties, ['source', 'referral', 'heard from', 'origin']);
    if (sourceMatch && source && source.trim()) {
      if (sourceMatch.type === 'select') {
        properties[sourceMatch.name] = {
          select: { name: source.trim() }
        };
      } else {
        properties[sourceMatch.name] = {
          rich_text: [{ text: { content: source.trim() } }]
        };
      }
    }

    // 16. STATUS field (auto-set to "New")
    const statusMatch = findPropertyKey(databaseProperties, ['status', 'stage', 'state']);
    if (statusMatch && statusMatch.type === 'select') {
      properties[statusMatch.name] = {
        select: { name: 'New' }
      };
    }

    // 17. DATE field (auto-set to now)
    const dateMatch = findPropertyKey(databaseProperties, ['date', 'created', 'submitted', 'timestamp']);
    if (dateMatch && dateMatch.type === 'date') {
      properties[dateMatch.name] = {
        date: { start: new Date().toISOString() }
      };
    }

    console.log('📤 Sending to Notion with properties:', Object.keys(properties));

    // Submit to Notion
    const response = await notion.pages.create({
      parent: { 
        database_id: NOTION_DATABASE_IDS.contacts 
      },
      properties: properties
    });

    console.log('✅ Successfully submitted to Notion:', response.id);

    const waMsg = `New Brief from NicheUX website\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nServices: ${(services || [service]).filter(Boolean).join(', ')}\nTimeline: ${timeline || 'N/A'}\nCountry: ${country || 'Unknown'}\nMessage: ${(message || '').slice(0, 200)}`;
    sendWhatsApp(waMsg);
    sendEmail(
      `New Brief from ${name} — NicheUX`,
      `<h2>New Project Brief</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Services:</strong> ${(services || [service]).filter(Boolean).join(', ')}</p>
      <p><strong>Message:</strong> ${message || 'Not provided'}</p>
      <p><strong>Timeline:</strong> ${timeline || 'Not specified'}</p>
      <p><strong>Country:</strong> ${country || 'Unknown'}</p>
      <p><strong>Source:</strong> ${source || 'Not specified'}</p>
      <p><strong>Notion page:</strong> ${response.id}</p>`
    );

    res.json({
      success: true,
      message: 'Your inquiry has been submitted successfully!',
      data: {
        id: response.id,
        createdTime: response.created_time
      }
    });

  } catch (error) {
    console.error('❌ Notion submission failed:', error.message);

    // Fallback: capture via email so the lead is never lost
    const fallbackHtml = `
      <h2>New Brief (Notion failed — manual entry needed)</h2>
      <p><strong>Notion error:</strong> ${error.message}</p>
      <hr/>
      <p><strong>Name:</strong> ${req.body.name}</p>
      <p><strong>Email:</strong> ${req.body.email}</p>
      <p><strong>Phone:</strong> ${req.body.phone || 'Not provided'}</p>
      <p><strong>Services:</strong> ${(req.body.services || []).join(', ')}</p>
      <p><strong>Message:</strong> ${req.body.message || 'Not provided'}</p>
      <p><strong>Timeline:</strong> ${req.body.timeline || 'Not specified'}</p>
      <p><strong>Country:</strong> ${req.body.country || 'Unknown'}</p>
      <p><strong>Source:</strong> ${req.body.source || 'Not specified'}</p>
    `;
    await sendEmail(`New Brief from ${req.body.name} — NicheUX (Notion failed)`, fallbackHtml);
    sendWhatsApp(`New Brief (Notion failed) from ${req.body.name} (${req.body.email}). Services: ${(req.body.services||[]).join(', ')}. Message: ${(req.body.message||'').slice(0,120)}`);

    // Return success to visitor — data captured via email, don't frustrate the lead
    res.json({
      success: true,
      message: 'Your brief has been received! We will be in touch within 24 hours.',
    });
  }
});

// ==================== TESTIMONIAL ENDPOINT ====================
app.post('/api/submit-testimonial', async (req, res) => {
  try {
    const { name, roleCompany, message } = req.body;
    
    console.log('📝 Testimonial form received:', { name, roleCompany });

    if (!name || !roleCompany || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, role/company, and testimonial are required'
      });
    }

    if (!TESTIMONIALS_TOKEN || !TESTIMONIALS_DATABASE_ID) {
      console.warn('⚠️ Testimonials env vars not set — saving to fallback file');
      await saveSubmissionFallback('testimonial', { name, roleCompany, message });
      await sendEmail('New Testimonial (fallback)', `<p><b>Name:</b> ${name}</p><p><b>Role/Company:</b> ${roleCompany}</p><p><b>Testimonial:</b> ${message}</p>`);
      return res.status(200).json({ success: true, message: 'Thank you for your testimonial!' });
    }

    // Get testimonials database properties
    let databaseProperties = {};
    try {
      const database = await testimonialsNotion.databases.retrieve({
        database_id: TESTIMONIALS_DATABASE_ID
      });
      databaseProperties = database.properties;
      console.log('📋 Testimonials DB properties:', Object.keys(databaseProperties));
    } catch (dbError) {
      console.error('❌ Testimonials DB error — saving to fallback file:', dbError.message);
      await saveSubmissionFallback('testimonial', { name, roleCompany, message });
      await sendEmail('New Testimonial (fallback)', `<p><b>Name:</b> ${name}</p><p><b>Role/Company:</b> ${roleCompany}</p><p><b>Testimonial:</b> ${message}</p>`);
      return res.status(200).json({ success: true, message: 'Thank you for your testimonial!' });
    }

    // Build properties for testimonial
    const properties = {};

    // 1. NAME field
    const nameMatch = findPropertyKey(databaseProperties, ['name', 'client', 'person', 'author']);
    if (nameMatch) {
      if (nameMatch.type === 'title') {
        properties[nameMatch.name] = {
          title: [{ text: { content: name.trim() } }]
        };
      } else {
        properties[nameMatch.name] = {
          rich_text: [{ text: { content: name.trim() } }]
        };
      }
    }

    // 2. ROLE/COMPANY field
    const roleMatch = findPropertyKey(databaseProperties, ['role', 'company', 'position', 'title']);
    if (roleMatch) {
      properties[roleMatch.name] = {
        rich_text: [{ text: { content: roleCompany.trim() } }]
      };
    }

    // 3. TESTIMONIAL field
    const testimonialMatch = findPropertyKey(databaseProperties, ['testimonial', 'message', 'review', 'comment', 'feedback']);
    if (testimonialMatch) {
      properties[testimonialMatch.name] = {
        rich_text: [{ text: { content: message.trim() } }]
      };
    }

    // 4. DATE field
    const dateMatch = findPropertyKey(databaseProperties, ['date', 'created', 'submitted']);
    if (dateMatch && dateMatch.type === 'date') {
      properties[dateMatch.name] = {
        date: { start: new Date().toISOString() }
      };
    }

    // 5. APPROVED field (checkbox)
    const approvedMatch = findPropertyKey(databaseProperties, ['approved', 'verified', 'published']);
    if (approvedMatch && approvedMatch.type === 'checkbox') {
      properties[approvedMatch.name] = {
        checkbox: false
      };
    }

    console.log('📤 Sending testimonial to Notion:', properties);

    // Submit to Testimonials database
    const response = await testimonialsNotion.pages.create({
      parent: { 
        database_id: TESTIMONIALS_DATABASE_ID 
      },
      properties: properties
    });

    console.log('✅ Testimonial created:', response.id);

    sendWhatsApp(`New Testimonial from ${name} (${roleCompany}): "${message.slice(0, 200)}"`);
    sendEmail(
      `New Testimonial from ${name} — NicheUX`,
      `<h2>New Testimonial Submitted</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Role/Company:</strong> ${roleCompany}</p>
      <p><strong>Review:</strong><br>${message}</p>
      <p><strong>Notion page:</strong> ${response.id}</p>
      <p><em>Log into Notion to approve and publish this testimonial.</em></p>`
    );

    return res.status(200).json({
      success: true,
      message: 'Thank you! Your testimonial has been submitted.',
      notionPageId: response.id
    });

  } catch (error) {
    console.error('❌ Error submitting testimonial:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to submit testimonial'
    });
  }
});

// ==================== GET TESTIMONIALS ENDPOINT ====================
app.get('/api/get-testimonials', async (req, res) => {
  try {
    if (!TESTIMONIALS_TOKEN || !TESTIMONIALS_DATABASE_ID) {
      return res.status(200).json({ success: true, testimonials: [] });
    }

    const response = await testimonialsNotion.databases.query({
      database_id: TESTIMONIALS_DATABASE_ID,
      page_size: 20,
      sorts: [{ timestamp: 'created_time', direction: 'descending' }],
    });

    const testimonials = response.results
      .map((page) => {
        const props = page.properties;
        const getText = (key) => {
          const prop = props[key];
          if (!prop) return '';
          if (prop.type === 'title') return prop.title?.[0]?.plain_text || '';
          if (prop.type === 'rich_text') return prop.rich_text?.[0]?.plain_text || '';
          return '';
        };
        // Try common field names
        const name = getText('Name') || getText('name') || getText('Client');
        const role = getText('Role') || getText('role') || getText('Company') || getText('Position');
        const quote = getText('Testimonial') || getText('Message') || getText('Quote') || getText('message');
        if (!name || !quote) return null;
        return { name, role, quote };
      })
      .filter(Boolean);

    console.log(`✅ Fetched ${testimonials.length} testimonials from Notion`);
    return res.status(200).json({ success: true, testimonials });
  } catch (error) {
    console.error('❌ Error fetching testimonials:', error.message);
    return res.status(200).json({ success: true, testimonials: [] });
  }
});

// ==================== SIMPLE CONTACT ENDPOINT ====================
app.post('/api/submit-simple-contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    console.log('📧 Simple contact form received:', { name, email });

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required'
      });
    }

    if (!NOTION_TOKEN || !NOTION_DATABASE_ID) {
      console.warn('⚠️ Notion env vars not set — saving to fallback file');
      await saveSubmissionFallback('simple-contact', { name, email, message });
      await sendEmail('New Contact Message (fallback)', `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Message:</b> ${message}</p>`);
      return res.status(200).json({ success: true, message: 'Message received!' });
    }

    // Get database properties
    let databaseProperties = {};
    try {
      const database = await notion.databases.retrieve({
        database_id: NOTION_DATABASE_ID
      });
      databaseProperties = database.properties;
      console.log('📋 Simple contact DB properties:', Object.keys(databaseProperties));
    } catch (dbError) {
      console.error('❌ Notion DB error — saving to fallback file:', dbError.message);
      await saveSubmissionFallback('simple-contact', { name, email, message });
      await sendEmail('New Contact Message (fallback)', `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Message:</b> ${message}</p>`);
      return res.status(200).json({ success: true, message: 'Message received!' });
    }

    // Build properties for simple contact
    const properties = {};

    // 1. NAME field
    const nameMatch = findPropertyKey(databaseProperties, ['name', 'client', 'full name']);
    if (nameMatch) {
      if (nameMatch.type === 'title') {
        properties[nameMatch.name] = {
          title: [{ text: { content: name.trim() } }]
        };
      } else {
        properties[nameMatch.name] = {
          rich_text: [{ text: { content: name.trim() } }]
        };
      }
    }

    // 2. EMAIL field
    const emailMatch = findPropertyKey(databaseProperties, ['email', 'e-mail']);
    if (emailMatch) {
      if (emailMatch.type === 'email') {
        properties[emailMatch.name] = {
          email: email.trim()
        };
      } else {
        properties[emailMatch.name] = {
          rich_text: [{ text: { content: email.trim() } }]
        };
      }
    }

    // 3. MESSAGE field
    const messageMatch = findPropertyKey(databaseProperties, ['message', 'description', 'project', 'inquiry']);
    if (messageMatch && message && message.trim()) {
      properties[messageMatch.name] = {
        rich_text: [{ text: { content: message.trim() } }]
      };
    }

    // 4. SERVICE field (set as "General Inquiry")
    const serviceMatch = findPropertyKey(databaseProperties, ['service', 'type', 'inquiry type']);
    if (serviceMatch) {
      if (serviceMatch.type === 'select') {
        properties[serviceMatch.name] = {
          select: { name: 'General Inquiry' }
        };
      } else if (serviceMatch.type === 'multi_select') {
        properties[serviceMatch.name] = {
          multi_select: [{ name: 'General Inquiry' }]
        };
      }
    }

    // 5. SOURCE field
    const sourceMatch = findPropertyKey(databaseProperties, ['source', 'origin', 'referral']);
    if (sourceMatch) {
      if (sourceMatch.type === 'select') {
        properties[sourceMatch.name] = {
          select: { name: 'Website Contact Form' }
        };
      } else {
        properties[sourceMatch.name] = {
          rich_text: [{ text: { content: 'Website Contact Form' } }]
        };
      }
    }

    // 6. DATE field
    const dateMatch = findPropertyKey(databaseProperties, ['date', 'created']);
    if (dateMatch && dateMatch.type === 'date') {
      properties[dateMatch.name] = {
        date: { start: new Date().toISOString() }
      };
    }

    // 7. STATUS field
    const statusMatch = findPropertyKey(databaseProperties, ['status', 'stage']);
    if (statusMatch && statusMatch.type === 'select') {
      properties[statusMatch.name] = {
        select: { name: 'New' }
      };
    }

    console.log('📤 Sending simple contact to Notion:', properties);

    // Submit to Notion
    const response = await notion.pages.create({
      parent: { 
        database_id: NOTION_DATABASE_ID 
      },
      properties: properties
    });

    console.log('✅ Simple contact created:', response.id);
    sendWhatsApp(`Homepage contact from ${name} (${email}): "${(message || '').slice(0, 200)}"`);

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully!',
      notionPageId: response.id
    });

  } catch (error) {
    console.error('❌ Error submitting simple contact:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to send message'
    });
  }
});

// ==================== DEBUG ENDPOINTS ====================
// Debug endpoint to see database structure
app.get('/api/debug-database', async (req, res) => {
  try {
    const database = await notion.databases.retrieve({
      database_id: NOTION_DATABASE_IDS.contacts
    });
    
    const properties = {};
    for (const [key, value] of Object.entries(database.properties)) {
      properties[key] = {
        type: value.type,
        id: value.id
      };
    }
    
    res.json({
      success: true,
      databaseId: database.id,
      databaseTitle: database.title[0]?.plain_text || 'Untitled',
      properties: properties,
      totalProperties: Object.keys(properties).length,
      suggestedFields: [
        'Name (Title type)',
        'Email (Email type)',
        'Phone (Phone type)',
        'Message (Rich text type)',
        'Country (Rich text type)',
        'Service (Select or Multi-select type)',
        'Budget (Select type)',
        'Status (Select type)',
        'Date (Date type)'
      ]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      suggestion: 'Check if NOTION_DATABASE_ID and NOTION_TOKEN are set correctly.'
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true,
    status: 'ok', 
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    endpoints: {
      contactForm: 'POST /api/submit-to-notion',
      testimonial: 'POST /api/submit-testimonial',
      simpleContact: 'POST /api/submit-simple-contact',
      debug: 'GET /api/debug-database',
      health: 'GET /api/health'
    }
  });
});

// ==================== GALLERY CMS ENDPOINTS ====================

// GET /api/gallery — fetch gallery items from Notion (falls back to empty if no DB)
app.get('/api/gallery', async (req, res) => {
  const dbId = GALLERY_DATABASE_ID;
  if (!dbId) return res.json({ success: true, items: [] });
  try {
    const response = await notion.databases.query({ database_id: dbId, page_size: 50 });
    const items = response.results.map(page => {
      const p = page.properties;
      const text = k => p[k]?.rich_text?.[0]?.plain_text || p[k]?.title?.[0]?.plain_text || '';
      const sel  = k => p[k]?.select?.name || '';
      const anyUrl = k => {
        if (!p[k]) return '';
        if (p[k].type === 'url') return p[k].url || '';
        if (p[k].type === 'files') {
          const f = p[k].files?.[0];
          if (!f) return '';
          return f.type === 'file' ? f.file.url : f.external?.url || '';
        }
        return '';
      };
      // Try specific field names first, then scan all properties for any url/files field
      const src = anyUrl('Src') || anyUrl('Image') || anyUrl('File') || anyUrl('Media') || anyUrl('Photo') ||
        Object.keys(p).reduce((found, k) => found || anyUrl(k), '');
      // Find the title property for name/alt
      const titleProp = Object.entries(p).find(([, v]) => v.type === 'title');
      const name = text('Alt') || text('Name') || text('Title') || (titleProp ? titleProp[1].title?.[0]?.plain_text || '' : '');
      const typeVal = sel('Type') || sel('Media Type') || '';
      return {
        id: page.id,
        type:     typeVal.toLowerCase().includes('video') ? 'video' : 'image',
        src,
        poster:   anyUrl('Poster') || anyUrl('Thumbnail'),
        alt:      name || 'Gallery image',
        category: sel('Category') || sel('Section') || 'Works',
        caption:  text('Caption') || text('Description') || name,
      };
    }).filter(item => item.src);
    res.json({ success: true, items });
  } catch (e) {
    console.error('Gallery fetch error:', e.message);
    res.json({ success: true, items: [] });
  }
});

// POST /api/gallery — add a gallery item from the CMS
app.post('/api/gallery', async (req, res) => {
  const dbId = GALLERY_DATABASE_ID;
  if (!dbId) return res.status(400).json({ success: false, message: 'GALLERY_DATABASE_ID not set' });
  const { type, src, poster, alt, category, caption } = req.body;
  if (!src || !caption) return res.status(400).json({ success: false, message: 'src and caption required' });
  try {
    const page = await notion.pages.create({
      parent: { database_id: dbId },
      properties: {
        Name:      { title: [{ text: { content: caption } }] },
        Type:      { select: { name: type || 'image' } },
        Src:       { url: src },
        Poster:    poster ? { url: poster } : undefined,
        Alt:       { rich_text: [{ text: { content: alt || caption } }] },
        Category:  { select: { name: category || 'Works' } },
        Caption:   { rich_text: [{ text: { content: caption } }] },
        Published: { checkbox: true },
      }
    });
    res.json({ success: true, id: page.id });
  } catch (e) {
    console.error('Gallery create error:', e.message);
    res.status(500).json({ success: false, message: e.message });
  }
});

// ==================== SHOP/PRODUCTS CMS ENDPOINTS ====================

// GET /api/products — fetch products from Notion
app.get('/api/products', async (req, res) => {
  const dbId = PRODUCTS_DATABASE_ID;
  if (!dbId) return res.json({ success: true, products: [] });
  try {
    const response = await notion.databases.query({ database_id: dbId, page_size: 50 });
    const products = response.results.map(page => {
      const p = page.properties;
      const text  = k => p[k]?.rich_text?.[0]?.plain_text || p[k]?.title?.[0]?.plain_text || '';
      const url   = k => p[k]?.url || '';
      const sel   = k => p[k]?.select?.name || '';
      const bool  = k => p[k]?.checkbox ?? false;
      const ACCENT_MAP = { 'Gold': '#E9C672', 'Lavender': '#B097BE', 'Blue': '#89B1CC' };
      return {
        id: page.id,
        name:           text('Name'),
        concept:        text('Concept'),
        tagline:        text('Tagline'),
        narrative:      text('Narrative'),
        price:          text('Price'),
        priceNote:      text('PriceNote'),
        image:          url('Image'),
        badge:          text('Badge') || undefined,
        commissioned:   bool('Commissioned'),
        commissionHint: text('CommissionHint') || undefined,
        accent:         ACCENT_MAP[sel('Accent')] || '#E9C672',
        useContain:     bool('UseContain'),
      };
    });
    res.json({ success: true, products });
  } catch (e) {
    console.error('Products fetch error:', e.message);
    res.json({ success: true, products: [] });
  }
});

// POST /api/products — add a product (from Notion or CMS form)
app.post('/api/products', async (req, res) => {
  const dbId = PRODUCTS_DATABASE_ID;
  if (!dbId) return res.status(400).json({ success: false, message: 'PRODUCTS_DATABASE_ID not set' });
  const { name, concept, tagline, narrative, price, priceNote, image, badge, commissioned, commissionHint, accent, useContain } = req.body;
  if (!name || !price) return res.status(400).json({ success: false, message: 'name and price required' });
  const ACCENT_REV = { '#E9C672': 'Gold', '#B097BE': 'Lavender', '#89B1CC': 'Blue' };
  try {
    const page = await notion.pages.create({
      parent: { database_id: dbId },
      properties: {
        Name:           { title: [{ text: { content: name } }] },
        Concept:        { rich_text: [{ text: { content: concept || '' } }] },
        Tagline:        { rich_text: [{ text: { content: tagline || '' } }] },
        Narrative:      { rich_text: [{ text: { content: narrative || '' } }] },
        Price:          { rich_text: [{ text: { content: price || '' } }] },
        PriceNote:      { rich_text: [{ text: { content: priceNote || '' } }] },
        Image:          image ? { url: image } : undefined,
        Badge:          badge ? { rich_text: [{ text: { content: badge } }] } : undefined,
        Commissioned:   { checkbox: !!commissioned },
        CommissionHint: commissionHint ? { rich_text: [{ text: { content: commissionHint } }] } : undefined,
        Accent:         { select: { name: ACCENT_REV[accent] || 'Gold' } },
        UseContain:     { checkbox: !!useContain },
        Published:      { checkbox: true },
      }
    });
    res.json({ success: true, id: page.id });
  } catch (e) {
    console.error('Product create error:', e.message);
    res.status(500).json({ success: false, message: e.message });
  }
});

// ==================== AI CHAT ENDPOINT ====================
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const NICHEUX_SYSTEM = `You are the NicheUX Studio assistant. NicheUX is a UK-based design studio founded by Thevaki (Creative Director, UI/UX, Web Development). The full team:
- Thevaki: Creative Director, UI/UX, Web Development
- Indhupriya: Character & Illustration Design
- Isaac: Print & Brand Design
- Akash: AI Visuals
- Delwin: Motion Design
- Kishore Aravind: Sales & Marketing

SERVICES AND PRICING (GBP, adjust for other currencies):
- UX Audit & Strategy: from £1,200 (1-2 weeks)
- Complete UI/UX Design: from £4,500 (4-8 weeks)
- Design System: from £3,000 (2-4 weeks)
- Custom Coded Website: from £1,800 (2-3 weeks)
- Custom merchify Store: from £3,800 (4-6 weeks)
- Enterprise Solutions: from £15,000 (6-8+ weeks)
- Website Care Plans: Essential £200/mo, Professional £420/mo, Enterprise £850/mo
- Logo Design: from £550
- Complete Brand Identity: from £4,000
- Starter Brand Kit: from £800
- Social Media Starter Plan: from £650/mo
- Social Media Professional Plan: from £1,200/mo
- 30s Explainer Video: from £1,400
- Logo Animation: from £450
- Single Character Design: from £450
- Children's Book Package: from £2,500

HOW WE WORK:
- Free discovery call first, no obligation
- Custom proposal within 24 hours of brief
- No payment until client approves the direction
- All prices adjust for purchasing power parity by country
- 5 countries served: UK, India, Canada, Ireland, Malaysia
- Contact: hellonicheux@gmail.com | WhatsApp: +447342736804

PERSONALITY: Be warm, direct, and confident. Answer questions about design, pricing, timelines, process, portfolio, and anything else. If someone wants to book a call or get a quote, direct them to /contact or WhatsApp. Never be robotic. Sound like a creative professional who knows their craft. You can answer general design questions, give opinions, explain design concepts, and have real conversations.`;

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array required' });
    }

    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 400,
      system: NICHEUX_SYSTEM,
      messages: messages.slice(-10), // keep last 10 for context
    });

    res.json({ reply: response.content[0].type === 'text' ? response.content[0].text : '' });
  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({ error: 'Chat unavailable. Please email hellonicheux@gmail.com' });
  }
});

// Gallery CMS schema documented above at the first /api/gallery endpoint

// ==================== BLOG CMS (Notion-backed) ====================
// Notion database schema:
//   Name (title) — article title
//   Slug (rich_text) — URL slug e.g. "how-we-built-bloom-brew"
//   Excerpt (rich_text) — one-sentence teaser shown in blog list
//   Category (select) — Case Study | Process | Studio | Industry | Behind the Scenes
//   Cover Image (url) — hero image URL
//   Cover Alt (rich_text) — alt text for cover
//   Author (rich_text) — author name
//   Read Time (number) — estimated minutes
//   Published Date (date) — shown as "15 May 2026"
//   Published (checkbox) — must be checked to appear

app.get('/api/blog', async (req, res) => {
  try {
    const dbId = process.env.BLOG_DATABASE_ID;
    if (!dbId) return res.json({ articles: [] });

    const response = await notion.databases.query({
      database_id: dbId,
      filter: { property: 'Published', checkbox: { equals: true } },
      sorts: [{ property: 'Published Date', direction: 'descending' }],
    });

    const articles = response.results.map(page => {
      const p = page.properties;
      const rawDate = p['Published Date']?.date?.start || '';
      const formatted = rawDate ? new Date(rawDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
      return {
        id: p.Slug?.rich_text?.[0]?.plain_text || page.id,
        slug: p.Slug?.rich_text?.[0]?.plain_text || page.id,
        title: p.Name?.title?.[0]?.plain_text || '',
        excerpt: p.Excerpt?.rich_text?.[0]?.plain_text || '',
        category: p.Category?.select?.name || 'Studio',
        date: formatted,
        readTime: `${p['Read Time']?.number || 5} min`,
        coverImage: p['Cover Image']?.url || '',
        coverAlt: p['Cover Alt']?.rich_text?.[0]?.plain_text || '',
        accent: '#E9C672',
      };
    });

    res.json({ articles });
  } catch (err) {
    console.error('Blog list API error:', err.message);
    res.json({ articles: [] });
  }
});

// Blog article content — fetches Notion page blocks and converts to ArticleBlock format
app.get('/api/blog/:slug', async (req, res) => {
  try {
    const dbId = process.env.BLOG_DATABASE_ID;
    if (!dbId) return res.json({ body: [] });

    // Find the page by slug
    const listRes = await notion.databases.query({
      database_id: dbId,
      filter: {
        and: [
          { property: 'Slug', rich_text: { equals: req.params.slug } },
          { property: 'Published', checkbox: { equals: true } },
        ],
      },
    });

    if (!listRes.results.length) return res.json({ body: [] });
    const pageId = listRes.results[0].id;

    // Fetch the page blocks
    const blocksRes = await notion.blocks.children.list({ block_id: pageId, page_size: 100 });

    const body = blocksRes.results
      .map(block => {
        const getText = arr => arr?.map(t => t.plain_text).join('') || '';
        switch (block.type) {
          case 'paragraph':
            return { type: 'paragraph', content: getText(block.paragraph?.rich_text) };
          case 'heading_1':
          case 'heading_2':
          case 'heading_3':
            return { type: 'heading', content: getText(block[block.type]?.rich_text) };
          case 'bulleted_list_item':
            return { type: 'list', items: [getText(block.bulleted_list_item?.rich_text)] };
          case 'quote':
            return { type: 'quote', content: getText(block.quote?.rich_text) };
          case 'divider':
            return { type: 'divider' };
          case 'image': {
            const imgUrl = block.image?.file?.url || block.image?.external?.url || '';
            const caption = getText(block.image?.caption);
            return { type: 'image', src: imgUrl, alt: caption, caption };
          }
          default:
            return null;
        }
      })
      .filter(Boolean);

    res.json({ body });
  } catch (err) {
    console.error('Blog article API error:', err.message);
    res.json({ body: [] });
  }
});

export default app;

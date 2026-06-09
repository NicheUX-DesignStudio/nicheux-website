import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ 
    success: false, 
    message: 'Method not allowed' 
  });

  try {
    const { 
      name, email, phone, company, timeline, source, 
      message, services, country, currency, estimateAmount 
    } = req.body;
    
    console.log('📞 Contact form received:', { name, email });

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required'
      });
    }

    if (!process.env.NOTION_TOKEN || !process.env.NOTION_DATABASE_ID) {
      console.error('❌ Missing environment variables');
      return res.status(500).json({
        success: false,
        message: 'Server configuration error'
      });
    }

    // Get database properties
    const database = await notion.databases.retrieve({ 
      database_id: process.env.NOTION_DATABASE_ID 
    });
    
    const propertyNames = Object.keys(database.properties);
    console.log('📋 Contact DB properties:', propertyNames);

    // Build properties dynamically
    const properties = {};

    // Name property
    const nameProp = propertyNames.find(p => 
      database.properties[p].type === 'title' || 
      p.toLowerCase().includes('name')
    );
    
    if (nameProp) {
      properties[nameProp] = {
        title: [{ text: { content: name.trim() } }]
      };
    }

    // Email property
    const emailProp = propertyNames.find(p => 
      database.properties[p].type === 'email' || 
      p.toLowerCase().includes('email')
    );
    
    if (emailProp) {
      properties[emailProp] = {
        email: email.trim()
      };
    }

    // Phone property
    const phoneProp = propertyNames.find(p => 
      database.properties[p].type === 'phone_number' || 
      p.toLowerCase().includes('phone')
    );
    
    if (phoneProp && phone && phone.trim()) {
      properties[phoneProp] = {
        phone_number: phone.trim()
      };
    }

    // Company property
    const companyProp = propertyNames.find(p => 
      database.properties[p].type === 'rich_text' || 
      p.toLowerCase().includes('company')
    );
    
    if (companyProp && company && company.trim()) {
      properties[companyProp] = {
        rich_text: [{ text: { content: company.trim() } }]
      };
    }

    // Message/Description property
    const messageProp = propertyNames.find(p => 
      database.properties[p].type === 'rich_text' || 
      p.toLowerCase().includes('message') ||
      p.toLowerCase().includes('description') ||
      p.toLowerCase().includes('project')
    );
    
    if (messageProp && message && message.trim()) {
      properties[messageProp] = {
        rich_text: [{ text: { content: message.trim() } }]
      };
    }

    // Timeline property (select)
    const timelineProp = propertyNames.find(p => 
      database.properties[p].type === 'select' || 
      p.toLowerCase().includes('timeline')
    );
    
    if (timelineProp && timeline && timeline.trim()) {
      properties[timelineProp] = {
        select: { name: timeline.trim() }
      };
    }

    // Source property (select)
    const sourceProp = propertyNames.find(p => 
      database.properties[p].type === 'select' || 
      p.toLowerCase().includes('source')
    );
    
    if (sourceProp && source && source.trim()) {
      properties[sourceProp] = {
        select: { name: source.trim() }
      };
    }

    // Services property (multi-select)
    const servicesProp = propertyNames.find(p => 
      database.properties[p].type === 'multi_select' || 
      p.toLowerCase().includes('service') ||
      p.toLowerCase().includes('interest')
    );
    
    if (servicesProp && services) {
      let servicesArray = [];
      if (Array.isArray(services)) {
        servicesArray = services.map(s => ({ name: String(s).trim() }));
      } else if (services.trim()) {
        servicesArray = [{ name: services.trim() }];
      }
      
      if (servicesArray.length > 0) {
        properties[servicesProp] = {
          multi_select: servicesArray
        };
      }
    }

    // Status property (default to "New")
    const statusProp = propertyNames.find(p => 
      database.properties[p].type === 'select' || 
      p.toLowerCase().includes('status')
    );
    
    if (statusProp) {
      properties[statusProp] = {
        select: { name: 'New' }
      };
    }

    // Date property
    const dateProp = propertyNames.find(p => 
      database.properties[p].type === 'date' ||
      p.toLowerCase().includes('date')
    );
    
    if (dateProp) {
      properties[dateProp] = {
        date: { start: new Date().toISOString() }
      };
    }

    console.log('📦 Sending contact form to Notion:', properties);

    // Create page in Notion
    const response = await notion.pages.create({
      parent: { 
        database_id: process.env.NOTION_DATABASE_ID 
      },
      properties: properties
    });

    console.log('✅ Contact form created:', response.id);

    return res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully!',
      notionPageId: response.id
    });

  } catch (error) {
    console.error('❌ Error submitting contact form:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to submit contact form'
    });
  }
}
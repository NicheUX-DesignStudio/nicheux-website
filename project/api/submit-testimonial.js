import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.TESTIMONIALS_TOKEN || process.env.NOTION_TOKEN,
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
    const { name, roleCompany, message } = req.body;
    
    console.log('🔥 Testimonial received:', { name, roleCompany });

    if (!name || !roleCompany || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, role/company, and testimonial are required'
      });
    }

    const dbId = process.env.TESTIMONIALS_DATABASE_ID || process.env.NOTION_DATABASE_ID;
    const token = process.env.TESTIMONIALS_TOKEN || process.env.NOTION_TOKEN;

    if (!token || !dbId) {
      console.error('❌ Missing environment variables');
      return res.status(500).json({
        success: false,
        message: 'Server configuration error'
      });
    }

    // Get database properties
    const database = await notion.databases.retrieve({ 
      database_id: dbId 
    });
    
    const propertyNames = Object.keys(database.properties);
    console.log('📋 Testimonials DB properties:', propertyNames);

    // Build properties dynamically
    const properties = {};

    // Find name property
    const nameProp = propertyNames.find(p => 
      database.properties[p].type === 'title' || 
      p.toLowerCase().includes('name')
    );
    
    if (nameProp) {
      properties[nameProp] = {
        title: [{ text: { content: name.trim() } }]
      };
    }

    // Find role/company property
    const roleProp = propertyNames.find(p => 
      database.properties[p].type === 'rich_text' || 
      p.toLowerCase().includes('role') ||
      p.toLowerCase().includes('company') ||
      p.toLowerCase().includes('position')
    );
    
    if (roleProp) {
      properties[roleProp] = {
        rich_text: [{ text: { content: roleCompany.trim() } }]
      };
    } else if (propertyNames.find(p => database.properties[p].type === 'rich_text')) {
      // Use any rich_text property
      const richTextProp = propertyNames.find(p => database.properties[p].type === 'rich_text');
      properties[richTextProp] = {
        rich_text: [{ text: { content: roleCompany.trim() } }]
      };
    }

    // Find testimonial/message property
    const messageProp = propertyNames.find(p => 
      database.properties[p].type === 'rich_text' || 
      p.toLowerCase().includes('testimonial') ||
      p.toLowerCase().includes('message') ||
      p.toLowerCase().includes('review') ||
      p.toLowerCase().includes('comment')
    );
    
    if (messageProp) {
      properties[messageProp] = {
        rich_text: [{ text: { content: message.trim() } }]
      };
    }

    // Add date if exists
    const dateProp = propertyNames.find(p => 
      database.properties[p].type === 'date' ||
      p.toLowerCase().includes('date')
    );
    
    if (dateProp) {
      properties[dateProp] = {
        date: { start: new Date().toISOString() }
      };
    }

    // Add approved checkbox if exists
    const approvedProp = propertyNames.find(p => 
      database.properties[p].type === 'checkbox' ||
      p.toLowerCase().includes('approved')
    );
    
    if (approvedProp) {
      properties[approvedProp] = {
        checkbox: false
      };
    }

    console.log('📦 Sending testimonial to Notion:', properties);

    // Create page in Notion
    const response = await notion.pages.create({
      parent: { 
        database_id: dbId 
      },
      properties: properties
    });

    console.log('✅ Testimonial created:', response.id);

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
}
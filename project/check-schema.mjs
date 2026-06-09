import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

async function checkDatabaseSchema() {
  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
        'Notion-Version': '2022-06-28',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Notion API error: ${JSON.stringify(error)}`);
    }

    const database = await response.json();
    
    console.log('📊 Database Title:', database.title[0]?.plain_text || 'Untitled');
    console.log('🔑 Database ID:', database.id);
    console.log('\n📋 Properties in your database:');
    console.log('=' .repeat(50));
    
    Object.entries(database.properties).forEach(([key, prop]) => {
      console.log(`\n${key}:`);
      console.log(`  Type: ${prop.type}`);
      if (prop.type === 'select' && prop.select?.options) {
        console.log(`  Options: ${prop.select.options.map(o => o.name).join(', ')}`);
      }
      if (prop.type === 'multi_select' && prop.multi_select?.options) {
        console.log(`  Options: ${prop.multi_select.options.map(o => o.name).join(', ')}`);
      }
    });
    
  } catch (error) {
    console.error('❌ Error checking database:', error.message);
  }
}

checkDatabaseSchema();

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
    const { name, email, message } = req.body;
    
    console.log("📱 SIMPLE CONTACT ENDPOINT CALLED");
    console.log("📦 Received data:", req.body);

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email required"
      });
    }

    if (!process.env.NOTION_TOKEN || !process.env.NOTION_DATABASE_ID) {
      return res.status(500).json({
        success: false,
        message: "Server configuration error"
      });
    }

    // Build properties with EXACT property names
    const properties = {};
    
    // 1. Name
    properties["Name"] = {
      title: [{ text: { content: name.trim() } }]
    };
    
    // 2. Email
    properties["Email"] = {
      email: email.trim()
    };
    
    // 3. Project Description (if message provided)
    if (message && message.trim()) {
      properties["Project Description"] = {
        rich_text: [{ text: { content: message.trim() } }]
      };
    }
    
    // 4. Add default values for other required fields
    properties["Currency"] = {
      rich_text: [{ text: { content: "£" } }]
    };
    
    properties["Detected Country"] = {
      rich_text: [{ text: { content: "Not specified" } }]
    };

    console.log("📦 Simple contact properties:", JSON.stringify(properties, null, 2));

    const notionResponse = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.NOTION_TOKEN}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28"
      },
      body: JSON.stringify({
        parent: { database_id: process.env.NOTION_DATABASE_ID },
        properties: properties
      })
    });

    if (!notionResponse.ok) {
      const errorText = await notionResponse.text();
      console.error("❌ Notion error:", errorText);
      throw new Error(`Notion API: ${notionResponse.status}`);
    }

    const result = await notionResponse.json();
    console.log("✅ Simple contact created:", result.id);

    return res.status(200).json({
      success: true,
      message: "Message sent successfully!",
      notionPageId: result.id
    });

  } catch (error) {
    console.error("💥 Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error: " + error.message
    });
  }
}
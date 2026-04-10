// Netlify Function to retrieve form submissions
// This function uses Netlify API to get RSVP submissions

exports.handler = async function(event, context) {
  // Only allow authenticated requests
  const password = event.headers['x-admin-password'];
  const correctPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (password !== correctPassword) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Unauthorized' })
    };
  }

  try {
    // Get the site ID and form ID from environment or context
    const siteId = process.env.SITE_ID || context.siteId;
    const netlifyToken = process.env.NETLIFY_TOKEN;

    if (!netlifyToken) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Netlify token not configured' })
      };
    }

    // Fetch submissions from Netlify API
    const response = await fetch(
      `https://api.netlify.com/api/v1/sites/${siteId}/submissions`,
      {
        headers: {
          Authorization: `Bearer ${netlifyToken}`
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch submissions');
    }

    const submissions = await response.json();

    // Filter and format RSVP submissions
    const rsvps = submissions
      .filter(sub => sub.form_name === 'rsvp')
      .map(sub => ({
        date: sub.created_at,
        name: sub.data.name,
        email: sub.data.email,
        phone: sub.data.phone || '',
        guests: sub.data.guests,
        dietary: sub.data.dietary || '',
        comments: sub.data.comments || ''
      }));

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(rsvps)
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to retrieve submissions' })
    };
  }
};

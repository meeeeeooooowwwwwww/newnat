// worker/worker.js

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
  })
  
  async function handleRequest(request) {
    // Scraping the content dynamically from the website
    if (request.url.endsWith('/news-api')) {
      try {
        const response = await fetch('https://warroom.org/');
        const html = await response.text();
        
        // Parse the HTML to extract the desired content
        const headlines = html.match(/<h2 class="headline">(.+?)<\/h2>/g) || [];
  
        let newsContent = '<h2>Latest News</h2>';
        headlines.forEach(headline => {
          newsContent += `<p>${headline.replace(/<\/?h2>/g, '')}</p>`;
        });
        
        return new Response(newsContent, {
          headers: { 'Content-Type': 'text/html' },
        });
      } catch (error) {
        return new Response('Failed to scrape data', { status: 500 });
      }
    }
  
    return new Response('Not Found', { status: 404 });
  }
  
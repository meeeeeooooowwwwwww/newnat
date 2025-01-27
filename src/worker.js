addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
  })
  
  async function handleRequest(request) {
    // Scraping the content dynamically from the website
    if (request.url.endsWith('/news-api')) {
      const response = await fetch('https://warroom.org/');
      const html = await response.text();
      
      // Use a regex or a basic parser to extract the news content
      // For simplicity, let's extract the title and some headlines as an example
      const headlines = html.match(/<h2 class="headline">(.+?)<\/h2>/g) || [];
  
      let newsContent = '<h2>Latest News</h2>';
      headlines.forEach(headline => {
        newsContent += `<p>${headline.replace(/<\/?h2>/g, '')}</p>`;
      });
      
      return new Response(newsContent, {
        headers: { 'Content-Type': 'text/html' },
      });
    }
  
    return new Response('Not Found', { status: 404 })
  }
  
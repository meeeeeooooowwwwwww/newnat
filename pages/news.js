// pages/news.js

import Head from 'next/head'
import { useEffect, useState } from 'react'

export default function News() {
  const [newsContent, setNewsContent] = useState('Loading news...')

  useEffect(() => {
    // Fetch the scraped news content from Cloudflare Worker
    fetch('/news-api')
      .then((response) => response.text())
      .then((content) => {
        setNewsContent(content)
      })
      .catch((error) => {
        setNewsContent('Failed to load news.')
      })
  }, [])

  return (
    <div>
      <Head>
        <title>News</title>
        <meta name="description" content="Latest news content" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Latest News</h1>
        <div
          id="news-content"
          dangerouslySetInnerHTML={{ __html: newsContent }}
        />
      </main>
    </div>
  )
}

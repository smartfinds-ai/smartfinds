import axios from 'axios';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  const { query } = req.body;
  const affiliateTag = 'smartfinds024-20';

  try {
    const searchQuery = encodeURIComponent(`site:amazon.com ${query}`);
    const url = `https://www.bing.com/search?q=${searchQuery}`;

    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    });

    const $ = cheerio.load(response.data);
    const results = [];

    $('li.b_algo').each((i, el) => {
      if (results.length >= 5) return;

      const title = $(el).find('h2').text().trim();
      let link = $(el).find('h2 a').attr('href');

      if (link && link.includes('amazon.com')) {
        const urlObj = new URL(link);
        urlObj.searchParams.set('tag', affiliateTag);
        link = urlObj.toString();

        results.push({ title, link });
      }
    });

    if (results.length === 0) {
      return res.status(200).json({ results: [{ title: 'No Amazon results found.', link: '#' }] });
    }

    res.status(200).json({ results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to search Amazon products.' });
  }
}

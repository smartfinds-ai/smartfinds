export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { query } = req.body;
  if (!query || query.trim() === '') {
    return res.status(400).json({ error: 'Missing search query' });
  }

  // Itt most dummy adatokat adunk vissza, működő Amazon affiliate linkkel
  // Később ide tudunk beilleszteni valódi API hívást

  const affiliateTag = 'smartfinds024-20'; // Amazon affiliate ID-d
  const encodedQuery = encodeURIComponent(query.trim());

  const results = [
    {
      title: `${query} - Amazon ajánlat`,
      price: '$499.99',
      link: `https://www.amazon.com/s?k=${encodedQuery}&tag=${affiliateTag}`,
    },
    {
      title: `${query} - AliExpress ajánlat`,
      price: '$450.00',
      link: `https://www.aliexpress.com/wholesale?SearchText=${encodedQuery}`,
    },
    {
      title: `${query} - eBay ajánlat`,
      price: '$470.00',
      link: `https://www.ebay.com/sch/i.html?_nkw=${encodedQuery}`,
    },
  ];

  res.status(200).json({ results });
}

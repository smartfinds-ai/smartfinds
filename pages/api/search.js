import axios from "axios";
import cheerio from "cheerio";

export default async function handler(req, res) {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Missing query" });
  }

  try {
    const searchQuery = encodeURIComponent(query + " site:amazon.com");
    const googleUrl = `https://www.google.com/search?q=${searchQuery}`;

    const { data } = await axios.get(googleUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
      },
    });

    const $ = cheerio.load(data);
    const links = [];

    $("a").each((_, el) => {
      const href = $(el).attr("href");
      if (href && href.includes("www.amazon.com") && href.includes("/dp/")) {
        const match = href.match(/https?:\/\/www\.amazon\.com\/[^"]+/);
        if (match && match[0]) {
          const url = match[0].split("&")[0];
          if (!links.includes(url)) {
            links.push(url + "?tag=smartfinds024-20"); // 👈 Amazon affiliate ID hozzáadása
          }
        }
      }
    });

    const results = links.slice(0, 5).map((link, i) => ({
      title: `Amazon Result ${i + 1}`,
      link,
    }));

    res.status(200).json({ results });
  } catch (error) {
    console.error("Error during search:", error);
    res.status(500).json({ error: "Search failed" });
  }
}


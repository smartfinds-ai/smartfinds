export default function handler(req, res) {
  const { query } = req.body;

  // Amazon affiliate ID
  const amazonAffiliateTag = "smartfinds024-20";

  // Dummy response – később valós keresés lesz
  const dummyResults = [
    {
      title: "iPhone 13 Black - Amazon",
      price: "$699",
      link: `https://www.amazon.com/dp/example?tag=${amazonAffiliateTag}`
    },
    {
      title: "iPhone 13 Black - AliExpress",
      price: "$659",
      link: "https://www.aliexpress.com/item/example"
    },
    {
      title: "iPhone 13 Black - eBay",
      price: "$670",
      link: "https://www.ebay.com/itm/example"
    }
  ];

  res.status(200).json({ results: dummyResults });
}

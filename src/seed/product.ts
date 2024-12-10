import fs from "fs";
import prisma from "../../prisma/client";

interface DataType {
  id: number;
  uuid: string;
  title: string;
  url: string;
  rate: number;
  rate_count: number;
  thumbnail: string;
  category: string;
  alt: string;
  price: number[];
  dp: string;
}

async function transform_data() {
  const rawData = fs.readFileSync(
    "/home/moodi/work/gift-be/src/seed/data/pet-supplies.json",
    "utf-8"
  );
  const data = JSON.parse(rawData);
  const transformedData = data.map((details: DataType) => {
    const { title, price, dp, rate, rate_count, alt, thumbnail, url } = details;

    let _price = undefined;
    let _discount = undefined;

    if (price.length > 0) {
      _price = price[0];
      _discount = price[1];
    }

    return {
      title,
      price: _price,
      sourceProductId: dp,
      categoryId: 9,
      stock: 5,
      rating: rate,
      discount: _discount,
      createBy: 1,
      sourceName: "Amazon",
      rateCount: rate_count,
      thumbnail,
      alt,
      sourceLink: url,
    };
  });

  return transformedData;
}

async function main() {
  const data = await transform_data();
  const batchSize = 100;

  for (let i = 0; i < data.length; i += batchSize) {
    const batch = data.slice(i, i + batchSize);
    await prisma.product.createMany({ data: batch, skipDuplicates: true });
    console.log(`iteration ${i} imported successfully!`);
  }
}

main()
  .then(() => {
    console.log(`batch finished`);
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });

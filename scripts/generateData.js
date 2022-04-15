#!/usr/bin/env node
const fs = require('fs');
const randomstring = require('randomstring');

function generateData() {
  const result = [];
  for (let categoryIndex = 0; categoryIndex < 100; categoryIndex += 1) {
    const categoryName = randomstring.generate(11);
    const brandBound = Math.floor(Math.random() * 10) + 1;
    for (let brandIndex = 0; brandIndex < brandBound; brandIndex += 1) {
      const brandName = randomstring.generate(11);
      const modelBound = Math.floor(Math.random() * 10) + 1;
      for (let modelIndex = 0; modelIndex < modelBound; modelIndex += 1) {
        const modelName = randomstring.generate(11);
        const variantBound = Math.floor(Math.random() * 10) + 1;
        for (
          let variantIndex = 0;
          variantIndex < variantBound;
          variantIndex += 1
        ) {
          const VariantName = randomstring.generate(11);
          const exponent = (Math.floor(Math.random() * 10) % 4) + 1;
          const total = Math.floor(Math.random() * Math.pow(10, exponent));
          result.push({
            category: categoryName,
            brand: brandName,
            model: modelName,
            variant: VariantName,
            total,
          });
        }
      }
    }
  }

  fs.writeFileSync('resources/mock_data.json', JSON.stringify(result));
}

generateData();

module.exports = generateData;

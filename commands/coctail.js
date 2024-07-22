const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'cocktail',
  description: 'random cocktail recipe',
  usage: '[nashPrefix]cocktail',
  nashPrefix: true,
  execute: async (api, event, args, prefix) => {
    try {
      const response = await axios.get('https://nash-api-end.onrender.com/cocktail');
      const drink = response.data.drinks[0];

      if (drink) {
        const ingredients = [
          `${drink.strMeasure1 ? drink.strMeasure1 + ' ' : ''}${drink.strIngredient1}`,
          `${drink.strMeasure2 ? drink.strMeasure2 + ' ' : ''}${drink.strIngredient2}`,
          `${drink.strMeasure3 ? drink.strMeasure3 + ' ' : ''}${drink.strIngredient3}`,
          `${drink.strMeasure4 ? drink.strMeasure4 + ' ' : ''}${drink.strIngredient4}`,
          `${drink.strMeasure5 ? drink.strMeasure5 + ' ' : ''}${drink.strIngredient5}`,
        ].filter(ingredient => ingredient.trim()).join('\n');
        
        const imageUrl = drink.strDrinkThumb;
        const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imagePath = path.join(__dirname, 'cocktail_image.jpg');
        fs.writeFileSync(imagePath, imageResponse.data);
        
        const message = `
🍹 Cocktail Recipe: ${drink.strDrink}
Category: ${drink.strCategory}
Alcoholic: ${drink.strAlcoholic}
Glass: ${drink.strGlass}

Ingredients:
${ingredients}

Instructions:
${drink.strInstructions}
`;

        await api.sendMessage({
          body: message,
          attachment: fs.createReadStream(imagePath)
        }, event.threadID);
        
        fs.unlinkSync(imagePath);
      } else {
        await api.sendMessage('No cocktail recipe found.', event.threadID);
      }
    } catch (error) {
      console.error('Error fetching or sending the cocktail recipe:', error);
      await api.sendMessage('An error occurred while fetching the cocktail recipe.', event.threadID);
    }
  }
};
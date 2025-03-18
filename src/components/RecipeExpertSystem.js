import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ExpertSystemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IngredientIndicator = styled.div`
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
`;

const NoIngredientMessage = styled.div`
  background-color: #fff3e0;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
`;

const IngredientName = styled.span`
  font-weight: bold;
  color: #4285f4;
`;

const FilterSection = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  color: #333;
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
`;

const FilterGroup = styled.div`
  margin-bottom: 20px;
`;

const FilterLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-right: 15px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const RadioGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  margin-right: 15px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const Select = styled.select`
  width: 100%;
  max-width: 300px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const FindRecipesButton = styled.button`
  background-color: #4285f4;
  color: white;
  border: none;
  padding: 12px 25px;
  font-size: 1.1rem;
  border-radius: 4px;
  cursor: pointer;
  margin: 20px 0;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3367d6;
  }
`;

const ResultsContainer = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const RecipeList = styled.div`
  margin-top: 15px;
`;

const RecipeItem = styled.div`
  padding: 15px;
  margin-bottom: 15px;
  background-color: #f5f5f5;
  border-radius: 4px;
  border-left: 5px solid #4285f4;
`;

const RecipeName = styled.h4`
  margin: 0 0 10px 0;
`;

const RecipeId = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const NoRecipesMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
`;

const BackButton = styled.button`
  background-color: #f5f5f5;
  color: #333;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const ErrorMessage = styled.div`
  color: #db4437;
  background-color: #fbe9e7;
  padding: 10px;
  border-radius: 4px;
  margin: 20px 0;
  text-align: center;
`;

function RecipeExpertSystem({ predictedIngredient }) {
  const navigate = useNavigate();
  const [manualIngredient, setManualIngredient] = useState('');
  const [categories, setCategories] = useState([]);
  const [flavors, setFlavors] = useState([]);
  const [timeRange, setTimeRange] = useState('');
  const [cuisineTypes, setCuisineTypes] = useState([]);
  const [province, setProvince] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [allRecipes, setAllRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load recipes from CSV when component mounts
  useEffect(() => {
    const loadRecipes = async () => {
      try {
        setLoading(true);
        console.log('Fetching CSV file...');
        const response = await fetch('/data/recipes_dataset.csv');
        const csvText = await response.text();
        console.log('CSV text fetched, length:', csvText.length);
        
        // Create hardcoded recipe objects
        const recipes = [
          {
            id: "1",
            name: "Ash Gourd Curry Recipe (Puhul/Wax Gourd/Winter Melon)",
            recipe: "2 medium aubergines, cut into one inch pieces\n1 tsp salt\n½ tsp ground turmeric\nRapeseed (canola) oil for shallow frying\n10 shallots\n2 tbsp coconut oil\n1 tsp black mustard seeds\n1 x 2.5cm (1 inch) cinnamon stick\n3 green cardamom pods, bruised\n20 fresh or frozen curry leaves\n2 x 2.5cm x 2.5cm (1\" x 1\") pandan leaves (optional)\n1 red onion, finely chopped\n2 tbsp garlic and ginger paste\n10 green bird's eye chillies, split lengthwise\n2 large finely chopped tomatoes\n1 tbsp ground coriander\n2 tsp ground cumin\n2 tsp Kashmiri chilli powder\n2 tsp light brown sugar\n2 tbsp distilled white vinegar or coconut vinegar\nInstructions\n1. Take the ash gourd, peel off its skin, and cut off the part of the seed. Rinse and cut it into medium-sized pieces as shown in the picture below. Besides, cut the onion, green chilies, and dried red chilies. Additionally, prepare the coconut milk and take some water. Also, prepare with curry leaves, turmeric powder, salt, mustard seeds, and cooking oil",
            category: "Curries",
            flavor: "Kirata(Using Coconut Milk)",
            time: "20+",
            cuisine: "Lunch,Breakfast,Dinner",
            province: "Western",
            health: "Healthy"
          },
          {
            id: "5",
            name: "Coconut Dhal Curry",
            recipe: "Ingredients:\nSpiced red lentil curry\n▢150 g red lentils ¾ cup\nHeat the dhal while stirring until it starts to simmer, and then allow to simmer for about 2 minutes. Taste and adjust salt to your taste.\nThe curry can be served as is at this point, with some chopped cilantro on top and a squeeze of lime juice. But you can also temper the curry (instructions below) for a big flavor boost!\nTempering dhal curry\nBreak the dried chili in half, or into larger pieces. You can use more than one for a spicier curry.\n1 dried red chili",
            category: "Curries",
            flavor: "Kirata(Using Coconut Milk)",
            time: "10-20",
            cuisine: "Lunch,Breakfast,Dinner",
            province: "Western",
            health: "Healthy"
          },
          {
            id: "10",
            name: "Pumpkin Curry (Sri Lankan)",
            recipe: "Whichever pumpkin you use, you need to scoop out the pumpkin seeds in the center. Then you can cut the pumpkin into pieces.\n\nWith large pumpkins, cut them into wedges that are about 2 inches in width on the skin side. Then cut each wedge into pieces that are about 1 inch thick. You can cut each piece in half for 1 x 1 inch pieces, or keep them at 2 x 1 inch as well.\n\nButternut squash can be prepped by first halving them and then removing the seeds. Then lay them cut side down, and cut pieces that are about 1 x 2 inches.                                                                                                 Prepare all the other ingredients",
            category: "Curries",
            flavor: "Kirata(Using Coconut Milk)",
            time: "10-20",
            cuisine: "Lunch,Breakfast,Dinner",
            province: "Western",
            health: "Healthy"
          },
          {
            id: "15",
            name: "Chicken Curry (Sri Lankan)",
            recipe: "Ingredients\n2 tbsp Kashmiri chilli powder\n2 tbsp good quality curry powder]\n1 kg (1 1/4lb) small bite sized chicken pieces, skin removed and preferably on the bone",
            category: "Curries",
            flavor: "Spicy Flavour",
            time: "20+ mins",
            cuisine: "Lunch,Dinner",
            province: "Central",
            health: "Healthy"
          },
          {
            id: "18",
            name: "Sri Lankan Prawn Curry",
            recipe: "Place the squid in a bowl and cover with the milk. Milk is a natural tenderiser which gives the squid a perfect texture when fried so be sure the squid is completely covered.\nCover the bowl with cling film and place in the fridge overnight to marinate. The milk will turn pink which is natural and fine.\nWhen ready to cook, remove the squid from the milk marinade and discard the milk. Whisk the eggs in a bowl and place the squid in it.\nNow mix the two flours on a plate with the salt, pepper and chilli powder. Dust the egg coated squid thoroughly with the flour mixture and shake off any excess flour. Set aside.\nHeat about 500ml (2 cups) of oil in a wok and heat to 190°C (375°F) over medium high heat. If you don't have an oi thermometer, place a wooden chopstick or spatula in the oil. If thousands of little bubbles form and sizzle on contact, your oil is ready to cook.\nAdd the coconut milk and bring to a simmer. Season with salt and pepper to taste to serve.",
            category: "Curries",
            flavor: "Kirata(Using Coconut Milk),Spicy Flavor,Fried",
            time: "10-20",
            cuisine: "Lunch,Breakfast,Dinner",
            province: "Western",
            health: "Healthy"
          },
          {
            id: "20",
            name: "Sri Lankan Beef Curry",
            recipe: "Ingredients\n900g (2 lbs) stewing beef, cut into bite sized pieces\n2 generous tsp ground cumin\n1 generous tbsp Kashmiri chilli powder or another of choice",
            category: "Curries",
            flavor: "Spicy Flavour",
            time: "20+ mins",
            cuisine: "Lunch,Dinner",
            province: "Central",
            health: "Healthy"
          },
          {
            id: "25",
            name: "Black Pork Curry (Kalu Uru-Mas Curry)",
            recipe: "1 x 2.5cm (1 inch) cinnamon stick\n3 green cardamom pods, bruised\n20 fresh or frozen curry leaves\n2 x 2.5cm x 2.5cm (1\" x 1\") pandan leaves (optional)\n1 red onion, finely chopped\nleaves picked\n600ml chicken stock\n100ml double cream\nPICKLED MUSHROOMS\n75ml white wine vinegar\nDon't be fooled by the black color, this very popular Sri Lankan Black Pork curry is so tender and super flavorful, and smoky. It's a one-pot curry and easy to make. You got to give it a try! ",
            category: "Curries",
            flavor: "Spicy Flavour",
            time: "10-20",
            cuisine: "Lunch",
            province: "Western",
            health: "Healthy"
          },
          {
            id: "29",
            name: "Salmon Curry with Coconut Milk",
            recipe: "Ingredients\nServings\nAdd lemon or lime zest (I usually use 1/2 of a large lime for 1lb/450g of salmon). Also add the green chilies to the curry. Baste the salmon pieces again to mix the zest with the curry. You can gently shake and turn the pan/wok to move the sauce around. Taste the curry and adjust the seasoning. If the curry tastes bland it usually lacks salt. If the curry is not tangy enough, you can add a few drops of lime/lemon juice when the curry is done cooking (adding lime to coconut milk while it's simmering can make the milk curdle. So it's best to wait until the end to add citrus).  Let the curry simmer for another few minutes in the sauce until the salmon pieces are nice and cooked all the way through and the curry has somewhat thickened. ",
            category: "Curries",
            flavor: "Kirata(Using Coconut Milk)",
            time: "10-20",
            cuisine: "Lunch,Breakfast,Dinner",
            province: "Western",
            health: "Healthy"
          },
          {
            id: "31",
            name: "Milk Rice (Kiribath)",
            recipe: "Ingredients\nServings\nAdd cardamom and cloves to a mortar and pestle. Pound them until the cardamom seeds and cloves turn into a fine powder. Pick and discard the cardamom shells. Keep it aside. \n\n\nSieve the flour mix\nInto a bowl, sieve all-purpose flour, baking powder, baking soda, and salt. Give a quick mix. Keep it aside.",
            category: "Rice",
            flavor: "Kirata(Using Coconut Milk)",
            time: "10-20",
            cuisine: "Breakfast",
            province: "Western",
            health: "Healthy"
          },
          {
            id: "35",
            name: "Sri Lankan Sweet Mango Curry",
            recipe: "When the water starts to simmer, lower the heat to medium to low, cover the pot with a lid, and cook for about 45 minutes - 1 hour until mango pieces are soft and tender. Add some water if you feel like the pot is drying out while cooking.\n\nWhen mango pieces are fully cooked and tender, add sugar and mix well. Taste and adjust salt if needed. ",
            category: "Curries",
            flavor: "Kirata(Using Coconut Milk)",
            time: "20+",
            cuisine: "Dinner",
            province: "Western",
            health: "Healthy"
          },
          {
            id: "40",
            name: "Sri Lankan Seeni Sambol",
            recipe: "Heat a large saute pan or a wok and add oil to it. When the oil starts to heat up, add cinnamon sticks, cardamom, and cloves. Let them heat in oil for a few seconds. Then add curry leaves and pandan leaves. (Be careful. Curry leaves and pandan leaves splatter in oil. You can close the pan with a lid for a few seconds for this)\n\nAdd onions and saute until onions become wilted. Then add salt, mix, and cook until there's no moisture left in the pan. Mix from time to time to avoid the bottom layer of onions from burning.\n\nAdd tamarind pulp. Mix well with onions. Cook on medium-low heat, uncovered until onions are jammy in texture and some onion slices are caramelized.",
            category: "Rice",
            flavor: "Spicy Flavour,Fried",
            time: "20+",
            cuisine: "Breakfast,Lunch,Dinner",
            province: "Western",
            health: "Healthy"
          },
          {
            id: "45",
            name: "Sri Lankan Chicken Soup",
            recipe: "3.5 cup chicken or vegetable broth/stock (3.5 cups = 29oz of)\n\n3⁄4 cup egg noodles or ramen noodles\n\n1⁄2 tsp freshly ground black pepper",
            category: "Drinks",
            flavor: "Hot",
            time: "10-20",
            cuisine: "Dinner",
            province: "Western",
            health: "Healthy"
          },
          {
            id: "50",
            name: "Faluda",
            recipe: "3. Bring the milk to the boil in a large heavy-based saucepan. Stir in the sugar, then reduce the heat and simmer over low heat for 2–3 minutes, or until the sugar has dissolved. Remove from the heat and stir in the rose syrup, and set aside to cool slightly.\n\n4. Drain the basil seeds and add to the faluda, followed by the vermicelli noodles. Transfer to a large jug or container and chill in the refrigerator.\n\n5. When the faluda is chilled, carefully remove the jelly from the container and cut into 2cm cubes. Take six tall glasses and fill each one halfway with the jelly and ice cubes, then pour over the faluda. Serve as a drink or dessert.",
            category: "Drinks",
            flavor: "Cold,Shakes",
            time: "1-10",
            cuisine: "Dines",
            province: "Western",
            health: "Healthy"
          }
        ];
        
        console.log(`Using ${recipes.length} pre-parsed recipes`);
        if (recipes.length > 0) {
          console.log('First recipe:', recipes[0]);
        }
        
        setAllRecipes(recipes);
        setLoading(false);
      } catch (err) {
        console.error('Error loading recipes:', err);
        setError('Failed to load recipe data. Please try again.');
        setLoading(false);
      }
    };

    loadRecipes();
  }, []);

  // Simple version that can be re-implemented later when CSV parsing is fixed
  const parseCSVToRecipes = (csvText) => {
    // Placeholder for future implementation
    return [];
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategories(
      e.target.checked
        ? [...categories, value]
        : categories.filter(category => category !== value)
    );
  };

  const handleFlavorChange = (e) => {
    const value = e.target.value;
    setFlavors(
      e.target.checked
        ? [...flavors, value]
        : flavors.filter(flavor => flavor !== value)
    );
  };

  const handleCuisineChange = (e) => {
    const value = e.target.value;
    setCuisineTypes(
      e.target.checked
        ? [...cuisineTypes, value]
        : cuisineTypes.filter(cuisine => cuisine !== value)
    );
  };

  const handleFindRecipes = () => {
    try {
      setError(null);
      const ingredient = predictedIngredient || manualIngredient;
      
      if (!ingredient) {
        setError('Please specify an ingredient');
        return;
      }

      console.log(`Searching for recipes with ingredient: "${ingredient}"`);
      console.log(`Total recipes available: ${allRecipes.length}`);
      
      // Log the first few recipes for debugging
      console.log("Sample recipes:", allRecipes.slice(0, 3));
      
      // Filter recipes based on the criteria
      const filteredRecipes = allRecipes.filter(recipe => {
        // Check if the recipe name OR the recipe text contains the ingredient
        const nameHasIngredient = recipe.name.toLowerCase().includes(ingredient.toLowerCase());
        const recipeHasIngredient = recipe.recipe.toLowerCase().includes(ingredient.toLowerCase());
        const hasIngredient = nameHasIngredient || recipeHasIngredient;
        
        // Additional logging for debugging
        if (hasIngredient) {
          console.log(`Match found in recipe: ${recipe.name} (ID: ${recipe.id})`);
          if (nameHasIngredient) console.log(`   - Match in name`);
          if (recipeHasIngredient) console.log(`   - Match in recipe text`);
        }
        
        if (!hasIngredient) return false;
        
        // Filter by estimated time if specified
        if (timeRange && !recipe.time.includes(timeRange)) {
          console.log(`   - Excluded by time range: ${recipe.time} doesn't match ${timeRange}`);
          return false;
        }
        
        return true;
      });
      
      console.log(`Found ${filteredRecipes.length} matching recipes`);
      setRecipes(filteredRecipes);
      setHasSearched(true);
      
      if (filteredRecipes.length === 0) {
        console.log("No matches found. Trying a fallback search with broader criteria...");
        
        // If no recipes found, try a more lenient search as fallback
        const fallbackRecipes = allRecipes.filter(recipe => 
          // Look for partial word matches in the recipe text
          recipe.recipe.toLowerCase().split(' ').some(word => 
            word.includes(ingredient.toLowerCase()) || 
            ingredient.toLowerCase().includes(word)
          )
        );
        
        console.log(`Fallback search found ${fallbackRecipes.length} recipes`);
        if (fallbackRecipes.length > 0) {
          setRecipes(fallbackRecipes);
        }
      }
    } catch (err) {
      console.error('Error finding recipes:', err);
      setError('Failed to find recipes. Please try again.');
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <ExpertSystemContainer>
      {loading && <div>Loading recipes database...</div>}
      
      {predictedIngredient ? (
        <IngredientIndicator>
          Main Ingredient: <IngredientName>{predictedIngredient}</IngredientName>
        </IngredientIndicator>
      ) : (
        <NoIngredientMessage>
          <p>No ingredient detected. Please enter an ingredient manually:</p>
          <input
            type="text"
            value={manualIngredient}
            onChange={(e) => setManualIngredient(e.target.value)}
            placeholder="Enter ingredient"
            style={{ padding: '8px', marginTop: '10px', width: '250px' }}
          />
        </NoIngredientMessage>
      )}

      <FilterSection>
        <SectionTitle>Recipe Filters</SectionTitle>
        
        <FilterGroup>
          <FilterLabel>Main category:</FilterLabel>
          <CheckboxGroup>
            {["Curries", "Rice", "Drinks", "Dessert", "Snacks", "Salads"].map((category) => (
              <CheckboxLabel key={category}>
                <input
                  type="checkbox"
                  value={category}
                  checked={categories.includes(category)}
                  onChange={handleCategoryChange}
                />
                {category}
              </CheckboxLabel>
            ))}
          </CheckboxGroup>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel>Flavor profile:</FilterLabel>
          <CheckboxGroup>
            {["Spicy", "Kirata", "Fresh", "Fried", "Hot", "Cold", "Shakes"].map((flavor) => (
              <CheckboxLabel key={flavor}>
                <input
                  type="checkbox"
                  value={flavor}
                  checked={flavors.includes(flavor)}
                  onChange={handleFlavorChange}
                />
                {flavor}
              </CheckboxLabel>
            ))}
          </CheckboxGroup>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel>Estimated time:</FilterLabel>
          <RadioGroup>
            {["1-10 mins", "10-20 mins", "20+ mins"].map((time) => (
              <RadioLabel key={time}>
                <input
                  type="radio"
                  value={time}
                  checked={timeRange === time}
                  onChange={(e) => setTimeRange(e.target.value)}
                />
                {time}
              </RadioLabel>
            ))}
          </RadioGroup>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel>Sri Lankan cuisine:</FilterLabel>
          <CheckboxGroup>
            {["Lunch", "Breakfast", "Dinner", "Dines"].map((cuisine) => (
              <CheckboxLabel key={cuisine}>
                <input
                  type="checkbox"
                  value={cuisine}
                  checked={cuisineTypes.includes(cuisine)}
                  onChange={handleCuisineChange}
                />
                {cuisine}
              </CheckboxLabel>
            ))}
          </CheckboxGroup>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel>Province:</FilterLabel>
          <Select
            value={province}
            onChange={(e) => setProvince(e.target.value)}
          >
            <option value="">Select a province</option>
            {["Western", "Southern", "Central", "Northern", "Eastern", "North Western", "North Central", "Uva", "Sabaragamuwa"].map((prov) => (
              <option key={prov} value={prov}>{prov}</option>
            ))}
          </Select>
        </FilterGroup>
      </FilterSection>

      <FindRecipesButton onClick={handleFindRecipes}>
        Find Recipes
      </FindRecipesButton>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {hasSearched && (
        <ResultsContainer>
          <SectionTitle>Recommended Recipes</SectionTitle>
          
          <RecipeList>
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <RecipeItem key={recipe.id}>
                  <RecipeName>{recipe.name}</RecipeName>
                  <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                    <strong>Recipe:</strong>
                    <div style={{ maxHeight: '200px', overflowY: 'auto', padding: '10px', background: '#f9f9f9', borderRadius: '4px', marginTop: '5px' }}>
                      {recipe.recipe.split('\n').map((line, index) => (
                        <p key={index} style={{ margin: '3px 0' }}>{line}</p>
                      ))}
                    </div>
                  </div>
                  <RecipeId>ID: {recipe.id}</RecipeId>
                </RecipeItem>
              ))
            ) : (
              <NoRecipesMessage>
                No matching recipes found. Try adjusting your criteria.
              </NoRecipesMessage>
            )}
          </RecipeList>
        </ResultsContainer>
      )}

      <BackButton onClick={handleBackToHome}>
        Back to Ingredient Detection
      </BackButton>
    </ExpertSystemContainer>
  );
}

export default RecipeExpertSystem;
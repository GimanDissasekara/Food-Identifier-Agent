// This service handles loading and filtering recipe data
class RecipeService {
    constructor() {
      this.recipes = [];
      this.isLoaded = false;
    }
  
    async loadRecipes() {
      try {
        // In a real app, this would be an API request
        // For now, we'll use fetch to get the CSV file
        const response = await fetch('/data/recipes_dataset.csv');
        const text = await response.text();
        
        // Parse CSV data
        this.recipes = this.parseCSV(text);
        this.isLoaded = true;
        return this.recipes;
      } catch (error) {
        console.error('Error loading recipes:', error);
        // Fall back to sample data if CSV can't be loaded
        this.recipes = this.getSampleRecipes();
        this.isLoaded = true;
        return this.recipes;
      }
    }
  
    parseCSV(text) {
      // Simple CSV parser
      const lines = text.split('\n');
      const headers = lines[0].split(',');
      
      const recipes = [];
      
      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        
        const values = lines[i].split(',');
        const recipe = {};
        
        headers.forEach((header, index) => {
          recipe[header.trim()] = values[index] ? values[index].trim() : '';
        });
        
        recipes.push(recipe);
      }
      
      return recipes;
    }
  
    getSampleRecipes() {
      // Sample data for testing
      return [
        { 
          "Recipe Id": "001", 
          "Recipe": "Tomato Curry", 
          "Curray Name": "tomato",
          "Main Category": "Curries",
          "Sub Category": "Spicy",
          "Estimated Time": "10-20 mins",
          "Sri Lankan Cuisine": "Lunch",
          "Province": "Western"
        },
        { 
          "Recipe Id": "002", 
          "Recipe": "Tomato Rice", 
          "Curray Name": "tomato",
          "Main Category": "Rice",
          "Sub Category": "Spicy",
          "Estimated Time": "20+ mins",
          "Sri Lankan Cuisine": "Lunch",
          "Province": "Southern"
        },
        { 
          "Recipe Id": "003", 
          "Recipe": "Fresh Tomato Salad", 
          "Curray Name": "tomato",
          "Main Category": "Salads",
          "Sub Category": "Fresh",
          "Estimated Time": "1-10 mins",
          "Sri Lankan Cuisine": "Dinner",
          "Province": "Western"
        },
        { 
          "Recipe Id": "004", 
          "Recipe": "Potato Curry", 
          "Curray Name": "potato",
          "Main Category": "Curries",
          "Sub Category": "Spicy",
          "Estimated Time": "20+ mins",
          "Sri Lankan Cuisine": "Dinner",
          "Province": "Central"
        },
        { 
          "Recipe Id": "005", 
          "Recipe": "Banana Smoothie", 
          "Curray Name": "banana",
          "Main Category": "Drinks",
          "Sub Category": "Shakes",
          "Estimated Time": "1-10 mins",
          "Sri Lankan Cuisine": "Breakfast",
          "Province": "Western"
        }
      ];
    }
  
    findRecipes(options) {
      if (!this.isLoaded) {
        throw new Error('Recipes not loaded');
      }
  
      const { ingredient, categories, flavors, timeRange, cuisineTypes, province } = options;
      
      return this.recipes.filter(recipe => {
        // Check if the recipe contains the ingredient
        const hasIngredient = recipe["Curray Name"].toLowerCase().includes(ingredient.toLowerCase());
        if (!hasIngredient) return false;
        
        // Filter by categories if specified
        if (categories && categories.length > 0 && 
            !categories.some(cat => recipe["Main Category"].includes(cat))) {
          return false;
        }
        
        // Filter by flavors if specified
        if (flavors && flavors.length > 0 && 
            !flavors.some(flavor => recipe["Sub Category"].includes(flavor))) {
          return false;
        }
        
        // Filter by time range if specified
        if (timeRange && recipe["Estimated Time"] !== timeRange) {
          return false;
        }
        
        // Filter by cuisine types if specified
        if (cuisineTypes && cuisineTypes.length > 0 && 
            !cuisineTypes.some(cuisine => recipe["Sri Lankan Cuisine"].includes(cuisine))) {
          return false;
        }
        
        // Filter by province if specified
        if (province && recipe["Province"] !== province) {
          return false;
        }
        
        return true;
      }).slice(0, 3); // Get top 3 results
    }
  }
  
  export default new RecipeService();
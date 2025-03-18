import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ImageUploader from './ImageUploader';

// Styled components
const PredictorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PredictButton = styled.button`
  background-color: #0f9d58;
  color: white;
  border: none;
  padding: 12px 25px;
  font-size: 1.1rem;
  border-radius: 4px;
  cursor: pointer;
  margin: 20px 0;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0b8043;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ResultsContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin-top: 20px;
  padding: 15px;
  border-radius: 8px;
  background-color: #f5f5f5;
`;

const ResultTitle = styled.h3`
  color: #333;
  margin-bottom: 15px;
  text-align: center;
`;

const PredictionList = styled.ul`
  list-style: none;
  padding: 0;
`;

const PredictionItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const IngredientName = styled.span`
  font-weight: bold;
`;

const Confidence = styled.span`
  color: #0f9d58;
`;

const RecipesButton = styled.button`
  background-color: #db4437;
  color: white;
  border: none;
  padding: 12px 25px;
  font-size: 1.1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c53929;
  }
`;

const LoadingMessage = styled.div`
  font-size: 1.1rem;
  color: #666;
  margin: 20px 0;
`;

const ErrorMessage = styled.div`
  color: #db4437;
  background-color: #fbe9e7;
  padding: 10px;
  border-radius: 4px;
  margin: 20px 0;
  text-align: center;
`;

// Mock function to simulate model prediction based on image colors
const mockPredictionFromImage = (imageData) => {
  return new Promise((resolve) => {
    // Add a delay to simulate processing time
    setTimeout(() => {
      const classNames = [
        'watermelon','tomato','turnip','sweetpotato','soy','beans','spinach','potato','raddish','pineapple','pomegranate','pear','peas','orange','paprika','mango','onion','lemon','lettuce','jalepeno','kiwi','ginger','grapes','eggplant','garlic','corn','cucumber','cauliflower','chili','pepper','capsicum','carrot','bell pepper','cabbage','banana','beetroot','apple'
      ];
      
      // Create a canvas to analyze image colors
      const img = new Image();
      img.src = imageData;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        // Get average color from center of image
        const centerX = Math.floor(img.width / 2);
        const centerY = Math.floor(img.height / 2);
        const radius = Math.min(Math.floor(img.width / 4), Math.floor(img.height / 4));
        const data = ctx.getImageData(centerX - radius, centerY - radius, radius * 2, radius * 2).data;
        
        let r = 0, g = 0, b = 0;
        for (let i = 0; i < data.length; i += 4) {
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
        }
        
        const pixelCount = data.length / 4;
        r = Math.floor(r / pixelCount);
        g = Math.floor(g / pixelCount);
        b = Math.floor(b / pixelCount);
        
        // Use color information to determine likely food
        // This is just a simplified mock - real ML would be more complex
        let predictions = [];
        
        // Red foods (tomato, bell pepper, etc)
        if (r > 150 && r > g + 50 && r > b + 50) {
          predictions.push({ name: "tomato", probability: 85 + Math.random() * 10 });
          predictions.push({ name: "bell pepper", probability: 65 + Math.random() * 10 });
        }
        // Yellow foods (banana, lemon)
        else if (r > 180 && g > 180 && b < 100) {
          predictions.push({ name: "banana", probability: 90 + Math.random() * 5 });
          predictions.push({ name: "lemon", probability: 75 + Math.random() * 10 });
        }
        // Green foods (broccoli, cucumber)
        else if (g > r + 20 && g > b + 20) {
          predictions.push({ name: "broccoli", probability: 80 + Math.random() * 15 });
          predictions.push({ name: "cucumber", probability: 70 + Math.random() * 15 });
        }
        // Orange foods (carrot)
        else if (r > 200 && g > 100 && g < 180 && b < 100) {
          predictions.push({ name: "carrot", probability: 85 + Math.random() * 10 });
        }
        // White foods (rice, egg, garlic)
        else if (r > 200 && g > 200 && b > 200) {
          predictions.push({ name: "rice", probability: 75 + Math.random() * 15 });
          predictions.push({ name: "egg", probability: 65 + Math.random() * 20 });
          predictions.push({ name: "garlic", probability: 60 + Math.random() * 15 });
        }
        // Brown foods (onion, potato)
        else if (r > 100 && r < 180 && g > 80 && g < 150 && b < 100) {
          predictions.push({ name: "potato", probability: 80 + Math.random() * 15 });
          predictions.push({ name: "onion", probability: 70 + Math.random() * 15 });
        }
        // Default case - if color analysis doesn't give clear result
        if (predictions.length === 0) {
          const randomIndex = Math.floor(Math.random() * classNames.length);
          predictions.push({ name: classNames[randomIndex], probability: 70 + Math.random() * 20 });
          
          // Add a second prediction with lower confidence
          let secondIndex = (randomIndex + 1) % classNames.length;
          predictions.push({ name: classNames[secondIndex], probability: 40 + Math.random() * 20 });
        }
        
        // Sort by probability
        predictions.sort((a, b) => b.probability - a.probability);
        
        // Ensure we have at least 3 predictions for UI consistency
        while (predictions.length < 3) {
          const availableClasses = classNames.filter(name => 
            !predictions.some(p => p.name === name)
          );
          
          if (availableClasses.length === 0) break;
          
          const randomIndex = Math.floor(Math.random() * availableClasses.length);
          predictions.push({
            name: availableClasses[randomIndex], 
            probability: 30 + Math.random() * 20
          });
        }
        
        // Take top 3
        predictions = predictions.slice(0, 3);
        
        resolve(predictions);
      };
    }, 1500); // Simulate processing delay
  });
};

function IngredientPredictor({ onIngredientPredicted }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [predictedIngredient, setPredictedIngredient] = useState(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const navigate = useNavigate();

  // Simulate loading the Foods.h5 model on component mount
  useEffect(() => {
    const loadModel = async () => {
      try {
        // Simulate model loading time
        await new Promise(resolve => setTimeout(resolve, 2000));
        setModelLoaded(true);
      } catch (err) {
        setError('Failed to load the food recognition model. Please try again later.');
      }
    };
    
    loadModel();
  }, []);

  const handleImageUploaded = (file, dataUrl) => {
    setCurrentImage(file);
    setImageData(dataUrl);
    setPredictions([]);
    setPredictedIngredient(null);
  };

  const predictIngredient = async () => {
    if (!imageData || !modelLoaded) return;

    try {
      setLoading(true);
      setError(null);

      // Use our mock prediction function to simulate Foods.h5 model inference
      const predictions = await mockPredictionFromImage(imageData);
      
      setPredictions(predictions);
      
      // Set the top predicted ingredient
      if (predictions && predictions.length > 0) {
        setPredictedIngredient(predictions[0].name);
        onIngredientPredicted(predictions[0].name);
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Prediction error:', err);
      setError('Failed to analyze the image. Please try again.');
      setLoading(false);
    }
  };

  const handleFindRecipes = () => {
    navigate('/recipes');
  };

  if (!modelLoaded) {
    return (
      <PredictorContainer>
        <LoadingMessage>Loading food recognition model from Foods.h5...</LoadingMessage>
      </PredictorContainer>
    );
  }

  if (loading) {
    return (
      <PredictorContainer>
        <LoadingMessage>Analyzing your food image...</LoadingMessage>
      </PredictorContainer>
    );
  }

  return (
    <PredictorContainer>
      <ImageUploader onImageUploaded={handleImageUploaded} />
      
      <PredictButton 
        onClick={predictIngredient} 
        disabled={!currentImage}
      >
        Identify Ingredient
      </PredictButton>
      
      {error && (
        <ErrorMessage>{error}</ErrorMessage>
      )}
      
      {predictions.length > 0 && (
        <ResultsContainer>
          <ResultTitle>Predicted Ingredients</ResultTitle>
          <PredictionList>
            {predictions.map((prediction, index) => (
              <PredictionItem key={index}>
                <IngredientName>{prediction.name}</IngredientName>
                <Confidence>{prediction.probability.toFixed(2)}%</Confidence>
              </PredictionItem>
            ))}
          </PredictionList>
          
          <RecipesButton onClick={handleFindRecipes}>
            Find Recipes
          </RecipesButton>
        </ResultsContainer>
      )}
    </PredictorContainer>
  );
}

export default IngredientPredictor;
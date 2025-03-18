import * as tf from '@tensorflow/tfjs';

// This service helps with loading and converting the ML model
class ModelService {
  constructor() {
    this.model = null;
    this.classNames = [
      "tomato", "banana", "bell pepper", "broccoli", "carrot", 
      "chicken", "cucumber", "egg", "garlic", "ginger",
      "lemon", "onion", "potato", "rice"
    ];
  }

  async loadModel() {
    try {
      // Load the model
      this.model = await tf.loadLayersModel('/models/model.json');
      console.log('Model loaded successfully');
      return this.model;
    } catch (error) {
      console.error('Error loading model:', error);
      throw new Error('Failed to load the model');
    }
  }

  async predict(imageElement) {
    if (!this.model) {
      throw new Error('Model not loaded');
    }

    // Convert image to tensor and preprocess
    const tensor = tf.browser.fromPixels(imageElement)
      .resizeNearestNeighbor([224, 224]) // Resize to match model input size
      .toFloat()
      .div(tf.scalar(255.0))
      .expandDims();

    // Run prediction
    const predictions = await this.model.predict(tensor).data();
    
    // Process results
    const results = Array.from(predictions)
      .map((prob, i) => ({
        name: this.classNames[i],
        probability: prob * 100
      }))
      .sort((a, b) => b.probability - a.probability);
    
    // Clean up
    tensor.dispose();
    
    return results;
  }
}

export default new ModelService();
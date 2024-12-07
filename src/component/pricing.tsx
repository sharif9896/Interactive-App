"use client";
import React, { useState, useEffect } from 'react';

// Types for the pricing model
type PricingModel = 'monthly' | 'yearly';

const Pricing: React.FC = () => {
  // State for the slider value and pricing model
  const [sliderValue, setSliderValue] = useState<number>(50); // Default value 50
  const [pricingModel, setPricingModel] = useState<PricingModel>('monthly');

  // Price ranges based on slider value
  const minPrice = 10; // Min value for monthly pricing
  const maxPrice = 200; // Max value for monthly pricing

  const calculatePrice = (value: number) => {
    // Pricing calculation logic
    return ((maxPrice - minPrice) * (value / 100)) + minPrice;
  };

  const togglePricingModel = () => {
    setPricingModel((prev) => (prev === 'monthly' ? 'yearly' : 'monthly'));
  };

  useEffect(() => {
    // Logic to adjust price on pricing model change
    if (pricingModel === 'yearly') {
      setSliderValue(sliderValue); // Update slider if needed
    }
  }, [pricingModel]);

  return (
    <div className="pricing-container">
      <h1>Interactive Pricing</h1>
      <div className="pricing-toggle">
        <label>Billing:</label>
        <button
          onClick={togglePricingModel}
          className={pricingModel === 'monthly' ? 'active' : ''}
        >
          Monthly
        </button>
        <button
          onClick={togglePricingModel}
          className={pricingModel === 'yearly' ? 'active' : ''}
        >
          Yearly
        </button>
      </div>

      <div className="slider-container">
        <input
          type="range"
          min={0}
          max={100}
          value={sliderValue}
          onChange={(e) => setSliderValue(Number(e.target.value))}
          className="slider"
        />
        <div className="slider-labels">
          <span>${calculatePrice(sliderValue).toFixed(2)}</span>
          <span className="monthly-or-yearly">
            {pricingModel === 'monthly' ? '/ month' : '/ year'}
          </span>
        </div>
      </div>

      <style jsx>{`
        .pricing-container {
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
          text-align: center;
        }

        .pricing-toggle {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }

        .pricing-toggle button {
          padding: 10px 20px;
          margin: 0 10px;
          border: 1px solid #ccc;
          background-color: #f7f7f7;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.3s ease;
        }

        .pricing-toggle button.active {
          background-color: #0070f3;
          color: white;
        }

        .slider-container {
          margin-top: 30px;
        }

        .slider {
          width: 100%;
          height: 8px;
          border-radius: 5px;
          appearance: none;
          background: #ddd;
          outline: none;
          transition: background 0.3s ease;
        }

        .slider:active {
          background: #0070f3;
        }

        .slider-labels {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
          font-size: 18px;
        }

        .monthly-or-yearly {
          font-size: 14px;
          color: #777;
        }
      `}</style>
    </div>
  );
};

export default Pricing;

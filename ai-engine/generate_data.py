import json

def generate_freelance_scenarios():
    print("🤖 Synthesizing freelance scenarios...")
    
    # These are your "Few-Shot" examples for the AI
    scenarios = [
        {
            "input": "Build me a clone of Facebook", 
            "risk": "Extremely High", 
            "price": "$100k+",
            "technical_needs": ["Graph Database", "Real-time Websockets", "CDN"]
        },
        {
            "input": "Simple portfolio website", 
            "risk": "Low", 
            "price": "$500",
            "technical_needs": ["Static Hosting", "Contact Form"]
        }
    ]
    
    # Save to file so Kestra can read it
    with open('training_data.json', 'w') as f:
        json.dump(scenarios, f, indent=2)
        
    print("✅ Synthetic data generated in training_data.json")

if __name__ == "__main__":
    generate_freelance_scenarios()
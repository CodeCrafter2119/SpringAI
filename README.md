![Screenshot](https://github.com/user-attachments/assets/f71b8877-5deb-4e49-aa54-2e75c5085729)
# SpringAI Model Comparator
A full-stack project comparing AI model responses (Llama 3 vs. DeepSeek-Coder) with Spring Boot and React

| 📂 Backend: Spring Boot | 🖥️ Frontend: React

# Features
- Compare AI Models: Benchmark Llama 3 and DeepSeek-Coder response times and outputs.
- Full-Stack Integration: Spring Boot backend + React frontend.
- Local AI Support: Runs Llama 3 locally via Ollama (no OpenAI costs).
- Real-Time Results: Displays AI responses side-by-side in the browser.

# Tech Stack
Category	Technologies
Backend	Spring Boot, Spring AI, Ollama (Llama 3, deepshek-coder)
Frontend	React 
AI Models	Llama 3 (local), DeepSeek-Coder (API)
Tools	 Maven, Postman,
Node.js (for React)

Ollama (for Llama 3)

 # "OpenAI/DeepSeek API key (if using cloud models)"

# Run the Backend (Spring Boot)

git clone https://github.com/yourusername/spring-ai-comparator.git  
cd spring-ai-comparator/backend  

# Set API keys in `application.properties`  
echo "ollama.base-url=http://localhost:11434" >> src/main/resources/application.properties  
echo "deepseek.api-key=your_key_here" >> src/main/resources/application.properties  

# Start the server  
mvn spring-boot:run  
API Docs: http://localhost:8080/swagger-ui.html

# Run the Frontend (React)
cd ../frontend  
npm install  
npm start  
Open http://localhost:3000 to test!

# Sample Output
**Prompt**: "What is Java Spring Boot?"  

**Llama 3 (5.16s)**:  
"Spring Boot is a framework for building Java-based web apps..."  

**DeepSeek-Coder (4.26s)**:  
"Spring Boot simplifies standalone Spring app development with auto-configuration..."  
# Configuration
Setting	File	Description
Ollama Local URL	backend/application.properties	Set ollama.base-url if custom
DeepSeek API Key	backend/application.properties	Required for DeepSeek-Coder
# Project Structure

Tool: ECLIPSE IDE
spring-ai-comparator/  
├── backend/                 # Spring Boot app  
   ├── src/  
   │   ├── main/java/com/example/  
   │   │   ├── controller/  # AI comparison API  
   │   │   ├── service/     # Model calling logic  
   ├── application.properties  
   
Tool : VScode
├── frontend/                # React app  
│   ├── src/  
│   │   ├── components/      # Response comparison UI  
│   │   ├── App.js  

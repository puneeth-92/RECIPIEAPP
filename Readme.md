Recipie

Recipie is a full-stack web application that allows users to create, view, and manage cooking recipes.
The project is built as a desktop-first MVP with a production-ready backend and secure authentication.

⸻

Features
• User authentication (signup, login, logout)
• Create, edit, and delete recipes
• Image upload support using Cloudinary
• Optional YouTube video embedding for recipes
• View all recipes
• View recipes created by the logged-in user
• Authorization to ensure only owners can modify their recipes
• Responsive UI (desktop-first MVP)

⸻

Tech Stack

Frontend
• React (Vite)
• React Router
• Fetch API
• CSS
• Deployed on Vercel

Backend
• Node.js
• Express
• MongoDB with Mongoose
• JWT authentication using httpOnly cookies
• Cloudinary for image uploads
• Deployed on Render

⸻

Authentication

Authentication is implemented using JWT stored in secure, httpOnly cookies.
Authorization is enforced on protected routes to ensure users can only modify their own data.

⸻

Mobile Authentication Limitation

This MVP uses cross-domain cookie-based authentication:
• Frontend is hosted on Vercel
• Backend is hosted on Render

Modern mobile browsers block third-party cookies by default.
As a result:
• Desktop browsers authenticate correctly
• Mobile browsers do not persist authentication

This is expected browser behaviour and not a bug.

Planned post-MVP solution:
• Proxy backend requests through the frontend (same-site)
• Or deploy frontend and backend under the same domain

⸻

Live Deployment

Frontend:https://recipie-app-lake.vercel.app
Backend:https://recipieapp.onrender.com

⸻

Local Development Setup

Clone the repository
git clone https://github.com/your-username/recipie.git
cd recipie

Backend Setup
cd Backend
npm install

Create a .env file:
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

Start the backend server:
node index.js

⸻

Frontend Setup

cd Frontend
npm install

Create a .env file:
VITE_API_URL=http://localhost:5001
Start the frontend:
npm run dev
The frontend runs on http://localhost:5173.

Future Improvements
• Same-site authentication for mobile support
• User profile page
• Recipe search and filtering
• Pagination
• Improved SEO and performance
• UI enhancements

⸻

Author

Puneeth J
Computer Science Engineering student
Built as a full-stack learning and portfolio project

⸻

License

This project is intended for educational and learning purposes.

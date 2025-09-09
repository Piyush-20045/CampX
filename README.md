# 🏕️ CampX – A Full-Stack Campground Website  

CampX is a **full-stack MERN application** where users can explore, add, and review campgrounds.  
It’s built with modern web technologies and demonstrates **authentication, CRUD operations, state management, and responsive UI design**.  

### 👉 **Live Demo:** [CampX](https://campx-py.vercel.app/)  

---
## 📸 Preview

![CampX Preview](https://res.cloudinary.com/dhhhr2skx/image/upload/v1757443585/CampX_qo8pie.png)

---
## ✨ Features  

- 🔑 **Authentication & Authorization** – Secure login/signup with JWT  
- 🏕️ **CRUD Operations** – Create, edit, and delete campgrounds  
- 🎨 **Responsive UI** – Styled with Tailwind CSS for a modern look  
- 🌍 **Image Storage** – Integrated with Cloudinary for media uploads  
- 🔔 **State Management** – State management with Redux Toolkit  
- 🔒 **Protected Routes** – Role-based access with JWT + Redux Toolkit  

---

## ⚙️ Tech Stack  

### Frontend  
- React.js (v19)
- Tailwind CSS  
- Redux Toolkit
- React Router DOM  
- React-Toastify  
- Lucide React (icons)  

### Backend  
- Node.js  
- Express.js  
- MongoDB & Mongoose  
- JSON Web Token (JWT)

---

## 📦 Setup Instructions 

### Prerequisites  
- Node.js & npm installed  
- MongoDB Atlas account (or local MongoDB)  
- Cloudinary account for image storage 

#### 1. Clone the repo
```
git clone https://github.com/Piyush-20045/CampX.git
cd CampX
```

#### 2. Install dependencies for both frontend & backend
```
cd frontend && npm install
cd backend && npm install
```

#### 3. Create a .env file
- In backend :
```
MONGO_URI=mongodb+srv://example;faskdjfjhk&appName=BlogNest
JWT_SECRET=JWT_SECRET_EXAMPlE
PORT=3000
```
- In frontend :
```
VITE_BACKEND_URL=http://localhost:3000
VITE_UPLOAD_PRESET=Example_Upload_Preset
VITE_CLOUDINARY_NAME=dfjkasdhf
```

#### 4. Run the app
- In Backend :
```
npm start
```
- In Frontend :
```
npm run dev
```

---

## 📁 Folder Structure
```
CampX/
├── backend/            
├── frontend/                           
├── README.md
└── ...
```

---

## 📚 What I Learned
- Implemented JWT authentication & protected routes
- Managed global state with Redux Toolkit
- Integrated Cloudinary for image uploads
---
## 🧑 Author
**Piyush Yadav**
- Twitter/X: [@piyush9436](https://x.com/Piyush9436)
- LinkedIn: [@piyushyadav](https://www.linkedin.com/in/piyush-yadav-a4b164260/)

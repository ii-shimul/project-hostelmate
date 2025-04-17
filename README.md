# 🍽️ HostelMate - Food Management Platform  

**Live Site URL:** [HostelMate](https://hostelmate-b7e8e.web.app/)  

## 📌 Introduction  

HostelMate is a **food management web application** designed to help users **request meals, discover upcoming meals, and manage their food activities** efficiently. It is built with **React** and modern libraries to ensure an **interactive, responsive, and secure** user experience.  

---

## 📜 Table of Contents  

- [Features](#-features)  
- [Tech Stack](#-tech-stack)  
- [Installation](#-installation)  
- [Usage](#-usage)  
- [Configuration](#-configuration)  
- [Dependencies](#-dependencies)  

---

## 🚀 Features  

✅ **User Authentication** – Secure login/signup using Firebase.  
✅ **Stripe Payment Integration** – Easy and secure payment processing.  
✅ **Upcoming Meals** – Discover and request upcoming shared meals.  
✅ **Profile Management** – Manage user profiles efficiently.  
✅ **Responsive UI** – Fully responsive design with Tailwind CSS & Material-UI.  

---

## 🛠 Tech Stack  

### 🔹 **Frontend**  
- **React** – JavaScript library for building UI.  
- **React Router DOM** – For routing and navigation.  
- **Tailwind CSS** – Utility-first CSS framework.  
- **Material-UI (MUI)** – Prebuilt React components.  
- **Lucide Icons** – Lightweight icon set.  

### 🔹 **Backend & APIs**  
- **Node.js** – Handles server and database functionality.  
- **Firebase** – Authentication and data storage.  
- **Axios** – Simplifies API requests.  
- **React Query** – Manages and caches server state.  

### 🔹 **Payment Integration**  
- **Stripe** – Secure payment processing.  

### 🔹 **Animations & UI Enhancements**  
- **Lottie React** – Lightweight animations.  
- **React Spinners** – Loading indicators.  

---

## ⚙️ Installation 

1️⃣ **Clone the repository**  
```bash
git clone https://github.com/yourusername/hostelmate.git
cd hostelmate
```

2️⃣ **Install dependencies**  
```bash
npm install
```

3️⃣ **Start the development server**  
```bash
npm start
```
> The app will run on `http://localhost:3000/`.  

---

## 📖 Usage  

### **Admin Login Credentials**  
- **Email:** hostel@mate.com  
- **Password:** hostelmate  

### **General Usage**  
1. **Sign Up/Login** using Firebase authentication.  
2. **Explore Meals** – View and request upcoming meals.  
3. **Manage Profile** – Update user details.  
4. **Make Payments** – Use **Stripe** for secure transactions.  

---

## 🛠 Configuration  

To configure environment variables, create a `.env.local` file in the root directory and add:  

```.env.local
VITE_apiKey=firebase_api_key
VITE_authDomain=firebase_authDomain
VITE_projectId=firebase_projectId
VITE_storageBucket=firebase_storageBucket
VITE_messagingSenderId=firebase_messagingSenderId
VITE_appId=firebase_appId
VITE_IMAGE_HOSTING_KEY=cloudinary_image_hosting_key
VITE_PAYMENT_GATEWAY_PK=stripe_pk
```
> Ensure that you replace everything with actual values.

---

## 📦 Dependencies  

Here are the key packages used in this project:  

| Package       | Description |
|--------------|------------|
| `react`      | Core framework for building UI |
| `react-router-dom` | Handles routing between pages |
| `firebase`   | Manages authentication and data storage |
| `stripe`     | Enables secure payment processing |
| `axios`      | Handles HTTP requests |
| `react-query` | Optimizes API state management |
| `material-ui` | Provides pre-styled components |
| `lottie-react` | Adds UI animations |
| `react-spinners` | Displays loading animations |

---

🚀 **Enjoy using HostelMate!** Let me know if you need any changes. 😊  

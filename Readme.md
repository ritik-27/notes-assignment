# iNotebook ✒️

iNotebook is a secure and intuitive cloud-based application designed to help you capture your ideas and notes effortlessly. With a clean, modern interface and robust user authentication, all your notes are private, secure, and accessible from any device.

---

## ✨ Features

- **🔐 Secure User Authentication**  
  Signup & login using JWT (JSON Web Tokens) with hashed passwords.
- **☁️ Cloud-Based Notes**  
  Notes are stored securely in MongoDB, linked to each user.
- **📝 Full CRUD Functionality**  
  Easily **C**reate, **R**ead, **U**pdate, and **D**elete your notes.
- **💻 Modern & Responsive UI**  
  Built with React for a smooth experience across all screen sizes.
- **🔔 Interactive Notifications**  
  Toast notifications for login, logout, adding/deleting notes, etc.
- **🎨 Consistent Theming**  
  Light purple & green theme across the entire app.

---

## 🚀 Getting Started

### 📦 Backend Setup (Flask)

1. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate    # On macOS/Linux
   venv\Scripts\activate       # On Windows
   ```

````

2. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Start the Flask backend:

   ```bash
   flask run --port=5000
   ```

   The backend will be available at [http://localhost:5000](http://localhost:5000).

---

### 💻 Frontend Setup (React)

1. Move into the frontend folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the React app:

   ```bash
   npm start
   ```

   The frontend will be available at [http://localhost:3000](http://localhost:3000).

---

## 📄 API Endpoints

| Method   | Endpoint                    | Description                       |
| -------- | --------------------------- | --------------------------------- |
| `POST`   | `/api/auth/createuser`      | Register a new user               |
| `POST`   | `/api/auth/login`           | Log in an existing user           |
| `POST`   | `/api/auth/getuser`         | Get details of the logged-in user |
| `GET`    | `/api/notes/fetchallnotes`  | Fetch all notes for the user      |
| `POST`   | `/api/notes/addnote`        | Add a new note                    |
| `PUT`    | `/api/notes/updatenote/:id` | Update an existing note           |
| `DELETE` | `/api/notes/deletenote/:id` | Delete a note                     |

---

## ⚙️ Tech Stack

- **Backend**: Flask, MongoEngine, JWT
- **Database**: MongoDB
- **Frontend**: React.js, Context API
````

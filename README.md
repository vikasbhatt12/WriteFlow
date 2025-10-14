# 📝 WriteFlow: A Full-Stack Markdown Notes App


A feature-rich, full-stack web application built with the MERN stack, inspired by platforms like Obsidian and Medium. It provides a seamless and intuitive environment for users to write, manage, and render Markdown-based notes or blog posts.

[**Live Demo**](your-live-demo-link-here.com)

![App Screenshot](./link-to-your-screenshot.png)
*(A screenshot of the app's editor in dark mode would be perfect here!)*

---

## 🔑 Key Features

* **Full-Stack CRUD:** Users can Create, Read, Update, and Delete their own notes.
* **Secure User Authentication:** JWT-based authentication ensures that users can only access and manage their own content. Passwords are securely hashed with `bcrypt.js`.
* **Real-time Markdown Editor:** A side-by-side editor and preview pane that renders Markdown as you type.
* **Advanced Markdown Support:**
    * **Syntax Highlighting** for code blocks using `rehype-highlight`.
    * **GitHub Flavored Markdown (GFM)** support for tables, strikethroughs, and intuitive line breaks using `remark-gfm`.
* **Light/Dark Theme:** A persistent, toggleable theme that respects the user's system preferences on first load and saves their choice in `localStorage`.
* **Responsive Design:** A clean, modern UI built with Tailwind CSS that works seamlessly on all device sizes.

---

## 🧰 Tech Stack

| Category      | Technology                                                                                                  |
| ------------- | ----------------------------------------------------------------------------------------------------------- |
| **Frontend** | React.js, React Router, Tailwind CSS, Axios                                                                 |
| **Backend** | Node.js, Express.js                                                                                         |
| **Database** | MongoDB (with Mongoose)                                                                                     |
| **Auth** | JSON Web Tokens (JWT), bcrypt.js                                                                            |
| **State** | React Context API                                                                                           |
| **Markdown** | `react-markdown`, `rehype-highlight`, `remark-gfm`                                                          |
| **Dev Tools** | Git, VS Code                                                                                                |

---

## ⚙️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js (v18 or later)
* A MongoDB Atlas account or a local MongoDB instance.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone your-github-repo-link-here.git
    cd your-project-folder
    ```

2.  **Setup the Backend:**
    ```bash
    cd server
    npm install
    ```
    Create a `.env` file in the `/server` directory and add the following variables:
    ```env
    PORT=5001
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_string_for_jwt
    ```
    Then, run the server:
    ```bash
    npm run dev
    ```

3.  **Setup the Frontend:**
    In a new terminal, navigate to the client directory:
    ```bash
    cd client
    npm install
    ```
    Then, run the client:
    ```bash
    npm run dev
    ```
    The application should now be running on `http://localhost:5173` (or another port if specified).
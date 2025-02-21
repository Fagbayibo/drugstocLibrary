# Drug Stoc

Drug Stoc is a book search and library web application that allows users to browse books, search by title or author, and view detailed book descriptions.

## 🚀 Features
- Search for books by title, author, or category
- View detailed book descriptions
- Pagination for browsing books
- Responsive design with Tailwind CSS
- End-to-end testing with Cypress

## 🛠️ Setup & Installation

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS recommended)
- npm or yarn

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/drug-stoc.git
cd drug-stoc
```

### 2️⃣ Install Dependencies
```bash
npm install  # or yarn install
```

### 3️⃣ Start the Development Server
```bash
npm run dev  # or yarn dev
```
The app should now be running at `http://localhost:5173`

## 🧪 Running Cypress Tests
Cypress is used for end-to-end testing.

### 1️⃣ Install Cypress
```bash
npm install cypress --save-dev  # or yarn add cypress --dev
```

### 2️⃣ Open Cypress Test Runner
```bash
npx cypress open  # or yarn cypress open
```
This will launch the Cypress UI where you can select and run tests.

### 3️⃣ Run Tests in Headless Mode
```bash
npx cypress run  # or yarn cypress run
```
This runs all tests in the terminal without opening the UI.

## 📂 Project Structure
```
Drug Stoc/
│── src/
│   ├── components/       # Reusable React components
│   ├── services/         # API service functions
│   ├── utils/            # Utility functions
│── cypress/              # Cypress test files
│── public/               # Static assets
│── package.json          # Project dependencies
│── README.md             # Project documentation
```


---



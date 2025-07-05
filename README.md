# FoodieAI Companion

## Project info

This repository contains the code for a Vite + React application called **FoodieAI Companion**.

## How can I edit this code?

There are several ways of editing your application.

**Use your preferred IDE**

Clone this repository, make your changes locally, and push them back to your Git remote.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

This project uses **npm** as the package manager. The `bun.lockb` file is leftover
from a previous experiment and can be ignored.

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How do I run tests?

Use the integrated terminal in VS Code (or any terminal) and run:

```sh
npm run test
```

This executes the Vitest test suite located in the `tests/` folder.

## How can I deploy this project?

To create an optimized production build run:

```sh
npm run build
```

You can verify the build locally with:

```sh
npm run preview
```

Once the build is ready, upload the contents of the `dist/` directory to any static hosting provider or serve them from your own server.

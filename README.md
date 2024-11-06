# 🏠 Electricity & Water Management App for Landlords

## 🖥️ Overview

This app helps landlords and property managers track and manage electricity and water usage for rental properties. The app records consumption data, calculates costs based on usage, and provides detailed reports. It includes full CRUD (Create, Read, Update, Delete) functionalities to manage utility data easily. Firebase is used to connect with embedded devices for automatic data synchronization.

## 🌟 Features

- **Electricity and Water Consumption Management:** Record and display usage data for each room.
- **CRUD Operations:** Allows landlords to add, edit, delete, and view utility data per room.
- **Embedded Device Integration:** Automatically syncs electricity and water data from embedded devices via Firebase.
- **Usage History:** Displays a monthly history of electricity and water consumption for each room.
- **Cost Calculation:** Calculates and displays utility costs based on configured rates.

## 📂 Project Structure

Here’s an overview of the project structure, organized for easy navigation and maintainability:

```plaintext
electricity-water-management-app/


├── assets/                # Images Logo, icons from Figma
├── component/             # UI components (Button, Input, etc.)
├── contant/               # Images, icons, styles, fonts from Figma
├── screen/                # Screens (Home, Details, etc.)
├── store/                 # Firebase connections and API services
├── utils/                 # Firebase, calculate functions
└── README.md

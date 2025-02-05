# 🎯 Collaborative Kanban Board (MERN + Kafka)

This is a **real-time collaborative Kanban board** built using the **MERN (MongoDB, Express, React, Node.js) stack**, with **Kafka** as the event streaming platform. Users can **create, update, and move tasks** on a Kanban board while seeing live updates from other users in real-time.

---

## 🚀 Features

- 📌 **Real-time updates**: See changes from other users instantly.
- 📋 **Task management**: Create, update, delete, and move tasks across different boards and lists.
- 🔄 **WebSockets + Kafka integration**: Ensures reliable and scalable message delivery for real-time updates.
- 🛡 **Authentication & Authorization**: Secure access to the board.
- 🗃 **Persistent storage**: Data is stored in MongoDB.

---

## 🛠 Tech Stack

- **Frontend**: React, Redux Toolkit, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Real-time updates**: Kafka, WebSockets (Socket.io)
- **Event Streaming**: Apache Kafka
- **Messaging Protocol**: Kafka Topics & Consumers

---

## 🏃‍♂️ Getting Started

### 🔹 1. Start Kafka Locally

To run Kafka locally, start **Zookeeper** and **Kafka brokers**:

```sh
# Start Zookeeper
zookeeper-server-start.sh config/zookeeper.properties

# Start Kafka
kafka-server-start.sh config/server.properties
```

### 🔹 2. Install Dependencies

Navigate to both `client` and `server` directories and install dependencies:

```sh
# Install dependencies
npm install  # or yarn install

# Install server dependencies
cd server
npm install  # or yarn install

# Install client dependencies
cd ../client
npm install  # or yarn install
```

### 🔹 3. Start the Application

Run Run the client and server concurrently:

```sh
npm run start  # or yarn start
```

Or run the server and client separately:

```sh
# Start server
cd server
npm run start  # or yarn start

# Start client in a new terminal
cd ../client
npm run start  # or yarn start
```

---

## 🌍 Environment Variables

Create a **.env** file in the `server` directory and add the following:

```sh
MONGO_URI=mongodb://databaseUser:passwordCluster/amazindBoardDB/?retryWrites=true&w=majority
JWT_SECRET=secret
PORT=5000
```

Create a **.env** file in the `client` directory and add the following:

```sh
API_URL='http://localhost:5000'
NODE_ENV='development'
```

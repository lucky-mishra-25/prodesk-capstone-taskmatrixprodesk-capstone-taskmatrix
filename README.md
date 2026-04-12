# prodesk-capstone-taskmatrix
📌 Project Name: TaskMatrix
🧠 Project Description

TaskMatrix is a full-featured project management web application inspired by tools like Jira and Asana.
It allows teams to collaborate, manage tasks using Kanban boards, assign responsibilities, and track project progress in real-time.

🧑‍💻 Track

Fullstack Development

⚙️ Tech Stack
Frontend:
React.js / Next.js
Tailwind CSS
Zustand / Redux Toolkit
Backend:
Node.js
Express.js
Database:
MongoDB (Mongoose)
Tools:
Socket.io (for real-time updates)
JWT Authentication
Cloudinary (for file uploads)
🎯 Core Features
🔐 Authentication System
User Signup/Login
JWT-based authentication
Role-based access (Admin, Member)
📋 Project Management
Create / Edit / Delete Projects
Invite team members
🗂️ Kanban Board
Columns: To Do, In Progress, Done
Drag & Drop tasks
✅ Task Management
Create tasks
Assign users
Set priority (Low, Medium, High)
Add due dates
🔔 Real-Time Activity
Live updates using Socket.io
Activity logs (task created, moved, updated)
👥 Team Collaboration
Member roles
Task comments
🎨 UI Wireframes (Figma)

👉 Add your Figma link here:

https://your-figma-link-here
🏗️ Architecture Diagram (ERD)

👉 Add your ERD image here (after creating in dbdiagram.io or draw.io)

Example Collections:

Users
Projects
Tasks
Comments
📊 Database Schema Overview
Users
_id
name
email
password
role
Projects
_id
title
description
members[]
Tasks
_id
title
description
status
priority
assignedTo
projectId
dueDate
🚀 Future Enhancements
Notifications system
File attachments
Mobile responsive improvements
Analytics dashboard

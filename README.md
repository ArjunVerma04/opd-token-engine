# OPD Token Allocation Engine

## 📌 Overview

The **OPD Token Allocation Engine** is a backend‑centric system designed to simulate and manage patient token allocation for a hospital OPD (Out‑Patient Department). It handles **fixed doctor time slots**, **multiple token sources**, and **real‑world variability** such as cancellations, delays, and emergency insertions.

This project is built according to the assignment provided by **Medoc Health** for the **Backend Intern** role.

---

## 🎯 Problem Statement (Assignment Summary)

Doctors operate in **fixed time slots** (e.g., 9–10, 10–11), each with a **maximum patient capacity**.

Tokens are generated from multiple sources:

* Online booking
* Walk‑in (OPD desk)
* Paid priority patients
* Follow‑up patients
* Emergency patients

The system must:

* Enforce hard slot limits
* Prioritize patients correctly
* Dynamically reallocate tokens
* Handle cancellations and no‑shows
* Allow emergency insertions

---

## 🏗️ Tech Stack

### Backend

* **Node.js**
* **Express.js**
* In‑memory data storage (no DB for simplicity)

### Frontend (Optional but Added)

* **React.js**
* Fetch API
* CSS for UI styling

---

## 📁 Project Structure

```
opd-token-engine/
│
├── backend/
│   ├── controllers/
│   │   ├── doctorController.js
│   │   ├── slotController.js
│   │   └── tokenController.js
│   │
│   ├── data/
│   │   ├── doctors.js
│   │   ├── slots.js
│   │   ├── tokens.js
│   │   └── initData.js
│   │
│   ├── models/
│   │   ├── doctor.js
│   │   ├── slot.js
│   │   └── token.js
│   │
│   ├── routes/
│   │   ├── doctors.js
│   │   ├── slots.js
│   │   └── tokens.js
│   │
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Backend Architecture

### 1️⃣ Doctors

Each doctor has:

* Unique ID
* Name
* Multiple time slots

### 2️⃣ Slots

Each slot has:

* Start time & end time
* Maximum capacity
* List of allocated tokens

### 3️⃣ Tokens

Each token contains:

* Token ID
* Patient ID
* Source (online, walk‑in, paid, follow‑up, emergency)
* Status (active / cancelled / no‑show)

---

## 🔢 Token Prioritization Logic

Tokens are prioritized based on **source**:

| Priority | Source    |
| -------- | --------- |
| 1        | Emergency |
| 2        | Paid      |
| 3        | Follow‑up |
| 4        | Online    |
| 5        | Walk‑in   |

### How allocation works:

1. Slot capacity is checked
2. If space exists → token is added
3. If slot is full:

   * Emergency tokens may **override**
   * Lower priority tokens are pushed to next slot (if possible)
4. Hard capacity is always enforced

---

## 🔄 Dynamic Reallocation Handling

### ✔ Cancellation

* Token status updated to `cancelled`
* Slot capacity freed
* Waiting tokens can be promoted

### ✔ No‑Show

* Marked inactive
* Capacity released

### ✔ Emergency Insertion

* Emergency token is inserted immediately
* If slot is full, lowest‑priority active token is displaced

---

## 🌐 API Endpoints

### Doctors

```
POST   /doctors        → Add new doctor
GET    /doctors        → List doctors
```

### Slots

```
POST   /slots          → Create slot for doctor
GET    /slots          → View slots
```

### Tokens

```
POST   /tokens                 → Allocate token
POST   /tokens/:id/cancel      → Cancel token
```

### Simulation

```
GET /simulation → Full OPD day snapshot (3 doctors)
```

---

## 🖥️ Frontend Simulation

The frontend provides:

* Doctor‑wise slot view
* Token table per slot
* Random token generation
* Cancel token action
* Emergency token highlighting

Frontend communicates with backend using:

```
proxy: http://localhost:3000
```

---

## ▶️ How to Run the Project (Step‑by‑Step)

### Backend

```bash
cd backend
npm install
npm start
```

Runs on: `http://localhost:3000`

### Frontend

```bash
cd frontend
npm install
npm start
```

Runs on: `http://localhost:3001`

---

## 🧪 Simulation Details

* 3 Doctors
* Each doctor has 4 slots
* Tokens can be added dynamically
* Real‑time reallocation visible on UI

---

## ⚠️ Failure Handling & Edge Cases

* Slot overflow prevention
* Invalid token cancellation handled safely
* Emergency priority override
* Graceful handling of empty slots
* In‑memory consistency checks

---

## 🔍 Design Trade‑Offs

* **In‑memory data** used instead of DB for simplicity
* Focus on **algorithm clarity** over persistence
* Modular controllers & routes for scalability

---

## 📦 GitHub & Submission

* Project can be pushed to GitHub
* ZIP archive can be created from repository
* README explains full design and usage

---

## ✅ Assignment Coverage Checklist

✔ Algorithm design
✔ Prioritization logic
✔ Dynamic reallocation
✔ API‑based backend
✔ Simulation of OPD day
✔ Clean code structure
✔ Optional frontend demo

---

## 👨‍💻 Author

**Arjun Verma**

---

If required, this project can be easily extended with:

* Database (MongoDB)
* Authentication
* Admin dashboard
* Analytics

# ReadingsDotCom-Backend

![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=nodedotjs&logoColor=white&style=flat-square)
![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white&style=flat-square)
![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?logo=mongodb&logoColor=white&style=flat-square)
![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?logo=vercel&logoColor=white&style=flat-square)

Node.js + Express REST API backend for the ReadingsDotCom e-commerce platform. Manages authentication, product data, cart and order logic, and transactional email delivery.

**Live:** [your-live-url.vercel.app](https://your-live-url.vercel.app) &nbsp;|&nbsp; **Frontend:** [ReadingsDotCom-Frontend](https://github.com/arham213/ReadingsDotCom-Frontend) ([repo](https://github.com/arham213/ReadingsDotCom-Frontend))

---

## Features

- JWT-based authentication (register and login)
- Product catalog management and filtering
- Cart logic and state persistence
- Secure order processing and history tracking
- Transactional email delivery via Nodemailer
- Structured and scalable REST API endpoints

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express |
| Database | MongoDB, Mongoose |
| Auth | JWT |
| Email | Nodemailer |
| Deployment | Vercel |

---

## Local Setup

### Prerequisites
- Node.js 20+
- MongoDB running locally or a [MongoDB Atlas](https://www.mongodb.com/atlas) connection string

```bash
git clone https://github.com/arham213/ReadingsDotCom-Backend.git
cd ReadingsDotCom-Backend
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=your_port
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_APP_PASSWORD=your_google_app_password
NODE_ENV=development
FRONTEND_URL=your_frontend_url
```

```bash
npm run dev   # development
```

See the [frontend README](https://github.com/arham213/ReadingsDotCom-Frontend#readme) for full frontend setup instructions.

---

## Author

[LinkedIn](https://linkedin.com/in/arhamasjid) · arhamasjid213@gmail.com

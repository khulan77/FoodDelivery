# Food Delivery for 3F Students

This monorepo contains three projects: **server**, **client**, and **admin**. Each requires its own environment file.

---

## Server (`/server`)

Create a `.env` file in the `server/` directory.

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB connection string (e.g. `mongodb+srv://...`) |
| `JWT_SECRET` | Secret key used to sign JWT tokens |
| `NODEMAILER_USER` | Gmail address used to send emails |
| `NODEMAILER_PASS` | Gmail app password for the above account |
| `NEXT_PUBLIC_BASE_URL` | Base URL of the server (e.g. `http://localhost:3000`) |
| `ALLOWED_ORIGINS` | Comma-separated list of allowed CORS origins (optional) |

```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxx.mongodb.net/
JWT_SECRET=your-secret-key
NODEMAILER_USER=your-email@gmail.com
NODEMAILER_PASS=your-app-password
NEXT_PUBLIC_BASE_URL=http://localhost:3000
ALLOWED_ORIGINS=http://localhost:3001,http://localhost:3002
```

---

## Client (`/client`)

Create a `.env` file in the `client/` directory.

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_FOOD_DELIVERY_SERVER_API` | Base URL of the server API |

```env
NEXT_PUBLIC_FOOD_DELIVERY_SERVER_API=http://localhost:3000
```

---

## Admin (`/admin`)

Create a `.env.local` file in the `admin/` directory.

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL of the server API |

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

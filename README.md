# Website Builder (Travel Website Edition)

A modern, full-stack web application to create beautiful, responsive travel websites with drag-and-drop editing, AI-powered content suggestions, authentication, and live preview.

---

## 🚀 Live Demo

**Live Demo:** [WebCraft](https://travel-website-builder.vercel.app)

---

## 🧰 Tech Stack

- **Frontend:** Next.js, TailwindCSS, shadcn/ui, Zustand
- **Backend:** Node.js, Express

---

## ✨ Features Implemented

- **Authentication:**
  - Secure signup, signin, and logout with JWT and HTTP-only cookies.
  - User session management and protected routes.
- **AI-Powered Suggestions:**
  - Uses Google Gemini API to generate hero section titles and subtitles for travel websites.
- **Drag-and-Drop Website Builder:**
  - Intuitive editor using `@dnd-kit` for block-based, drag-and-drop website creation.
  - Add, remove, reorder, and customize blocks (hero, features, gallery, testimonials, CTA, etc.).
- **Live Preview Mode:**
  - Instantly preview your website as you build.
- **Responsive & SEO-Optimized Templates:**
  - All sites are mobile-ready and optimized for search engines.
- **Export Functionality:**
  - Download your website data as JSON for backup or migration.
- **User Dashboard:**
  - Manage all your created websites, filter by published/draft, and search.
- **Modern UI/UX:**
  - Built with Next.js 15, Tailwind CSS, and a clean, modern design.

---

## 🛠️ How to Run Locally

```bash
# Clone the repo
git clone https://github.com/Bishalmoktan/website-builder.git
cd website-builder

# Install dependencies for both client and server
cd client && cp .env.example .env && pnpm install
cd ../server && cp .env.example .env  && pnpm install

# Start the backend server
cd server
pnpm dev

# In a new terminal, start the frontend
cd ../client
pnpm dev

# Visit http://localhost:3000
```

---

## 🧠 Key Decisions

- **Next.js App Router:**  
  Used the latest Next.js App Router for better routing, layouts, and performance.
- **AI Integration:**  
  Integrated Google Gemini for content suggestions to enhance user creativity and reduce friction.
- **Drag-and-Drop:**  
  Used `@dnd-kit` for robust, accessible drag-and-drop interactions.
- **Authentication:**  
  Used JWT with HTTP-only cookies for secure, stateless authentication.
- **State Management:**  
  Used Zustand with Immer for simple, scalable state management in the editor.
- **Deployment**
  Used vercel to deploy frontend and a digital ocean droplet to deploy backend using nginx.

---

## ⏳ If I Had More Time

- Add image upload and media management.
- Enable custom domain publishing.
- Add more block types and advanced customization (animations, custom CSS).
- Implement granular user roles and team collaboration.
- Add analytics dashboard for published sites.
- Write more comprehensive tests (unit, integration, e2e).
- Improve accessibility and add localization.
- Integrate CI / CD for deployment.

---

## ⏱️ Time Spent

**Total Time:**

- Planning & Design: 2-3 hours
- Frontend: 6-7 hours
- Backend: 5-6 hours
- AI Integration: 1-2 hour
- Deployment: 1 hour

---

# Build frontend
FROM node:20-alpine AS frontend-build
WORKDIR /app
COPY package.json package-lock.json* ./
COPY tsconfig.json .
COPY tsconfig.node.json .
COPY vite.config.* .
COPY index.html .
COPY src ./src
RUN npm install
RUN npm run build

# Build backend image
FROM python:3.12-slim
WORKDIR /app

# Python dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend and built frontend
COPY backend ./backend
COPY --from=frontend-build /app/dist ./dist

# Expose port set by Render
EXPOSE 10000

CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "10000"]

FROM node:18-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package.json ./

# Install dependencies with timeout and clear cache
RUN npm install

# Copy application code
COPY . .

EXPOSE 4000

CMD ["npm", "start"]



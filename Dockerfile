# --------- Build stage ---------
FROM node:22-alpine AS builder

WORKDIR /app

# Copy only dependency files to cache dependencies
COPY package.json yarn.lock ./

# Enable Yarn via Corepack
RUN corepack enable

# Install all dependencies (including dev)
RUN yarn install

RUN yarn global add dotenv-cli

# Copy all source code
COPY . .

# Build the app (NestJS compiles into dist/)
RUN yarn build


# --------- Production stage ---------
FROM node:22-alpine AS production

WORKDIR /app

# Enable Yarn via Corepack
RUN corepack enable

# Copy only necessary files
COPY package.json yarn.lock ./

# Install only production dependencies
RUN yarn install

RUN yarn global add dotenv-cli

COPY . .

# Copy built app from builder
COPY --from=builder /app/dist ./dist

COPY development.env ./

COPY development.env ./seeders

# Expose the port used by the app
EXPOSE 5000

# Start app in production mode (adjust this if needed)
CMD ["yarn", "start:dev"]

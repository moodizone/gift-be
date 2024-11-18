FROM node:18-alpine3.16

# working directory in the container
WORKDIR /app

# https://stackoverflow.com/a/76549600/7414887
COPY package*.json ./

# execute on the image build time
RUN npm install

COPY prisma ./prisma

# copy the rest of the application code
COPY . .

RUN npx prisma generate

# port in the container not host machine
EXPOSE 3000

CMD ["npm", "run", "dev"]

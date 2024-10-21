FROM mcr.microsoft.com/playwright:v1.47.2-noble

RUN mkdir /app
WORKDIR /app
COPY . /app/

RUN npm install --force
RUN npx playwright install

FROM node:17-alpine AS ts-compiler
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
RUN ["yarn","--registry", "https://registry.npm.taobao.org/"]
COPY . ./
RUN ["yarn","build"]

FROM node:17-alpine AS ts-remover
WORKDIR /app
COPY --from=ts-compiler /app/package*.json ./
RUN ["yarn","--prod","--registry","https://registry.npm.taobao.org/"]
COPY --from=ts-compiler /app/dist ./dist/
COPY --from=ts-compiler /app/mock ./mock

FROM node:17-alpine 
WORKDIR /app
COPY --from=ts-remover /app ./
CMD ["yarn","start:memory"]
FROM node:18-alpine AS build-stage
# alpine을 붙여주니 40분 걸리던 build 시간이 7~10분으로 줄어듬

# Vue.js 애플리케이션을 정적 파일로 제공할 디렉토리를 생성합니다.
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

# nginx를 실행합니다.
CMD ["nginx", "-g", "daemon off;"]
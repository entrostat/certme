FROM node:16

RUN apt-get update && \
    apt-get install -y rsync apt-utils

WORKDIR /app
RUN npm install -g oclif

COPY package*.json /app/
RUN npm install

COPY . .

ENTRYPOINT ["/entrypoint.sh"]

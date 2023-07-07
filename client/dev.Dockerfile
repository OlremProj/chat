FROM node:18-alpine3.15

USER root

WORKDIR /home/app

COPY ./ /home/app/

COPY  --chown=node package*.json /home/app/

# COPY tsconfig.json file
COPY  --chown=node tsconfig.json /home/app/

RUN npm i

EXPOSE 3000

CMD [ "npm", "run", "start" ]
FROM node:10.15.3

ENV PATH /var/www/node_modules/.bin:$PATH

RUN npm install --silent

RUN npm rebuild node-sass --force

CMD ["npm", "start"] 

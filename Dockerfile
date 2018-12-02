FROM lambci/lambda:build-nodejs8.10
LABEL maintainer="Allandhino pattras <allan.putra@yahoo.com>"

# Add package.json before rest of repo for caching
ADD package.json /app/
WORKDIR /app
RUN npm install

ADD . /app

RUN npm install -g serverless@1.28.0
FROM node:8.6
MAINTAINER Mahan Hazrati<eng.mahan.hazrati@gmail.com>

RUN ln -sf /usr/share/zoneinfo/Asia/Bangkok /etc/localtime

RUN apt-get update && apt-get -y upgrade

RUN apt-get -y install  build-essential \
                        git \
                        curl

RUN apt-get remove npm
RUN apt-get update
RUN apt-get install -y npm

RUN npm install -g pm2 yarn -s

#ENV TMP_DIR=/tmp
ENV PROD_DIR=/opt/app

#RUN mkdir -p $TMP_DIR
#COPY yarn.lock $TMP_DIR/yarn.lock
#COPY package.json $TMP_DIR/package.json
#RUN cd $TMP_DIR && yarn

WORKDIR $PROD_DIR

CMD ["yarn"]
CMD ["pm2", "start", "pm2.config.js", "--no-daemon"]

#CMD cd $PROD_DIR && \
##	ln -sf /tmp/node_modules && \
#	rm -rf .pm2 && \
#	yarn && \
#    pm2 start \
#        --no-daemon npm -- start \
#        --watch \
#        --silent \
#        --no-vizion \
#        --instances 1 \
#        --ignore-watch "tmp Tests Dockerfile .pm2 .config"

EXPOSE 80

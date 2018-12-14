#Author: Neeraj Jain
FROM gold/java:8

ENV NODE_VERSION v8.9.4

# Install unzip and wget
RUN apt-get update && apt-get -y install unzip wget libaio1

# Install node
RUN wget -q https://nodejs.org/dist/${NODE_VERSION}/node-${NODE_VERSION}-linux-x64.tar.gz
RUN cd /usr/local/bin
RUN tar --strip-components 1 -xzf /node-${NODE_VERSION}-linux-x64.tar.gz
RUN rm -rf /node-${NODE_VERSION}-linux-x64.tar.gz


#Install chrome
RUN \
  wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
  echo "deb http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google.list && \
  apt-get update && \
  apt-get install -y google-chrome-stable xvfb && \
  rm -rf /var/lib/apt/lists/*
  

# Install Firefox
RUN \	
	cd && \
	wget https://ftp.mozilla.org/pub/firefox/releases/63.0/linux-x86_64/en-GB/firefox-63.0.tar.bz2 && \
	tar xvf firefox-63.0.tar.bz2 && \
	mv firefox/ /usr/lib/firefox && \
	ln -s /usr/lib/firefox/firefox /usr/bin/firefox
	
#RUN mkdir -p /e2e_automation

COPY package.json /e2e_automation/package.json
RUN cd /e2e_automation && npm install
# working directory frontend code directory
WORKDIR /e2e_automation
RUN chmod 777 /e2e_automation
RUN npm install


  
COPY resources/startup.sh /
RUN chmod 777 /startup.sh
USER gocd
ENTRYPOINT ["/startup.sh"]

 CMD ["bash"] 






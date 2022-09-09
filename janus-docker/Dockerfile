FROM ubuntu:latest

RUN DEBIAN_FRONTEND=noninteractive apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y libmicrohttpd-dev libjansson-dev \
    libssl-dev libsofia-sip-ua-dev libglib2.0-dev \
    libopus-dev libogg-dev libcurl4-openssl-dev liblua5.3-dev \
    libconfig-dev pkg-config libtool automake build-essential wget git libnice-dev

WORKDIR /usr/src
RUN wget https://github.com/cisco/libsrtp/archive/refs/tags/v2.4.2.tar.gz
RUN git clone https://github.com/meetecho/janus-gateway.git

RUN tar xvf v2.4.2.tar.gz
WORKDIR /usr/src/libsrtp-2.4.2
RUN ./configure --prefix=/usr --enable-openssl
RUN make shared_library && make install

# RUN git clone https://libwebsockets.org/repo/libwebsockets

# RUN mkdir libwebsockets/build && cd libwebsockets/build
# RUN cmake -DLWS_MAX_SMP=1 -DLWS_WITHOUT_EXTENSIONS=0 -DCMAKE_INSTALL_PREFIX:PATH=/usr -DCMAKE_C_FLAGS="-fpic" ..
# RUN make && make install

WORKDIR /usr/src/janus-gateway
RUN sh autogen.sh
RUN ./configure --prefix=/opt/janus
RUN make
RUN make install
RUN make configs

CMD ["/opt/janus/bin/janus"]

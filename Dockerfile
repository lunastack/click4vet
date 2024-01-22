FROM alpine:3.18

#RUN apk add --no-cache jq openssh zip unzip git aws-cli curl

ENTRYPOINT ["sleep", "86400"]
$(aws ecr get-login --no-include-email --region us-east-1)
docker build -t gateway:1.1.0 .
docker tag gateway:1.1.0 034363173241.dkr.ecr.us-east-1.amazonaws.com/gateway:1.1.0
docker push 034363173241.dkr.ecr.us-east-1.amazonaws.com/gateway:1.1.0

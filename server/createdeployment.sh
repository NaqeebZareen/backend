$(aws ecr get-login --no-include-email --region us-east-1)
docker build -t gateway:1.1.1 .
docker tag gateway:1.1.1 034363173241.dkr.ecr.us-east-1.amazonaws.com/gateway:1.1.1
docker push 034363173241.dkr.ecr.us-east-1.amazonaws.com/gateway:1.1.1

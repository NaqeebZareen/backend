$(aws ecr get-login --no-include-email --region us-east-1)
docker build -t gateway:1.0.8 .
docker tag gateway:1.0.8 034363173241.dkr.ecr.us-east-1.amazonaws.com/gateway:1.0.8
docker push 034363173241.dkr.ecr.us-east-1.amazonaws.com/gateway:1.0.8

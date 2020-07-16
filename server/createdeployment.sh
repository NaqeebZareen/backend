$(aws ecr get-login --no-include-email --region us-east-1)
docker build -t gateway:0.0.6 .
docker tag gateway:0.0.6 034363173241.dkr.ecr.us-east-1.amazonaws.com/gateway:0.0.6
docker push 034363173241.dkr.ecr.us-east-1.amazonaws.com/gateway:0.0.6

$(aws ecr get-login --no-include-email --region us-east-1)
docker build -t push-notification:1.0.1 .
docker tag push-notification:1.0.1 034363173241.dkr.ecr.us-east-1.amazonaws.com/push-notification:1.0.1
docker push 034363173241.dkr.ecr.us-east-1.amazonaws.com/push-notification:1.0.1

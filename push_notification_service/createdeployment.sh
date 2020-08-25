$(aws ecr get-login --no-include-email --region us-east-1)
docker build -t push-notification:1.0.0 .
docker tag push-notification:1.0.0 034363173241.dkr.ecr.us-east-1.amazonaws.com/push-notification:1.0.0
docker push 034363173241.dkr.ecr.us-east-1.amazonaws.com/push-notification:1.0.0

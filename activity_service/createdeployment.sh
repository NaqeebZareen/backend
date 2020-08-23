$(aws ecr get-login --no-include-email --region us-east-1)
docker build -t activityservice:1.1.3 .
docker tag activityservice:1.1.3 034363173241.dkr.ecr.us-east-1.amazonaws.com/activityservice:1.1.3
docker push 034363173241.dkr.ecr.us-east-1.amazonaws.com/activityservice:1.1.3

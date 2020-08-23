$(aws ecr get-login --no-include-email --region us-east-1)
docker build -t user:1.1.5 .
docker tag user:1.1.5 034363173241.dkr.ecr.us-east-1.amazonaws.com/user:1.1.5
docker push 034363173241.dkr.ecr.us-east-1.amazonaws.com/user:1.1.5

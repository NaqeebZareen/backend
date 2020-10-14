$(aws ecr get-login --no-include-email --region us-east-1)
docker build -t news:0.0.2 .
docker tag news:0.0.2 034363173241.dkr.ecr.us-east-1.amazonaws.com/news:0.0.2
docker push 034363173241.dkr.ecr.us-east-1.amazonaws.com/news:0.0.2

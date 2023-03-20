# Push backend changes

In jazzjams/ run:

docker build --platform linux/amd64 -t jazzjams:<version> .  
docker tag jazzjams:<version> <aws_account_id>.dkr.ecr.us-east-2.amazonaws.com/jazzjams
docker login -u AWS -p $(aws ecr get-login-password --region us-east-2) <aws_account_id>.dkr.ecr.us-east-2.amazonaws.com
docker push <aws_account_id>.dkr.ecr.us-east-2.amazonaws.com/jazzjams

In ECS:
Update task definition
Update cluster
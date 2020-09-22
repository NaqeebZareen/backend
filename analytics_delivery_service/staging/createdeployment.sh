# gcloud beta container clusters get-credentials backend-testing-cluster --region us-east1 --project ukanwebapi
gcloud container clusters get-credentials youcan-cluster2 --zone asia-southeast1-b --project ukanwebapi
if [ $# -eq 0 ]
  then
    source staging/nextversion.sh
    gcloud builds submit --tag gcr.io/ukanwebapi/testingbackendservices/userservice:$nextVersion .
    if [ $? -eq 0 ]; then
	    STATUSIMAGE='ok'
	    export user_image=$nextVersion
        echo $fileVersion >> staging/version.txt
	else
	    STATUSIMAGE='fail'
	fi
    
else 
    gcloud container builds submit --tag gcr.io/ukanwebapi/testingbackendservices/userservice:$1 .
    if [ $? -eq 0 ]; then
	    STATUSIMAGE='ok'
	    export user_image=$1
	else
	    STATUSIMAGE='fail'
	fi
    
fi


if [ $STATUSIMAGE = 'ok' ]
	then
		envsubst < ./staging/userservice-staging.yaml | kubectl apply -f -
		echo Created
else 
	echo fail
fi
 



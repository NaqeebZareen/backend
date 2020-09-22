git add .
if [ $# -eq 0 ]
  then
    git commit -m "automated push from system"
    if [ $? -eq 0 ]; then
	    STATUS='ok'
	else
	    STATUS='fail'
	fi
else 
    git commit -m $1
    if [ $? -eq 0 ]; then
	    STATUS='ok'
	else
	    STATUS='fail'
	fi
fi

if [ $STATUS = 'ok' ]
	then
		# git push git@bitbucket.org:aadilbanaras1844/activityservice.git master
        echo Pushed to server
else 
	echo failed to push

fi
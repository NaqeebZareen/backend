
input="staging/version.txt"
while IFS= read -r var
do
  version=( $var )
  p1=${version[0]}
  p2=${version[1]}
  p3=${version[2]}  
done < "$input"

if [ $p3 -lt 19 ];
then
    p3=$((p3+1))
    nextVersion="$p1.$p2.$p3"
    fileVersion="$p1 $p2 $p3"
else
    if [ $p2 -lt 19 ];
    then
        p3=0
        p2=$((p2+1))
        nextVersion="$p1.$p2.$p3"
        fileVersion="$p1 $p2 $p3"
    else
        p1=$((p1+1))
        p2=0
        p3=0
        nextVersion="$p1.$p2.$p3"
        fileVersion="$p1 $p2 $p3"
    fi; 
    
fi;


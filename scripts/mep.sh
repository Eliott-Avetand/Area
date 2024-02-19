# Basic Mep Script
tput setaf 3 ; echo "Stop loustikarea services..."
sudo docker-compose down
if [ "$1" = "--build" ]
    then sudo docker system prune --volumes -f -a
fi
tput setaf 2 ; echo "Success."

tput setaf 3 ; echo "Start pulling last repository version..."
git pull

# echo "Start installing frontend new dependencies.."
# cd client; yarn install
# echo "Success."
# cd -

# echo "Start installing api new dependencies.."
# cd server; yarn install
# echo "Success."
# cd -

tput setaf 3 ; echo "Restart Loustikarea Services..."
if [ "$1" = "--build" ]
    then sudo docker-compose build
fi
if [ "$1" = "-d" ]
    then sudo docker-compose up -d
else
    sudo docker-compose up
fi

tput setaf 2 ; echo "Success."

tput setaf 2 ; echo "MEP Sucessfully done." ;

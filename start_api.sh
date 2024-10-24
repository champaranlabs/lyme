if [ -z "$1" ]
  then
    echo "Please provide a env"
    exit 1
fi
    cd backend
    docker-compose up -d &&
    npm install --legacy-peer-deps &&
    NODE_ENV=$1 npm run server --env=dev

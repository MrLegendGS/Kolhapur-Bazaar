pipeline {
  agent any

  environment {
    IMAGE = 'kolhapur-bazaar'
    CONTAINER = 'kolhapur-bazaar-ci'
    HOST_PORT = '8085'
  }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Validate files') {
      steps {
        sh '''
          test -f src/index.html
          test -f src/css/style.css
          test -f src/js/app.js
          grep -q "Kolhapur Bazaar" src/index.html
          echo "Required files found"
        '''
      }
    }

    stage('Build Docker image') {
      steps { sh 'docker build -t $IMAGE:$BUILD_NUMBER -t $IMAGE:latest .' }
    }

    stage('Deploy container') {
      steps {
        sh '''
          docker rm -f $CONTAINER || true
          docker run -d --name $CONTAINER -p $HOST_PORT:80 $IMAGE:latest
        '''
      }
    }

    stage('Smoke test') {
      steps {
        sh '''
          sleep 3
          curl -sf http://localhost:$HOST_PORT/ | grep -q "Kolhapur Bazaar"
          echo "Website is live and responding"
        '''
      }
    }
  }

  post {
    success { echo "Build #${env.BUILD_NUMBER} passed. Site at http://localhost:${env.HOST_PORT}" }
    failure { echo "Build failed. Check the stage logs above." }
  }
}

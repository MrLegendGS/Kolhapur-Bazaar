
pipeline {
    agent any

    environment {
        IMAGE = 'kolhapur-bazaar'
        CONTAINER = 'kolhapur-bazaar-ci'
        HOST_PORT = '8085'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Validate Files') {
            steps {
                bat '''
                    if not exist "Dockerfile" (
                        echo ERROR: Dockerfile not found
                        exit /b 1
                    )

                    if not exist "src\\index.html" (
                        echo ERROR: src\\index.html not found
                        exit /b 1
                    )

                    if not exist "src\\css\\style.css" (
                        echo ERROR: CSS file not found
                        exit /b 1
                    )

                    if not exist "src\\js\\app.js" (
                        echo ERROR: JavaScript file not found
                        exit /b 1
                    )

                    findstr /C:"Kolhapur Bazaar" "src\\index.html"
                    if errorlevel 1 (
                        echo ERROR: Expected website text not found
                        exit /b 1
                    )

                    echo All required files validated successfully
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker version'
                bat 'docker build -t %IMAGE%:%BUILD_NUMBER% -t %IMAGE%:latest .'
            }
        }

        stage('Deploy Container') {
            steps {
                bat '''
                    docker rm -f "%CONTAINER%" 2>nul
                    docker run -d --name "%CONTAINER%" -p %HOST_PORT%:80 "%IMAGE%:latest"
                    if errorlevel 1 exit /b 1
                '''
            }
        }

        stage('Smoke Test') {
            steps {
                bat '''
                    timeout /t 5 /nobreak >nul

                    curl.exe -f "http://localhost:%HOST_PORT%/" -o response.html
                    if errorlevel 1 (
                        echo ERROR: Website did not respond successfully
                        docker logs "%CONTAINER%"
                        exit /b 1
                    )

                    findstr /C:"Kolhapur Bazaar" response.html
                    if errorlevel 1 (
                        echo ERROR: Expected website content not found
                        exit /b 1
                    )

                    echo Website is live and responding
                '''
            }
        }
    }

    post {
        success {
            echo 'Kolhapur Bazaar CI/CD Pipeline completed successfully!'
            echo 'Website URL: http://localhost:8085'
        }

        failure {
            echo 'Pipeline failed. Check Console Output for details.'
        }

        always {
            echo 'Kolhapur Bazaar Pipeline execution finished.'
        }
    }
}

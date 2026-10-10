
pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        SONAR_HOST_URL = 'http://localhost:9000'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Test') {
            steps {
                bat 'npm test'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    withCredentials([
                        string(
                            credentialsId: 'sonarqube-token',
                            variable: 'SONAR_TOKEN'
                        )
                    ]) {
                        bat '''
                        sonar-scanner.bat ^
                          -Dsonar.projectKey=devops-cicd-project ^
                          -Dsonar.sources=src ^
                          -Dsonar.tests=tests ^
                          -Dsonar.host.url=http://localhost:9000 ^
                          -Dsonar.token=%SONAR_TOKEN%
                        '''
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t devops-cicd-app:1.0 .'
            }
        }
    }
}

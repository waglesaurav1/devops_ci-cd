
pipeline {
    agent any

   

    environment {
        SONAR_HOST_URL = 'http://localhost:9000'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
    
        stage('Check Node.js') {
    steps {
        bat 'where node'
        bat 'node --version'
        bat 'npm --version'
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

        stage('Deploy Application') {
            steps {
                bat '''
                docker rm -f devops-cicd-deployed 2>NUL
                docker run -d --name devops-cicd-deployed -p 3001:3000 devops-cicd-app:1.0
                '''
            }
        }
    }
}

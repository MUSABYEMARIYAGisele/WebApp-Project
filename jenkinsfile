pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t coderwanda-webapp:latest .'
            }
        }

        stage('Deploy with Docker') {
            steps {
                sh 'docker rm -f coderwanda-container || true'
                sh 'docker run -d --name coderwanda-container -p 3000:3000 coderwanda-webapp:latest'
            }
        }
    }
}

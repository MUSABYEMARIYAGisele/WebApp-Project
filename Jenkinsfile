
pipeline {
    agent any

    // Configure Node.js in Jenkins
    tools {
        nodejs 'NodeJS 24.x'
    }

    stages {

        // STAGE 1: Install Dependencies
        stage('Install Dependencies') {
            steps {
                sh 'node --version'
                sh 'npm --version'
                sh 'npm ci'
            }
        }

        // STAGE 2: Run Tests
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        // STAGE 3: Build Docker Image
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t coderwanda-webapp:latest .'
            }
        }

        // STAGE 4: Deploy Application Using Docker
        stage('Deploy with Docker') {
            steps {
                // Remove the old container if it exists
                sh 'docker rm -f coderwanda-container || true'

                // Create and start a new container
                sh 'docker run -d --name coderwanda-container -p 3000:3000 coderwanda-webapp:latest'
            }
        }
    }

    // Display pipeline result
    post {
        success {
            echo 'Application deployed successfully!'
        }

        failure {
            echo 'Pipeline failed. Check the Jenkins console output.'
        }
    }
}

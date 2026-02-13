pipeline {
    agent any

    stages {
        stage('install') {
            steps {
                dir('src') {
                    sh 'npm install'
                }
            }
        }

        stage('tests') {
            steps {
                dir('src') {
                    sh 'npm test'
                }
            }
        }

        stage('build') {
            steps {
                dir('src') {
                    sh 'npm run build'
                }
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline executado com sucesso!'
        }
        failure {
            echo 'Pipeline falhou. Verifique os logs para mais detalhes.'
        }
        always {
            echo 'Pipeline finalizado.'
        }
    }
}
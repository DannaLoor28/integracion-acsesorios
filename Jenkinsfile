pipeline {
  agent any

  tools {
    nodejs "node24"
    dockerTool "dockertools"
  }

  environment {
    IMAGE_NAME = "galeria-accesorios"
    CONTAINER_NAME = "galeria-container"
    PORT = "3010"
  }

  stages {
    stage('Instalación') {
      steps {
        sh 'npm install'
      }
    }

    stage('Test') {
      steps {
        sh 'chmod +x ./node_modules/.bin/jest'
        sh 'npm test -- --ci --runInBand'
      }
    }

    stage('Docker Build') {
      steps {
        sh "docker build -t ${IMAGE_NAME}:latest ."
      }
    }

    stage('Docker Run') {
      steps {
        sh """
          docker stop ${CONTAINER_NAME} || true
          docker rm ${CONTAINER_NAME} || true
          docker run -d --name ${CONTAINER_NAME} -p ${PORT}:${PORT} ${IMAGE_NAME}:latest
        """
      }
    }
  }

  post {
    success {
      echo "Desplegado en http://localhost:${PORT}"
    }
    failure {
      echo "Hubo un error en el pipeline"
    }
  }
}

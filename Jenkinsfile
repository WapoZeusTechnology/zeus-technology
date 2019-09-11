pipeline{
    agent{
        docker{
            image 'zeus-monorepo-run-image:latest'
            args "-v ${env.PWD}:/work"
            registryUrl 'https://275213003179.dkr.ecr.us-east-1.amazonaws.com/zeus-ecr-repo'
            registryCredentialsId 'ecr:us-east-1:aws-ecr-credentials'
        }
    }
    triggers{
        pollSCM("H/2 * * * *")
    }
    stages{
        stage("Verbose"){
            steps{
                sh "env"
                sh "ls /usr/bin /usr/local/bin"
                sh "wget 'https://google.com'"
            }
        }
        stage("Yarn"){
          steps{
            sh "yarn"
          }
        }
        stage("Bootstrap"){
          steps{
            sh "lerna bootstrap"
          }
        }
        stage("Build"){
          steps{
            sh "lerna run build"
          }
        }
        stage("Test"){
          steps{
            sh "lerna run test"
          }
        }
    }
}

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
    parameters{
        choice(name:"BUILD_TYPE", choices:['prerelease','patch','minor','major','from-package'], description:"Choose which release type you'd like")
    }
    environment{
        NODE_ENV="production"
    }
    stages{
        stage("Verbose"){
            steps{
                sh "env"
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
        stage("Test"){
          steps{
            sh "lerna run test"
          }
        }
        stage("Build"){
          steps{
            sh "lerna run build"
          }
        }

        stage("Deploy"){
          steps{
            sh "lerna publish ${params.BUILD_TYPE}"
          }
        }
    }
}
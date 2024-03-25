pipeline {
   agent any


   environment {
      DOCKER_IMAGE_NAME = "device"
   }


   stages {
     // env 복사
     stage('env copy') {
         when { expression { env.GIT_BRANCH == 'origin/master' || env.GIT_BRANCH == 'origin/develop'} }
         steps {
            updateGitlabCommitStatus name: 'build', state: 'pending'
            echo "현재 브랜치 : ${env.GIT_BRANCH}"
            dir ('.') {
               sh """
                if [ -f ./.env ]
                then
                   rm -rf ./.env
                fi
                cp ../device-env ./.env
               """
            }
         }
         post {
            success {
               echo 'env copy success :D'
            }
            failure {
               updateGitlabCommitStatus name: 'build', state: 'failed'
               echo 'env copy failed... :('
            }
         }
      }


      // Next build, docker image build
      stage('Next Build & Docker image Build') {
         when { expression { env.GIT_BRANCH == 'origin/master' || env.GIT_BRANCH == 'origin/develop'} }
         steps {
            dir ('.'){
            sh """
            image=\$(docker images --filter=reference=${env.DOCKER_IMAGE_NAME} -q)
            if [ -n "\$image" ]; then
               docker image tag ${env.DOCKER_IMAGE_NAME}:latest ${env.DOCKER_IMAGE_NAME}:old
               docker rmi ${env.DOCKER_IMAGE_NAME}:latest
            fi
            docker build --tag ${env.DOCKER_IMAGE_NAME} .
            """
            }
         }
         post {
            always {
               sh """
               res=\$(docker images -f "dangling=true" -q)
               if [ -n "\$res" ]; then
                  docker rmi \$res
               fi
               """
            }
            success {
               echo 'Docker image build success :D'
            }
            failure {
               sh """
               image=\$(docker images --filter=reference=${env.DOCKER_IMAGE_NAME}:old -q)
               if [ -n "\$image" ]; then
                  docker image tag ${env.DOCKER_IMAGE_NAME}:old ${env.DOCKER_IMAGE_NAME}:latest
                  docker rmi ${env.DOCKER_IMAGE_NAME}:old
               fi
               """
               updateGitlabCommitStatus name: 'build', state: 'failed'
               error 'Docker image build faild... :('
            }
         }
      }


      // docker run
      stage('Docker Run') {
         when { expression { env.GIT_BRANCH == 'origin/master' || env.GIT_BRANCH == 'origin/develop'} }
         steps {
            sh """
            container=\$(docker ps -q --filter name="${env.DOCKER_IMAGE_NAME}")
            if [ -n "\$container" ]; then
               docker stop \$container
            fi
            image=\$(docker images --filter=reference=${env.DOCKER_IMAGE_NAME}:old -q)
            if [ -n "\$image" ]; then
               docker rmi ${env.DOCKER_IMAGE_NAME}:old
            fi
            docker run -d -p 3000:3000 --rm --name "${env.DOCKER_IMAGE_NAME}" ${env.DOCKER_IMAGE_NAME}:latest
            """
         }
         post {
            success {
               updateGitlabCommitStatus name: 'build', state: 'success'
               echo 'Docker run success :D'
            }
            failure {
               updateGitlabCommitStatus name: 'build', state: 'failed'
               error 'Docker run failed :('
            }
         }
      }


      // Mattermost에 알림 보내기
      stage('Mattermost') {
         when { expression { env.GIT_BRANCH == 'origin/master' || env.GIT_BRANCH == 'origin/develop'} }
         steps {
            mattermostSend(
              channel: "S001-Test",
              message: "device app의 ${env.BUILD_NUMBER}번째 빌드가 성공했습니다."
           )
         }
         post {
            success {
               echo 'Mattermost notify success :D'
            }
            failure {
               error 'Mattermost notify failed... :('
            }
         }
      }

   }
}
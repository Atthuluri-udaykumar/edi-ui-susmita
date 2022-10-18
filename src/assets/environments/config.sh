#!/bin/ash
if [[ -z "${DEPLOY_ENV}" ]]; then
  echo "Active profile DEV. DEPLOY_ENV variable undefined."
else
  echo "Reading profile variable..."
  sed -i -e "s/\$DEPLOY_ENV/$DEPLOY_ENV/" /opt/tomcat/webapps/sws/assets/environments/environment.json
  echo "Active profile $DEPLOY_ENV."
fi
if [[ -z "${BUILD_NUMBER}" ]]; then
  echo "BUILD_NUMBER variable undefined."
else
  echo "Reading build number variable..."
  sed -i -e "s/\$BUILD_NUMBER/$BUILD_NUMBER/" /opt/tomcat/webapps/sws/assets/environments/environment.json
  echo "Active profile $BUILD_NUMBER."
fi
/opt/tomcat/bin/catalina.sh run

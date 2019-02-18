# stockmarket
step 1: Download Dynamodb https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html

step 2: Extract and start Dynamodb 
         java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -port 8383
         (note: port 8383 is to connect to dynamodb)
         
step 3: Install & configure aws-cli locally with accesskey and secret key.

step 4: Set env.bat/sh variable

step 5: install npm modules
         npm install
         
step 6: create db tables and populate it with sample data
         npm run seed
         
step 7: to start Server
         npm run start
         
step 8: To Run Test Cases
         npm run test 

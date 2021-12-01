#!/bin/bash
cd /home/ubuntu/Shall-We-Health/server

export DB_USER=$(aws ssm get-parameters --region ap-northeast-2 --names DB_USER --query Parameters[0].Value | sed 's/"//g')
export DB_PASS=$(aws ssm get-parameters --region ap-northeast-2 --names DB_PASS --query Parameters[0].Value | sed 's/"//g')
export DB_PORT=$(aws ssm get-parameters --region ap-northeast-2 --names DB_PORT --query Parameters[0].Value | sed 's/"//g')
export DB_HOST=$(aws ssm get-parameters --region ap-northeast-2 --names DB_HOST --query Parameters[0].Value | sed 's/"//g')
export DB_NAME=$(aws ssm get-parameters --region ap-northeast-2 --names DB_NAME --query Parameters[0].Value | sed 's/"//g')
export ACCESS_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names ACCESS_SECRET --query Parameters[0].Value | sed 's/"//g')
export ACCOUNT_USER=$(aws ssm get-parameters --region ap-northeast-2 --names ACCOUNT_USER --query Parameters[0].Value | sed 's/"//g')
export ACCOUNT_PASS=$(aws ssm get-parameters --region ap-northeast-2 --names ACCOUNT_PASS --query Parameters[0].Value | sed 's/"//g')
export DB_PORT =$(aws ssm get-parameters --region ap-northeast-2 --names DB_PORT --query Parameters[0].Value | sed 's/"//g')

authbind --deep pm2 start index.js
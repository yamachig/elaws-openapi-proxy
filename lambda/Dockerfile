FROM public.ecr.aws/lambda/nodejs:18
WORKDIR ${LAMBDA_TASK_ROOT}
COPY lib/main.js lib/main.js.map ${LAMBDA_TASK_ROOT}/
RUN npm install swagger-ui-express express
CMD [ "main.lambdaHandler" ]

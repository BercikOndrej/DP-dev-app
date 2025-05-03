FROM node:22-alpine3.21

# Others environment variables
ENV pojdteven_host=mysql
ENV pojdteven_port=3306
ENV pojdteven_user=myuser
ENV pojdteven_password=mypassword
ENV pojdteven_database=pojdteven
ENV pojdteven_jwt_secret=qmr-YoG-83L-wP4
ENV pojdteven_jwt_expiresIn=30d
ENV pojdteven_default_bank_account=CZ9520100000002400407618
ENV pojdteven_default_variable_symbol=12345
ENV pojdteven_email_user=pojdteven.itpodpora@gmail.com
ENV pojdteven_email_sendGrid_api_key=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
ENV pojdteven_FE_domain=http://localhost:5173
ENV pojdteven_BE_domain=http://localhost:3000

USER root

RUN mkdir -p /home/node/app

WORKDIR /home/node/app
COPY package*.json ./

RUN npm install
COPY . .

RUN npm run build
#RUN npm run migrate

ENV HOST=0.0.0.0 PORT=3000
EXPOSE 3000

CMD ["npm", "run", "start"]

FROM loadimpact/k6:latest

COPY k6 /usr/bin/k6

ENV AZURE_STORAGE_ACCOUNT=siigoloadtesting
ENV AZURE_STORAGE_ACCESS_KEY=AY5VSKFHJNrHwslWQTahZds3utXfKmqsl9Nkag5Rg+SfoWHhJz27vwJHH0cyQx0wU/PYXMdccD7fYVSv7887yw==

CMD ls -laR
ENTRYPOINT ["k6"]

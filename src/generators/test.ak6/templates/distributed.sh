kubectl delete configmap my-test -n default
kubectl delete -f k6.yaml
sleep 15s
webpack
kubectl create configmap my-test --from-file dist
kubectl apply -f k6.yaml

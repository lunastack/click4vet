## DevOps Specifications
### REPO_TYPE = AWS EKS Deployment

This code will be installed inside a Kubernetes Pod (container) as part of a Kubernetes Deployment, and exposed as follows:

```
endpoint = mit-manager-api-svc
port     = 80
```

Internal Kubernetes domain name for service calls (replace <namespace>):

```
mit-manager-api-svc.<namespace>.svc.cluster.local
```

#### Add Environment Variables

https://tactech.atlassian.net/wiki/spaces/TAC/pages/2229108737/custom+upload-vars+custom+update-vars